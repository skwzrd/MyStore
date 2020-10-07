import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import BillingDetailsFields from './BillingDetailsFields';
import StripeFields from './StripeForm';

import axios from "axios";

import { useElements, useStripe } from '@stripe/react-stripe-js';

import { cartStore } from '../stores/CartStore';

import { navigate } from "@reach/router";


function PurchaseForm({ open, setOpen, price }) {
  const stripe = useStripe();
  const elements = useElements();

  // testing
  // const blankDetails = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   address: "",
  //   postalCode: "",
  //   city: "",
  //   province: "",
  // }

  const blankDetails = {
    firstName: "FIRST",
    lastName: "LAST",
    email: "EMAIL@gmail.com",
    address: "12345",
    postalCode: "12345",
    city: "CITY",
    province: "PROVINCE",
  }
  const [details, setDetails] = useState(blankDetails);
  const [isProcessing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState();


  const handleChange = (name, value) => {
    const newDetails = Object.assign({ ...details }, {
      [name]: value
    });
    setDetails(newDetails);
  }

  const handleClear = () => {
    setDetails(blankDetails);
    elements.getElement("card").clear();
    setProcessing(false);
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: details.firstName + " " + details.lastName,
      email: details.email,
      address: {
        city: details.city,
        line1: details.address,
        state: details.province,
        postal_code: details.postalCode
      }
    };
    setProcessing(true);

    const cardElement = elements.getElement("card");

    try {

      const { data: clientSecret } = await axios.post(
        "/orders/create",
        {
          amount: price * 100,
        },
      );

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessing(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessing(false);
        return;
      }
      
      setOpen(false);
      cartStore.clearCart();
      navigate('/thankyou');

    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
  <>
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={true}
      maxWidth = {'sm'}
      height={'lg'}
    >
      <DialogTitle>
        Billing Details
      </DialogTitle>

      <DialogContent>
        <BillingDetailsFields details={details} handleChange={handleChange}/>
        <StripeFields
          setProcessing={setProcessing}
          checkoutError={checkoutError}
          setCheckoutError={setCheckoutError}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClear} color="secondary">
          Clear
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button 
          variant="contained"
          color="primary"
          disabled={isProcessing || !stripe}
          onClick={handleFormSubmit}
        >
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export default PurchaseForm;
