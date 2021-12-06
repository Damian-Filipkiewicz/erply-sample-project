import * as React from 'react';
import { HeaderBar } from '../components/HeaderBar';
import ProductListWrapper from '../components/product-list';

export const ProductList = () => {
  return <div className="list">
    <HeaderBar/>
    <ProductListWrapper/>
  </div>;
};
