import React from 'react';
import { Button } from '@material-ui/core';
import { view } from '@risingstack/react-easy-state';
import { appStore } from '../stores/AppStore';


function Login() {
  const log = appStore.auth ? "Logout" : "Login";
  const logAction = appStore.auth ? appStore.logout : appStore.login;
  return (
    <Button variant="contained" color="primary" style={{width: "7rem"}} onClick={() => logAction()}>{log}</Button>
  )
}

export default view(Login);