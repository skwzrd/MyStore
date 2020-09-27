import { store } from '@risingstack/react-easy-state';
import { SUCCESS, FAIL, INFO } from '../../utils/constants';
import axios from 'axios';
import { toaster } from '../../utils/toaster';

const configJSON = { headers: { 'Content-Type': 'application/json' } };
const configFORM = { headers: { 'Content-Type': 'multipart/form-data' } };

// transforms an array of products objects into an object
// with product_id keys, and products object values
const makeIdObject = (productArray) => {
  let id_object = {};
  productArray.forEach(product => {
    id_object[product.product_id] = product;
  });
  return id_object;
}


const axiosAddProduct = async (formData) => {
  try {
    const { data } = await axios.post("/products/", formData, configFORM)
    toaster(SUCCESS, "Product created.");
    return data;
  } catch (error) {
    console.error(error);
    toaster(FAIL, "Couldn't create product.");
  }
}


const axiosGetProduct = async (product_id) => {
  try {
    const { data } = await axios.get(`/products/${product_id}`, configJSON)
    toaster(INFO, "Product retrieved.");
    return data;
  } catch (error) {
    console.error(error);
    toaster(FAIL, "Couldn't fetch product");
  }
}


const axiosGetAllProducts = async () => {
  try {
    const { data } = await axios.get("/products", configJSON)
    toaster(INFO, "All products retrieved.");
    return makeIdObject(data);
  } catch (error) {
    console.error(error);
    toaster(FAIL, "Couldn't fetch all products.");
  }
}


const axiosDeleteProduct = (product_id) => {
  axios.delete(`/products/${product_id}`, configJSON)
  .then(res => {
    delete productStore.productsById[product_id];
    toaster(SUCCESS, "Product deleted.");
  })
  .catch(err => {
    console.error(err);
    toaster(FAIL, "Couldn't delete product.");
  });
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

  async getProduct(product_id){
    const product = await axiosGetProduct(product_id);
    productStore.setProduct(product);
    return productStore.productsById[product_id];
  },

  async getAllProducts(){
    productStore.productsById = await axiosGetAllProducts();
    return productStore.productsById;
  },

  productExists(product_id){
    return productStore.productsById[product_id] ? productStore.productsById[product_id] : false;
  },

  async addProduct(product){
    // returns whether it exists in the store or not after db call
    const addedProduct = await axiosAddProduct(product);
    productStore.productsById[product.product_id] = addedProduct;
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
