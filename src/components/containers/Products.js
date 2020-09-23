import React, { useEffect } from 'react'
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

  useEffect(() => {
    // populate products.items
    products.getAllProducts();
  }, []);

  return (
    <div className={classes.root}>
      { products.items.map((item, i) => <Product key={i} item={item}/>) }
    </div>
  )
}

export default view(Products);