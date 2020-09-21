import React from 'react';
import { useStyleChild } from '../../styles/Child';


export default function Cart() {
  const classes = useStyleChild();
  return (
    <div className={classes.root}>
      <p>Items: 3</p>
      <p>Total Price: $6.99 CAD</p>
    </div>
  )
}