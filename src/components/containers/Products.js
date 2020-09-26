import React from 'react'
import { view, autoEffect } from '@risingstack/react-easy-state';
import { productStore } from '../stores/ProductStore';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from '../views/ProductCard';
import { Link } from '@reach/router';

const useStyles = makeStyles({
  root: {
    backgroundColor: "inherit",
    display: "flex",
    marginTop: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
  }
});


function Products() {
  const classes = useStyles();

  autoEffect(() => {
    // populate productStore.products
    productStore.getAllProducts();
  }, []);

  return (
    <div className={classes.root}>
      { productStore.productArray.map((product, i) => 
        <Link to={String(product.product_id)} key={i} className={classes.link}>
          <ProductCard key={i} product={product}/>
        </Link>
      )}
    </div>
  )
}

export default view(Products);