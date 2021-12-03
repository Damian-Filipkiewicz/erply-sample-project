import React, { useEffect, useState } from 'react';
import { callGetDataApi } from '../api/products';
import { Filters } from "./Filters";

const ProductTable = () => {
  const [productData, setProductData] = useState([])
  const [filters, setFilters] = useState({sort: {}, filter:[]})

  useEffect(() => {
    // callGetDataApi('product').then(response => setProductData(response))
  },[])

  useEffect(() => {
    const rawFiltersForApi = Object.keys(filters).filter(key => Object.keys(filters[key]).length).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(filters[key]))}`).join('&')
    const completeRequest = rawFiltersForApi ? `?${rawFiltersForApi}` : ''
    callGetDataApi('product', completeRequest).then(response => console.log(response))
  }, [filters])

  return (
    <div className="productList__box">
      <Filters setFilters={setFilters}/>
    </div>
  )
}

export default ProductTable