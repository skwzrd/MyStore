import { store } from '@risingstack/react-easy-state';
import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };

// transforms an array of products objects into an object
// with product_id keys, and products object values
const makeIdObject = (productArray) => {
  let id_object = {};
  productArray.forEach(product => {
    id_object[product.product_id] = product;
  });
  return id_object;
}

export const productStore = store({
  productsById: {},

  get productArray(){
    let array = [];
    Object.keys(productStore.productsById).map(key => {
      return array.push(productStore.productsById[key]);
    })
    return array;
  },

  getAllProducts(){
    axios.get('/products', config)
    .then(res => {
      productStore.products = res.data;
      productStore.productsById = makeIdObject(res.data);
    })
    .catch(err => console.log(err.stack));
  },

  addProduct(product){
    productStore.productArray.push(product);
    productStore.productsById[product.product_id] = product;
  },

  fetchProduct(product_id){
    axios.get(`/products/${product_id}`)
    .then(res => productStore.addProduct(res.data))
    .catch(err => console.log(err));
  },

  productExists(product_id){
    return productStore.productsById[product_id] ? productStore.productsById[product_id] : false;
  },

  getProduct(product_id){
    // gets products if it doesnt exist and returns products (false if it doesnt exist in psql)
    if(!productStore.productExists(product_id)){
      productStore.fetchProduct(product_id);
    }
    return productStore.productExists(product_id) ? productStore.productsById[product_id] : false;
  },

});
