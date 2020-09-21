import React from 'react';
import Paper from '@material-ui/core/Paper';
import PageWrapper from '../views/PageWrapper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: "inherit",
    padding: "2rem",
  },
});

export default function Info({title, child}) {
  const classes = useStyles();
  return (
    <PageWrapper>
      <Paper className={classes.root} elevation={3}>
        <h1>{title}</h1>
        {child}
      </Paper>
    </PageWrapper>
  )
}