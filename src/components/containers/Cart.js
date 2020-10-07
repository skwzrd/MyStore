import React, { useState } from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';
import { cartStore } from '../stores/CartStore';
import PurchaseForm from './PurchaseForm';
import { view } from '@risingstack/react-easy-state';
import Button from '@material-ui/core/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from '../views/CartItem';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Cart() {
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
            return <CartItem item={item} key={item.product_id}/>
          })}

          <p>Total Price: {cartStore.totalString} {cartStore.totalStringCurrency}</p>

          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Checkout</Button>
          <Elements stripe={stripePromise}>
            <PurchaseForm open={open} price={cartStore.total} setOpen={setOpen}/>
          </Elements>
        </>

        :
        <>
          <p>Nothing in your cart.</p>
        </>
      }
    </div>
  )
}

export default view(Cart);
