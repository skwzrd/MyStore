const express = require('express')
const auth = require('../middleware/auth')
const pool = require('../utils/db_connect')

const router = express.Router();

// avoid wasting clients from the db pool, use this
const validateNumber = (num, msg, res) => {
  if(!Number(num)){
    res.status(404).json({msg})
    return
  }
  return num;
}

const errorHandler = (err, res) => {
  console.error('Error executing query: ', err.stack)
  res.status(404).json({msg: "Page Not Found"})
}


// @desc get all products
// @access public
router.get('/', (req, res) => {
  pool
  .query('select * from product;')
  .then(psql => res.json(psql.rows))
  .catch(err => errorHandler(err))
});


// @desc gets a product with given id
// @access public
router.get('/:id', (req, res) => {
  const id = validateNumber(req.params.id, "ID NaN", res)

  pool
  .query('select * from product where product_id = $1;', [id])
  .then(psql => res.json(psql.rows))
  .catch(err => errorHandler(err, res))
});


// @desc gets products on page number
// @access public
router.get('/page/:page', (req, res) => {
  const page = validateNumber(req.params.page, "Page NaN", res)

  // pagination: below will get products 1-9, 10-19, etc.
  const page_items = 10;
  const lower = page === 1 ? 1 : (page - 1) * page_items;
  const upper = page * page_items;

  pool
  .query('select * from product where product_id >= $1 and product_id < $2;', [lower, upper])
  .then(psql => res.json(psql.rows))
  .catch(err => errorHandler(err, res))
});


// @desc creates a product
// @access private
router.post('/', auth, (req, res) => {
  const b = req.body;
  pool
  .query(`
    insert into product (
      name,
      price,
      currency,
      image_filename,
      image_ext,
      quantity
    )
    values ($1, $2, $3, $4, $5, $6);`,
    [b.name, b.price, b.currency, b.image_filename, b.image_ext, b.quantity])
  .then(psql => res.json({msg: "Product Created"}))
  .catch(err => errorHandler(err, res))
});


// @desc updates a product with given id
// @access private
router.put('/:id', auth, (req, res) => {
  const b = req.body;
  pool
  .query(`
    update product set
      name = $1,
      price = $2,
      currency = $3,
      image_filename = $4,
      image_ext = $5,
      quantity = $6
    where product_id = $7;
  `, [b.name, b.price, b.currency, b.image_filename, b.image_ext, b.quantity, req.params.id])
  .then(psql => res.json({msg: "Product Updated"}))
  .catch(err => errorHandler(err, res))
});


// @desc deletes a product with id
// @access private
router.delete('/:id', auth, (req, res) => {
  const id = validateNumber(req.params.id, "ID NaN", res)

  pool
  .query(`
    delete from product
    where product_id = $1;
  `, [id])
  .then(psql => res.json({msg: "Product Deleted"}))
  .catch(err => errorHandler(err, res))
});


module.exports = router;
