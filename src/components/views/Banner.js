import React from 'react'
import Login from '../containers/Login';

import { Link } from '@reach/router';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';

import palette from '../../styles/palette.json';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5h;
  background: ${palette.secondary};
  color: ${palette.text};
  font-size: 20px;
  align-items: center;
  padding: 16px;
  margin-bottom: 10px;
`;

const useStyles = makeStyles({
  link: {
    color: palette.text,
    textDecoration: "none",
    paddingRight: "16px",
  },
  cart: {
    color: palette.text,
  },
  left: {
    minWidth: "150px",
  }
});

function Banner() {
  const classes = useStyles();
  return (
    <Paper elevation={5}>
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
    </Paper>
  )
}


export default Banner;
