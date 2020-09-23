import { store } from '@risingstack/react-easy-state';
import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };

export const products = store({
  items: [],
  getAllProducts(){
    axios.get('/products', config)
    .then(res => products.items = res.data)
    .catch(err => console.log(err.stack));
  },
});
