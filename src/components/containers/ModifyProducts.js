import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state';
import { products, createItem } from '../stores/ProductStore';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// products.addItem(createItem("HI", 3.33))

function ModifyPoducts() {
  const blankProduct = {
    id: "4",
    name: "",
    price: 0.00,
    currency: "CAD",
    created_date: "",
    imageExt: "jpg",
  }

  const [open, setOpen] = useState(false);
  const [product, setNewProduct] = useState(blankProduct);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field, value) => {
    const newProduct = Object.assign({ ...product }, {
      [field]: value
    });
    setNewProduct(newProduct);
  }

  const handleSubmit = () => {
    const newProduct = Object.assign({ ...product }, {
      created_date: moment().format('LLL'),
      // id: uuidv4()
    });
    products.addItem(newProduct);
    setOpen(false);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Add</Button>
      {/* <Button variant="contained" color="secondary" onClick={() => products.removeItem(2)}>Remove</Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            fullWidth
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
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

export default view(ModifyPoducts);