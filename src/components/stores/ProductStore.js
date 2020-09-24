import { store } from '@risingstack/react-easy-state';
import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };

// transforms an array of item objects into an object
// with product_id keys, and item object values
const makeIdObject = (itemArray) => {
  let id_object = {};
  itemArray.forEach(item => {
    id_object[item.product_id] = item;
  });
  return id_object;
}

export const productStore = store({
  idItems: {},

  get itemArray(){
    let array = [];
    Object.keys(productStore.idItems).map(key => {
      array.push(productStore.idItems[key]);
    })
    return array;
  },

  getAllProducts(){
    axios.get('/products', config)
    .then(res => {
      productStore.items = res.data;
      productStore.idItems = makeIdObject(res.data);
    })
    .catch(err => console.log(err.stack));
  },

  addItem(product){
    productStore.itemArray.push(product);
    productStore.idItems[product.product_id] = product;
  },

  fetchItem(product_id){
    axios.get(`/products/${product_id}`)
    .then(res => productStore.addItem(res.data))
    .catch(err => console.log(err));
  },

  itemExists(product_id){
    return productStore.idItems[product_id] ? productStore.idItems[product_id] : false;
  },

  getItem(product_id){
    // gets item if it doesnt exist and returns item (false if it doesnt exist in psql)
    if(!productStore.itemExists(product_id)){
      productStore.fetchItem(product_id);
    }
    return productStore.itemExists(product_id) ? productStore.idItems[product_id] : false;
  },

});
