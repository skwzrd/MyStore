import React, { useState } from 'react'
import { view } from '@risingstack/react-easy-state';
import { productStore } from '../stores/ProductStore';
import 'react-toastify/dist/ReactToastify.css';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
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
  product: {
    margin: "10px"
  }
});

function AddProduct() {
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
    watermark: false,

    error: "",
  }

  const [open, setOpen] = useState(init.open);
  const [name, setName] = useState(init.name);
  const [description, setDescription] = useState(init.description);
  const [price, setPrice] = useState(init.price);
  const [currency, setCurrency] = useState(init.currency);
  const [quantity, setQuantity] = useState(init.quantity);
  const [imageFile, setImageFile] = useState(init.imageFile);
  const [imageName, setImageName] = useState(init.imageName);
  const [watermark, setWatermark] = useState(init.watermark);
  
  const [nameError, setNameError] = useState(init.error);
  const [descriptionError, setDescriptionError] = useState(init.error);
  const [priceError, setPriceError] = useState(init.error);
  const [currencyError, setCurrencyError] = useState(init.error);
  const [quantityError, setQuantityError] = useState(init.error);
  const [imageFileError, setImageFileError] = useState(init.error);

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


  const fieldsVerified = () => {
    let verified = true;
    setNameError(init.error);
    setDescriptionError(init.error)
    setPriceError(init.error);
    setCurrencyError(init.error);
    setQuantityError(init.error);
    setImageFileError(init.error);

    setName(name.trim());
    if(!/^[a-zA-Z0-9 ]{2,32}$/.test(name)){
      setNameError("Use 2 to 32 alphanumerics.");
      verified = false;
    }
    else if(!/^.{2,512}$/.test(description)){
      setDescriptionError("Use 2 to 512 characters.");
      verified = false;
    }
    else if((!/^[0-9]{0,5}.[0-9]{0,2}$/.test(price))
              || (isNaN(price))
              || (Number(price) < 0.00)){
      setPriceError("Invalid price.");
      verified = false;
    }
    else if(!/^CAD$|^USD$/.test(currency)){
      setCurrencyError("Unsupported currency.");
      verified = false;
    }
    else if(!/^[0-9]+$/.test(quantity)){
      setQuantityError("Invalid quanitity.");
      verified = false;
    }
    else if(!(imageFile) ||
            !(/.png$|.jpg$|.jpeg$/.test(imageFile.name.toLowerCase()))){
      setImageFileError("Upload a PNG or JPG.");
      verified = false;
    }
    return verified;
  }

  const handleSubmit = async () => {
    if(!fieldsVerified()){
      return;
    }

    const product = {
      name: name,
      description: description,
      price: price,
      currency: currency,
      quantity: quantity,
      watermark: watermark,
    }

    const data = new FormData();
    data.append("imageFile", imageFile);
    for(let key in product) {
      data.append(key, product[key]);
    }

    await productStore.addProduct(data);
    setOpen(false);
    await productStore.getAllProducts();
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Add</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth = {'sm'}
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            className={`${classes.product} ${classes.row}`}
            autoFocus
            value={name}
            label="Name"
            onChange={e => setName(e.target.value)}
            required={true}
            error={nameError ? true : false}
            helperText={nameError}
          />
          <TextField
            className={`${classes.product} ${classes.row}`}
            value={description}
            label="Description"
            multiline={true}
            rows={1}
            rowsMax={10}
            fullWidth
            onChange={e => setDescription(e.target.value)}
            required={true}
            error={descriptionError ? true : false}
            helperText={descriptionError}
          />
          <TextField
            className={classes.product}
            value={price}
            label="Price"
            placeholder={"0.00"}
            onChange={e => setPrice(e.target.value)}
            required={true}
            type="tel"
            error={priceError ? true : false}
            helperText={priceError}
          />
          <TextField
            className={classes.product}
            select
            value={currency}
            label="Currency"
            onChange={e => setCurrency(e.target.value)}
            error={currencyError ? true : false}
            helperText={currencyError}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <div className={classes.row}>
          <TextField
            className={`${classes.row}, ${classes.product}`}
            value={quantity}
            placeholder={"0"}
            label="Quantity In Stock"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setQuantity(e.target.value)}
            required={true}
            error={quantityError ? true : false}
            helperText={quantityError}
          />
          </div>
          <input
            accept=".jpg, .jpeg, .png"
            className={classes.input}
            id="upload_file_button"
            type="file"
            onChange={handleUploadClick}
            required={true}
          />
          <label htmlFor="upload_file_button">
            <Fab component="span" className={classes.button}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={watermark}
                onChange={() => setWatermark(!watermark)}
                color="primary"
              />
            }
            label="Watermark Image"
          />
          {imageName !== "" ? <div className={classes.row}>{imageName}</div> : null}
          {imageFileError ? <Typography color="secondary" className={classes.row}>{imageFileError}</Typography> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} color="secondary">
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

export default view(AddProduct);