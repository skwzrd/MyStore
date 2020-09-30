import React from 'react';

import { cartStore } from '../stores/CartStore';
import { appStore } from '../stores/AppStore';
import { productStore } from '../stores/ProductStore';
import { view } from "@risingstack/react-easy-state";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const CartButton = ({ product }) => {
  let btn = null;
  if(appStore.auth){
    btn = <Button variant="contained" color="secondary" onClick={(e) => { e.preventDefault(); productStore.removeProduct(product.product_id);}}><DeleteIcon/></Button>;
  }
  else if(cartStore.existsInCart(product)){
    btn = <Button variant="contained" color="secondary" onClick={(e) => { e.preventDefault(); cartStore.removeFromCart(product);}}><ShoppingCartIcon/></Button>;
  }
  else{
    btn = <Button variant="contained" color="primary" onClick={(e) => { e.preventDefault(); cartStore.addToCart(product);}}><ShoppingCartIcon/></Button>;
  }
  cartStore.addToCart(product)
  return btn;
};

export default view(CartButton);
