import React from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';


export default function Cart() {
  const classes = useBodyStyle();
  return (
    <div className={classes.root}>
      We sell digital products.
    </div>
  )
}