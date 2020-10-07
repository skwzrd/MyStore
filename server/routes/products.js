const express = require('express')
const pool = require('../utils/db_connect')
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

const auth = require('../middleware/auth');
const {
  image_path,
  wm_image_path,
  waterMark,
  makePaths,
} = require('../utils/misc');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, image_path(''));
  },
  filename: function (req, file, cb) {
    const uniqueName = uuid.v4();
    cb(null, uniqueName + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });

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
  .then(psql => res.json(makePaths(psql.rows)))
  .catch(err => errorHandler(err))
});


// @desc gets a product with given id
// @access public
router.get('/:id', (req, res) => {
  const id = validateNumber(req.params.id, "ID NaN", res)

  pool
  .query('select * from product where product_id = $1;', [id])
  .then(psql => res.json(makePaths(psql.rows)[0]))
  .catch(err => errorHandler(err, res))
});


// @desc gets products on page number
// @access public
router.get('/page/:page', (req, res) => {
  const page = validateNumber(req.params.page, "Page NaN", res)

  // pagination: below will get products 1-9, 10-19, etc.
  const page_products = 10;
  const lower = page === 1 ? 1 : (page - 1) * page_products;
  const upper = page * page_products;

  pool
  .query('select * from product where product_id >= $1 and product_id < $2;', [lower, upper])
  .then(psql => res.json(makePaths(psql.rows)))
  .catch(err => errorHandler(err, res))
});


// @desc creates a product
// @access private
router.post('/', auth, upload.single("imageFile"), (req, res) => {
  const filename = req.file.filename;
  if(req.body.watermark==='true'){
    waterMark(image_path(filename), wm_image_path(filename));
  }
  else{
    fs.rename(image_path(filename), wm_image_path(filename), (error) => {
      if (error){
        console.log(error)
      }
    })
  }

  pool
  .query(`
    insert into product (
      name,
      description,
      price,
      currency,
      image_filename,
      image_ext,
      quantity
    )
    values ($1, $2, $3, $4, $5, $6, $7);`,
    [
      req.body.name,
      req.body.description,
      Number(req.body.price),
      req.body.currency,
      req.file.filename,
      path.extname(req.file.originalname),
      Number(req.body.quantity)
    ]
  )
  .catch(err => () => {errorHandler(err, res); res.json({msg: "Error Creating Product"})})
  return res.json({msg: "Product Created"});
});


// @desc updates a product with given id
// @access private
router.put('/:id', auth, (req, res) => {
  const b = req.body;
  pool
  .query(`
    update product set
      name = $1,
      description = $2,
      price = $3,
      currency = $4,
      image_filename = $5,
      image_ext = $6,
      quantity = $7
    where product_id = $8;
  `, [b.name, b.description, b.price, b.currency, b.image_filename, b.image_ext, b.quantity, req.params.id])
  .then(psql => res.json({msg: "Product Updated"}))
  .catch(err => errorHandler(err, res))
});


// @desc deletes a product with id
// @access private
router.delete('/:id', auth, (req, res) => {
  const id = validateNumber(req.params.id, "ID NaN", res)

  pool
  .query(`
    select image_filename
    from product
    where product_id = $1;
  `, [id])
  .then(psql => {
    pool
    .query(`
    delete from product
    where product_id = $1;
    `, [id])
    .catch(err => errorHandler(err, res));

    const { image_filename } = psql.rows[0];
    fs.unlink(wm_image_path(image_filename), (error) => {
      if(error){
        console.error(error)
      }
    });
    fs.unlink(image_path(image_filename), (error) => {
      if(error){
        console.error(error)
      }
    });
  })
  .catch(err => errorHandler(err, res))

  return res.json({msg: "Product Deleted"});

});

module.exports = router;
