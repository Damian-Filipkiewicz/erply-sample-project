import React, { useEffect, useState } from 'react';
import { callGetDataApi } from '../api';
import { EmptyListInfo } from './list/EmptyListInfo';
import { ProductHeader } from './ProductHeader';
import { ProductRow } from './ProductRow';

const columns = (selectedLanguage) => [{
  label: 'Name',
  getValue: (obj) => obj.name[selectedLanguage],
  align: 'start',
},
  {
    label: 'Code',
    key: 'code',
  },
  {
    label: 'Displayed in webshop',
    getValue: (obj) => obj.displayed_in_webshop ? 'Yes' : 'No',
  },
  {
    label: 'Width',
    key: 'width',
  },
  {
    label: 'Height',
    key: 'height',
  },
  {
    label: 'Type',
    key: 'type',
  },
  {
    label: 'Price',
    getValue: (obj) => `$${obj.price}`,
  },
];

const ProductTable = () => {
  const [productData, setProductData] = useState([]);

  const selectedLanguage = localStorage.getItem('language') || 'en';

  useEffect(() => {
    callGetDataApi('product').then(response => {
      console.warn(response);
      setProductData(response);
    });
  }, []);

  const getColumns = React.useCallback(() => columns(selectedLanguage), [selectedLanguage]);

  return (
    <div className="list__wrapper">
      <table className="list__table">
        <ProductHeader columns={getColumns()}/>
        <tbody className="list__body">
        {!productData?.length ? <EmptyListInfo/> : productData.map(product => <ProductRow
          product={product} key={product.id} columns={getColumns()}
        />)}
        </tbody>
      </table>
    </div>);
};

export default ProductTable;
