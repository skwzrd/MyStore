import React from 'react';
import { useStyleChild } from '../../styles/Child';
import Products from './Products';
import ModifyProducts from '../containers/ModifyProducts';
import { appStore } from '../stores/AppStore';
import { view } from '@risingstack/react-easy-state';

function Shop() {
  const classes = useStyleChild();
  return (
    <div className={classes.root}>
      <p>Check out our current products below.</p>
      {appStore.auth ? <ModifyProducts/> : null}
      <Products/>
    </div>
  )
}

export default view(Shop);
