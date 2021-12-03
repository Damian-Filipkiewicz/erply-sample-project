import React, {useEffect, useState} from 'react';
import { callGetDataApi } from '../api/products';

const ProductTable = () => {
  const [productData, setProductData] = useState([])

  useEffect(() => {
    // callGetDataApi('product').then(response => setProductData(response))
  },[])

  return <div className="productList__box">test</div>
}

export default ProductTable