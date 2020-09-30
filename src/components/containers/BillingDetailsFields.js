import React from 'react';
import TextField from '@material-ui/core/TextField';

function BillingDetailsFields({ handleChange, details }) {
  return (
  <>
    <TextField
      autoComplete="first-name"
      label="First Name"
      value={details.firstName}
      onChange={(e) => handleChange('firstName', e.target.value)}
      margin="dense"
      required={true}
      style={{ marginRight: "50px" }}
    />
    <TextField
      autoComplete="last-name"
      label="Last Name"
      value={details.lastName}
      onChange={(e) => handleChange('lastName', e.target.value)}
      margin="dense"
      required={true}
    />
    <TextField
      autoComplete="e-mail"
      label="Email"
      value={details.email}
      type="email"
      onChange={(e) => handleChange('email', e.target.value)}
      margin="dense"
      required={true}
      style={{ marginRight: "50px" }}
    />
    <TextField
      autoComplete="address"
      label="Address"
      value={details.address}
      onChange={(e) => handleChange('address', e.target.value)}
      margin="dense"
      required={true}
      fullWidth
    />
    <TextField
      autoComplete="postal-code"
      label="Postal Code"
      value={details.postalCode}
      onChange={(e) => handleChange('postalCode', e.target.value)}
      margin="dense"
      required={true}
      style={{ marginRight: "50px" }}
    />
    <TextField
      autoComplete="city"
      label="City"
      value={details.city}
      onChange={(e) => handleChange('city', e.target.value)}
      margin="dense"
      required={true}
    />
    <TextField
      autoComplete="province"
      label="Province"
      value={details.province}
      onChange={(e) => handleChange('province', e.target.value)}
      margin="dense"
      required={true}
      style={{ marginBottom: "25px" }}
    />
  </>
  );
}
export default BillingDetailsFields;
