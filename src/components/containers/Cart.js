import React, { useState } from 'react';

import { useBodyStyle } from '../../styles/BodyStyle';
import { cartStore } from '../stores/CartStore';
import palette from '../../styles/palette.json';
import PurchaseForm from './PurchaseForm';
import Shop from './Shop';

import { view } from '@risingstack/react-easy-state';
import { Link } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const useStyles = makeStyles({
  root: {
    paddingLeft: "16px",
    display: "block",
    color: palette.text,
    textDecoration: "underline",
  },
});

function Cart() {
  const fine_classes = useStyles();
  const course_classes = useBodyStyle();

  const [open, setOpen] = useState(false);

  return (
    <div className={course_classes.root}>
      {
        cartStore.itemCount > 0
        ?
          <>
            <p>Total Items: {cartStore.itemCount}</p>
            
            {cartStore.itemList.map((item, i) => {
              return <Link to={"/shop/"+String(item.product_id)} key={i} className={fine_classes.root}>
                {i+1}. {item.name} {Number(item.price).toFixed(2)} {item.currency}
              </Link>
            })}

            <p>Total Price: {cartStore.totalString} {cartStore.totalStringCurrency}</p>

            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Checkout</Button>
            <Elements stripe={stripePromise}>
              <PurchaseForm open={open} price={cartStore.total} setOpen={setOpen}/>
            </Elements>

          </>
        :
        <p>Nothing in your cart.</p>
      }
      <Shop/>
    </div>
  )
}

export default view(Cart);
