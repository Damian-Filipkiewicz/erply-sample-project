import * as React from 'react';
import ProductTable from '../components/ProductTable';
import { HeaderBar } from '../components/HeaderBar';

export const ProductList = () => {
  return <div className="productList">
    <HeaderBar/>
    <ProductTable/>
  </div>
}
