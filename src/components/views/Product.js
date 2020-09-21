import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    padding: "10px",
    textAlign: "left",
    margin: "10px",
    minHeight: "300px",
    minWidth: "300px",
  },
  image: {
    display: "flex",
    maxWidth: "300px",
    maxHeight: "300px",
    margin: "0 auto"
  }
});

export default function Product({ item }) {
  const classes = useStyles();
  const image = require(`../../images/${item.id}.${item.imageExt}`);
  return (
    <Card className={classes.root}>
      <Typography variant="h5" component="h2">
        {item.name}
      </Typography>
      <Typography color="textSecondary">
        {item.price} {item.currency}
      </Typography>
      <img src={image} alt={item.name} className={classes.image}/>
    </Card>
  );
}