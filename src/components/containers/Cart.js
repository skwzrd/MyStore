import React from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';


export default function Cart() {
  const classes = useBodyStyle();
  return (
    <div className={classes.root}>
      <p>Items: 3</p>
      <p>Total Price: $6.99 CAD</p>
    </div>
  )
}