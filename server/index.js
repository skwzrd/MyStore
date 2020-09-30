const express = require('express')

const app = express();
const port = process.env.port || 5000;

// expose folder for image uploads
app.use('/uploads', express.static('uploads'));

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
});
