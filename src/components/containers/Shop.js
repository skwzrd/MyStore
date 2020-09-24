import React from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';
import Products from './Products';
import AddProduct from '../containers/AddProduct';
import { appStore } from '../stores/AppStore';
import { view } from '@risingstack/react-easy-state';

function Shop() {
  const classes = useBodyStyle();
  return (
    <div className={classes.root}>
      {appStore.auth ? <AddProduct/> : <p>Check out our current products below.</p>}
      <Products/>
    </div>
  )
}

export default view(Shop);
