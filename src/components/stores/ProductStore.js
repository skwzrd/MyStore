import { store } from '@risingstack/react-easy-state';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const products = store({
  items: [
    {
      id: 1,
      name: "Cobalt",
      price: 4.99,
      currency: "CAD",
      created_date: "2020-09-20",
      imageExt: "jpg",
    },
    {
      id: 2,
      name: "Azure",
      price: 4.38,
      currency: "CAD",
      created_date: "2020-09-19",
      imageExt: "jpg",
    },
    {
      id: 3,
      name: "Lapis",
      price: 4.87,
      currency: "CAD",
      created_date: "2020-09-16",
      imageExt: "jpg",
    }
  ],
  addItem(item){
    products.items.push(item);
  },
  removeItem(id){
    products.items = products.items.filter(item => item.id !== id);
  },
  itemCount: () => products.items.length,
});

export const createItem = (name, price, currency="CAD") => {
  return {
    id: uuidv4(),
    name,
    price,
    currency,
    created_date: moment().format('LLL')
  };
}
