import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

import styled from "styled-components";


const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 80%;
    margin: 40px;
  }
`;

const CheckoutError = styled.div`
  display: flex;
  align-items: center;
  color: red;
`;

const iframeStyles = {
  base: {
    color: "black",
    fontSize: "16px",
    iconColor: "grey"
  },
  invalid: {
    iconColor: "red",
    color: "red"
  },
  complete: {
    iconColor: "#cbf4c9"
  }
};

const cardElementOpts = {
  iconStyle: "solid",
  style: iframeStyles,
  hidePostalCode: true
};

const StripeFields = ({ checkoutError, setCheckoutError }) => {

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  return (
    <CardElementContainer>
      <CardElement options={cardElementOpts} onChange={handleCardDetailsChange}/>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
    </CardElementContainer>
  );
};

export default StripeFields;
