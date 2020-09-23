import React from 'react'
import Login from '../containers/Login';

import { Link } from '@reach/router';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  },
  left: {
    minWidth: "150px",
  }
});

function Banner() {
  const classes = useStyles();
  return (
    <Wrapper>
      <div>
        <Link to="/" className={classes.link}>Home</Link>
        <Link to="/shop" className={classes.link}>Shop</Link>
        <Link to="/about" className={classes.link}>About</Link>
        <Link to="/contact" className={classes.link}>Contact</Link>
      </div>
      <div className={classes.left}>
        <Link to="/cart" className={classes.cart}>
          <IconButton>
            <Badge badgeContent={ 3 } color="error">
              <ShoppingCartIcon className={classes.cart}/>
            </Badge>
          </IconButton>
        </Link>
        <Login/>
      </div>
    </Wrapper>
  )
}


export default Banner;
