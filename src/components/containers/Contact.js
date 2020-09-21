import React from 'react';
import { useStyleChild } from '../../styles/Child';


export default function Contact() {
  const classes = useStyleChild();
  return (
    <div className={classes.root}>
      <p>Email: mp.hladun@gmail.com</p>
      <p>Phone: +1 (873) 688 3375</p>
    </div>
  )
}