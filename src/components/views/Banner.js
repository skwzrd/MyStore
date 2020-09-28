import React from 'react'
import Login from '../containers/Login';
import { cartStore } from '../stores/CartStore';
import { appStore } from '../stores/AppStore';
import { view } from '@risingstack/react-easy-state';

import { Link } from '@reach/router';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import palette from '../../styles/palette.json';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  background: ${palette.secondary};
  color: ${palette.text};
  font-size: 20px;
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
    display: "flex",
    justifyContent: "space-between",
    width: "350px"
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
          <FormGroup style={{transform: "translate(0, -3px)"}}>
            <FormControlLabel
              control={<Switch color="secondary" onChange={appStore.changeNotifications}/>}
              label="SQL Alerts"
              labelPlacement="start"
            />
          </FormGroup>
          <Link to="/cart" className={classes.cart}>
            <IconButton style={{top: "-9px"}}>
              <Badge badgeContent={ cartStore.itemCount } color="error">
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


export default view(Banner);
