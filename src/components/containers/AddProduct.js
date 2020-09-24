import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state';
import axios from 'axios';
import { productStore } from '../stores/ProductStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import palette from '../../styles/palette.json';

const useStyles = makeStyles({
  // dialog/modal styles
  input: {
    display: "none"
  },
  button: {
    backgroundColor: palette.button,
    color: palette.text,
    padding: "15px",
    margin: "15px",
    '&:hover': {
      background: palette.button_hover,
   },
  },
  row: {
    display: "block"
  },
  item: {
    margin: "10px"
  }
});

function ModifyPoduct() {
  const classes = useStyles();

  const init = {
    open: false,
    name: "",
    description: "",
    price: "",
    currency: "CAD",
    quantity: "",
    imageFile: null,
    imageName: "",
  }

  const [open, setOpen] = useState(init.open);
  const [name, setName] = useState(init.name);
  const [description, setDescription] = useState(init.description);
  const [price, setPrice] = useState(init.price);
  const [currency, setCurrency] = useState(init.currency);
  const [quantity, setQuantity] = useState(init.quantity);
  const [imageFile, setImageFile] = useState(init.imageFile);
  const [imageName, setImageName] = useState(init.imageName);

  const currencies = [
    {
      value: 'CAD',
      label: 'CAD',
    },
    {
      value: 'USD',
      label: 'USD',
    },
  ]; 

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  const handleClear = () => {
    setName(init.name);
    setDescription(init.description);
    setPrice(init.price);
    setCurrency(init.currency);
    setQuantity(init.quantity);
    setImageFile(init.imageFile);
    setImageName(init.imageName);
  };

  
  const handleUploadClick = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file.name);
  };


  const makeToast = (result, msg) => {
    const options = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if(result === "success"){
      toast.success(msg, options);
      setOpen(false);
      productStore.getAllProducts();
      return;
    }
    toast.error(msg, options);
  }  

  const handleSubmit = () => {
    const product = {
      name: name,
      description: description,
      price: price,
      currency: currency,
      quantity: quantity
    }

    const data = new FormData();
    data.append("imageFile", imageFile);
    for(let key in product) {
      data.append(key, product[key]);
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    axios.post('/products/', data, config)
      .then(res => makeToast('success', res.data.msg))
      .catch(err => makeToast('error', err.stack));
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <ToastContainer />

      <Button variant="contained" color="primary" onClick={handleClickOpen}>Add</Button>

      {/* <Button variant="contained" color="secondary" onClick={() => productStore.removeItem(2)}>Remove</Button> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            className={`${classes.item} ${classes.row}`}
            autoFocus
            value={name}
            label="Name"
            onChange={e => setName(e.target.value)}
          />
          <TextField
            className={`${classes.item} ${classes.row}`}
            value={description}
            label="Description"
            fullWidth
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            className={classes.item}
            value={price}
            label="Price"
            placeholder={"0.00"}
            onChange={e => setPrice(e.target.value)}
          />
          <TextField
            className={classes.item}
            select
            value={currency}
            label="Currency"
            onChange={e => setCurrency(e.target.value)}
            helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={`${classes.row}, ${classes.item}`}
            value={quantity}
            placeholder={"0"}
            label="Quantity In Stock"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setQuantity(e.target.value)}
          />
          <input
            accept=".jpg, .jpeg, .png"
            className={classes.input}
            id="upload_file_button"
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="upload_file_button">
            <Fab component="span" className={classes.button}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
          {imageName !== "" ? imageName : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} color="primary">
            Clear
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default view(ModifyPoduct);