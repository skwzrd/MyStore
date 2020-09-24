import React from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';


export default function Contact() {
  const classes = useBodyStyle();
  return (
    <div className={classes.root}>
      <p>Email: mp.hladun@gmail.com</p>
      <p>Phone: +1 (873) 688 3375</p>
    </div>
  )
}