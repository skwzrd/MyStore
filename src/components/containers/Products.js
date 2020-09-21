import React from 'react'
import { view } from '@risingstack/react-easy-state';
import { products } from '../stores/ProductStore';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../views/Product';

const useStyles = makeStyles({
  root: {
    backgroundColor: "inherit",
    display: "flex",
    marginTop: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
});


function Products() {
  const classes = useStyles();
  const productComponents = products.items.map(item => <Product key={item.id} item={item}/>);
  return (
    <div className={classes.root}>
      { productComponents }
    </div>
  )
}

export default view(Products);