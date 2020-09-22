CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(32),
  price MONEY,
  currency VARCHAR(8),
  created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  image_filename VARCHAR(32),
  image_ext VARCHAR(8),
  quantity INTEGER
);

CREATE TABLE admin (
  admin_id SERIAL PRIMARY KEY,
  role INTEGER,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(32)
);

INSERT INTO product (
  name,
  price,
  currency,
  image_filename,
  image_ext,
  quantity
)
VALUES (
  'Cobalt',
  3.99,
  'CAD',
  'one',
  'jpg',
  -1 -- infinite
);

INSERT INTO product (
  name,
  price,
  currency,
  image_filename,
  image_ext,
  quantity
)
VALUES (
  'Lapis Lazuli',
  4.00,
  'CAD',
  'two',
  'jpg',
  7
);

INSERT INTO product (
  name,
  price,
  currency,
  image_filename,
  image_ext,
  quantity
)
VALUES (
  'Emerald',
  6.32,
  'CAD',
  'three',
  'jpg',
  6
);

INSERT INTO admin(
  role,
  first_name,
  last_name,
  email,
  phone
)
VALUES(
	1,
	'Michael',
	'Hladun',
	'mp.hladun@gmail.com',
	'873-688-3375'
);
