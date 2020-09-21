import React from 'react';
import { useStyleChild } from '../../styles/Child';


export default function Cart() {
  const classes = useStyleChild();
  return (
    <div className={classes.root}>
      We sell digital art.
    </div>
  )
}