const express = require('express')

const app = express()
const port = process.env.port || 5000;

app.use(express.json())
  
app.use('/products', require('./routes/products'));
app.use('/products', require('./routes/products'));

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})
