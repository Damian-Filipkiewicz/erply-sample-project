import React from 'react';
import { callGetDataApi } from '../api';
import { EmptyListInfo } from './list/EmptyListInfo';
import { ProductHeader } from './ProductHeader';
import { ProductRow } from './ProductRow';
import { Filters } from "./Filters";


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
  const [productData, setProductData] = React.useState([])
  const [filters, setFilters] = React.useState({sort: {}, filter:[]})
  const selectedLanguage = localStorage.getItem('language') || 'en';


  React.useEffect(() => {
    const rawFiltersForApi = Object.keys(filters).filter(key => Object.keys(filters[key]).length).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(filters[key]))}`).join('&')
    const completeRequest = rawFiltersForApi ? `?${rawFiltersForApi}` : ''
    callGetDataApi('product', completeRequest).then(response => setProductData(response))
  }, [filters])

  React.useEffect(() => {
    callGetDataApi('product').then(response => {
      console.warn(response);
      setProductData(response);
    });
  }, []);

  const getColumns = React.useCallback(() => columns(selectedLanguage), [selectedLanguage]);

  return (
    <div className="list__wrapper">
      <Filters setFilters={setFilters}/>
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
