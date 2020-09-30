import React from 'react';
import { view } from '@risingstack/react-easy-state';
import { appStore } from '../stores/AppStore';
import CartButton from './CartButton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import palette from '../../styles/palette.json';

const useStyles = makeStyles({
  root: {
    backgroundColor: palette.secondary,
    color: palette.text,
    padding: "10px",
    height: "auto",
    width: "min-content",
    minWidth: "200px",
    minHeight: "50px",
    margin: "auto"
  },
  title: {
    paddingBottom: "10px",
    textAlign: "center",
  },
  image: {
    display: "flex",
    maxHeight: "600px",
    width: "auto",
    maxWidth: "500px",
    margin: "auto",
  },
  image_div: {
    backgroundColor: palette.secondary,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "8px",
  }
});


function ProductShowcase({ product, isLoading }) {
  const classes = useStyles();

  if(isLoading) return <h1>Loading ...</h1>;
  if(!product) return <h1>Product Not Found</h1>;

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        {product.name}
      </Typography>
      <Card className={classes.root}>

        <div className={classes.image_div}>
          <img src={product.image_filename} alt={product.name} className={classes.image}/>
        </div>
        <div className={classes.row}>
          <CartButton product={product}/>
        </div>
        <div className={classes.row}>
          <div>{product.price} {product.currency}</div>
          {appStore.auth ? <div>Qty: {product.quantity}</div> : null}
        </div>

        <div className={classes.row}>
        {product.description}
        </div>
      </Card>
    </>
  )
}

export default view(ProductShowcase);
