import { store } from '@risingstack/react-easy-state';

export const cartStore = store({
  items: {},

  get itemCount(){
    return Object.keys(cartStore.items).length;
  },

  get itemList(){
    let itemList = [];
    Object.keys(cartStore.items).forEach(key => {
      itemList.push(cartStore.items[key]);
    })
    return itemList;
  },

  get total(){
    let total = {};
    let total_string = "";
    Object.keys(cartStore.items).map(item_id => {
      const currency = cartStore.items[item_id].currency;
      if(currency in total === false){
        total[currency] = 0.00;
      }
      total[currency] += Number(cartStore.items[item_id].price);
      return null;
    })
    Object.keys(total).map(currency => {
      total[currency] = total[currency].toFixed(2).toString();
      total_string += `${total[currency]} ${currency} + `
      return null;
    })
    return total_string.replace(/\s\+\s$/gi, '');
  },

  addToCart(product){
    cartStore.items[product.product_id] = product;
  },

  removeFromCart(product){
    delete cartStore.items[product.product_id];
  },

  existsInCart(product){
    return cartStore.items[product.product_id] ? true : false;
  },

});
