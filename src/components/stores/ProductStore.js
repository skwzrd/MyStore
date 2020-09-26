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


const axiosAddProduct = (product_id) => {
  axios.post(`/products/${product_id}`)
  .then(res => {
    const product = res.data;
    productStore.productsById[product.product_id] = product;
  })
  .catch(err => console.log(err));
}

const axiosGetProduct = (product_id) => {
  axios.get(`/products/${product_id}`)
  .then(res => {
    const product = res.data;
    productStore.setProduct(product);
  })
  .catch(err => console.log(err));
}

const axiosGetAllProducts = () => {
  axios.get('/products', config)
  .then(res => {
    productStore.pr = 1;
    productStore.productsById = makeIdObject(res.data);
  })
  .catch(err => console.log(err.stack));
}


const axiosDeleteProduct = (product_id) => {
  axios.delete(`/products/${product_id}`)
  .then(res => {
    delete productStore.productsById[product_id];
  })
  .catch(err => console.log(err));
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

  getProduct(product_id){
    axiosGetProduct(product_id);
    return productStore.productsById[product_id];
  },

  getAllProducts(){
    axiosGetAllProducts();
    return productStore.productsById;
  },

  productExists(product_id){
    return productStore.productsById[product_id] ? productStore.productsById[product_id] : false;
  },

  addProduct(product_id){
    // returns whether it exists in the store or not after db call
    axiosAddProduct(product_id);
    return productStore.getProduct(product_id);
  },

  setProduct(product){
    productStore.productsById[product.product_id] = product;
  },

  removeProduct(product_id){
    // returns whether or not the product has been deleted from the store after db call
    axiosDeleteProduct(product_id);
    return productStore.productExists(product_id) ? false : true;
  }

});
