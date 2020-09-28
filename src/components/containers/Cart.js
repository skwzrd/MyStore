import React from 'react';
import { useBodyStyle } from '../../styles/BodyStyle';
import { cartStore } from '../stores/CartStore';
import { view } from '@risingstack/react-easy-state';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@reach/router';
import palette from '../../styles/palette.json';

const useStyles = makeStyles({
  root: {
    paddingLeft: "16px",
    display: "block",
    color: palette.text,
    textDecoration: "underline",
    background: palette.button_hover,
  },
});

function Cart() {
  const fine_classes = useStyles();
  const course_classes = useBodyStyle();

  return (
    <div className={course_classes.root}>
      {
        cartStore.itemCount > 0
        ?
          <>
            <p>Total Items: {cartStore.itemCount}</p>
            {cartStore.itemList.map((item, i) => {
              return <Link to={"/shop/"+String(item.product_id)} key={i} className={fine_classes.root}>
                {i+1}. {item.name} {Number(item.price).toFixed(2)} {item.currency}
              </Link>
            })}
            <p>Total Price: {cartStore.total} {cartStore.totalCurrency}</p>
          </>
        :
        <p>Nothing in your cart.</p>
      }
    </div>
  )
}

export default view(Cart);
