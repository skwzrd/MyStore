import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import palette from '../../styles/palette.json';

import { appStore } from '../stores/AppStore';
import { view } from '@risingstack/react-easy-state';


const useStyles = makeStyles({
  root: {
    backgroundColor: palette.secondary,
    color: palette.text,
    padding: "10px",
    textAlign: "left",
    margin: "10px",
    height: "auto",
    width: "300px",
  },
  title: {
    paddingBottom: "10px"
  },
  image: {
    display: "flex",
    height: "200px",
    width: "auto",
    maxWidth: "300px",
    margin: "auto",
  },
  image_div: {
    backgroundColor: palette.text
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "8px",
  },
  description: {
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    background: `linear-gradient(90deg, ${palette.text} 170px, ${palette.secondary} 250px)`
  }
});

const description_length = 30;

function Product({ item }) {
  const classes = useStyles();

  if(!item.name) return null;
  return (
    <Card className={classes.root}>

      <Typography variant="h5" className={classes.title}>
        {item.name}
      </Typography>

      <div className={classes.image_div}>
        <img src={item.image_filename} alt={item.name} className={classes.image}/>
      </div>

      <div className={classes.row}>
        <div>{item.price} {item.currency}</div>
        {appStore.auth ? <div>Qty: {item.quantity}</div> : null}
      </div>

      <div className={classes.row}>
        <div className={classes.description}>
          {item.description.length > description_length ? item.description.slice(0, description_length) : item.description}
        </div>
        More Info
      </div>
    </Card>
  );
}

export default view(Product);
