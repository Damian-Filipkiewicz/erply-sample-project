import * as React from 'react';
import ProductListWrapper from '../components/product-list';
import { HeaderBar } from '../components/HeaderBar';

export const ProductList = () => {
  return <div className="list">
    <HeaderBar/>
    <ProductListWrapper/>
  </div>
}
