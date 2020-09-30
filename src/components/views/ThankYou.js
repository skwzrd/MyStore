import React from 'react';

import { useBodyStyle } from '../../styles/BodyStyle';

function ThankYou() {
  const classes = useBodyStyle();

  return (
    <div className={classes.root}>
      <p>Thank you for purchasing from our store!</p>
    </div>
  )
}

export default ThankYou;
