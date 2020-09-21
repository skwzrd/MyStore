import React from 'react'

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    color: "#3d405b"
  },
});

export default function NotFound() {
  const classes = useStyles();
  return (
    <h1 className={classes.root}>404 Page Not Found!</h1>
  )
}

