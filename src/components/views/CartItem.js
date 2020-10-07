import React from 'react';
import palette from '../../styles/palette.json';

import { Link } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import CartButton from '../views/CartButton';


const useStyles = makeStyles({
  root: {
    display: "flex",
    color: palette.text,
    textDecoration: "none",
    backgroundColor: `${palette.button}`,
    alignItems: "center",
    margin: "16px",
    border: `solid 2px ${palette.button}`,
    borderRadius: "5px",
    maxWidth: "500px",
  },
  image: {
    height: "50px",
    width: "50px",
    border: `solid 2px ${palette.button_hover}`,
    borderRadius: "5px",
  },
  row: {
    padding: "5px",
  },
  info: {
    display: "flex",
    flex: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

const CartItem = ({ item }) => {
  const classes= useStyles();

  return (
    <Link to={"/shop/"+String(item.product_id)} className={classes.root}>
      <img src={item.image_filename} alt={item.name} className={classes.image}/>
      <div className={classes.info}>
        <div>
          <div className={classes.row}>
            {item.name}
          </div>
          <div className={classes.row}>
            {Number(item.price).toFixed(2)} {item.currency}
          </div>
        </div>
        <div className={classes.row}>
          <CartButton product={item}/>
        </div>
      </div>
    </Link>
  );

}

export default CartItem;
