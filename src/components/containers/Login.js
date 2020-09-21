import React from 'react';
import { useStyleChild } from '../../styles/Child';
import { Button } from '@material-ui/core';
import { view } from '@risingstack/react-easy-state';
import { appStore } from '../stores/AppStore';


function Shop() {
  const classes = useStyleChild();
  const log = appStore.auth ? "Logout" : "Login";
  const logAction = appStore.auth ? appStore.logout : appStore.login;
  return (
    <div className={classes.root}>
      <p>Use the admin credentials.</p>
      <Button variant="contained" color="primary" onClick={() => logAction()}>{log}</Button>
      <p>Last Logged In: {appStore.lastLogin}</p>
    </div>
  )
}

export default view(Shop);