import React from 'react'
import { Link } from '@reach/router';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Wrapper = styled.div`
  display: flex;
  height: 5h;
  background: #3d405b;
  color: white;
  font-size: 20px;
  align-items: center;
  padding: 16px;
`;


const useStyles = makeStyles({
  link: {
    color: "white",
    textDecoration: "none",
    paddingRight: "16px",
  },
  cart: {
    color: "white",
    marginLeft: "auto",
  },
});

function Banner() {
  const classes = useStyles();
  return (
    <Wrapper>
      <Link to="/" className={classes.link}>Home</Link>
      <Link to="/login" className={classes.link}>Login</Link>
      <Link to="/shop" className={classes.link}>Shop</Link>
      <Link to="/about" className={classes.link}>About</Link>
      <Link to="/contact" className={classes.link}>Contact</Link>
      <Link to="/cart" className={classes.cart}>
        <IconButton>
          <Badge badgeContent={ 3 } color="error">
            <ShoppingCartIcon className={classes.cart}/>
          </Badge>
        </IconButton>
      </Link>
    </Wrapper>
  )
}


export default Banner;
