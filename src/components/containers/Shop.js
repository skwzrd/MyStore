import React from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';
import Products from './Products';
import AddProduct from '../containers/AddProduct';
import { appStore } from '../stores/AppStore';
import { productStore } from '../stores/ProductStore';
import { view } from '@risingstack/react-easy-state';

function Shop() {
  const classes = useBodyStyle();

  const getMessage = () => {
    if(productStore.productArray.length !== 0){
      return "Check out our current products below.";
    }
    return "No products here. Check back later!"
  }

  return (
    <div className={classes.root}>
      {appStore.auth ? <AddProduct/> : <p>{getMessage()}</p>}
      <Products/>
    </div>
  )
}

export default view(Shop);
