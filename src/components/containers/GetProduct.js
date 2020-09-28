import React, { useState, useEffect } from 'react';
import { useParams } from "@reach/router";
import { view } from '@risingstack/react-easy-state';
import { productStore } from '../stores/ProductStore';
import ProductShowcase from '../views/ProductShowcase';

function GetProduct() {
  const params = useParams();

  const { product_id } = params;
  const [product, setProduct] = useState(null)

  useEffect(() => {
    setProduct(productStore.getProduct(product_id))
  }, [product_id]);

  return (
    <>
      <ProductShowcase product={product}/>
    </>
  )
}

export default view(GetProduct);
