import React, { useEffect } from 'react'
import { view } from '@risingstack/react-easy-state';
import { productStore } from '../stores/ProductStore';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../views/ProductCard';
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

  useEffect(() => {
    // populate productStore.items
    productStore.getAllProducts();
  }, []);

  return (
    <div className={classes.root}>
      { productStore.itemArray.map((item, i) => 
        <Link to={String(item.product_id)} key={i} className={classes.link}>
          <Product key={i} item={item}/>
        </Link>
      )}
    </div>
  )
}

export default view(Products);