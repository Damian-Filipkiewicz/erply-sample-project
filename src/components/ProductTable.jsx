import React from 'react';
import { Column, InfiniteLoader, Table, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { callGetDataApi } from '../api';
import { ProductRow } from './ProductRow';

const columns = (selectedLanguage) => [{
  label: 'Name',
  getValue: (obj) => obj.name[selectedLanguage],
  align: 'start',
  // key: 'name',
},
  {
    label: 'Code',
    key: 'code',
  },
  {
    label: 'in webshop',
    getValue: (obj) => obj.displayed_in_webshop ? 'Yes' : 'No',
    // key: 'displayed_in_webshop',
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
    // key: 'price',
  },
];

const ProductTable = () => {
  const [productData, setProductData] = React.useState([]);
  const [filters, setFilters] = React.useState({ sort: {}, filter: [] });
  const selectedLanguage = localStorage.getItem('language') || 'en';


  // React.useEffect(() => {
  //   const rawFiltersForApi = Object.keys(filters).filter(key => Object.keys(filters[key]).length).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(filters[key]))}`).join('&');
  //   const completeRequest = rawFiltersForApi ? `?${rawFiltersForApi}` : '';
  //   callGetDataApi('product', completeRequest).then(response => setProductData(response));
  // }, [filters]);

  // React.useEffect(() => {
  //   callGetDataApi('product?skip=0&take=20').then(response => {
  //     console.warn(response);
  //     setProductData(response);
  //   });
  // }, []);

  const getColumns = React.useCallback(() => columns(selectedLanguage), [selectedLanguage]);

  const isRowLoaded = React.useCallback(({ index }) => !!productData[index], [productData])
  const loadMoreRows = ({ startIndex = 0, stopIndex = 20 }) => callGetDataApi(`product?skip=${startIndex}&take=${stopIndex}`).then(response => {
    console.warn({  startIndex, stopIndex });
    setProductData(response);
  })

  const rowRenderer = ({ key, index }) => <ProductRow key={key} product={productData[index]} columns={getColumns()}/>

  const remoteRowCount = 150

  return (
    <div className="list__wrapper">
      {/*<Filters setFilters={setFilters}/>*/}
      {/*<table className="list__table">*/}
      {/*  <ProductHeader columns={getColumns()}/>*/}
      {/*  <tbody className="list__body">*/}
      {/*  {!productData?.length ? <EmptyListInfo/> : productData.map(product => <ProductRow*/}
      {/*    product={product} key={product.id} columns={getColumns()}*/}
      {/*  />)}*/}
      {/*  </tbody>*/}
      {/*</table>*/}
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={remoteRowCount}
      >
        {/*{({ onRowsRendered, registerChild }) => (*/}
        {/*<Table*/}
        {/*  width={1400}*/}
        {/*  height={900}*/}
        {/*  headerHeight={40}*/}
        {/*  rowHeight={40}*/}
        {/*  rowCount={productData?.length}*/}
        {/*  rowGetter={({ index }) => productData[index]}*/}
        {/*  ref={registerChild}*/}
        {/*>*/}
        {/*  /!*<ProductRow product={product} key={product.id} columns={getColumns()}/>*!/*/}
        {/*  {getColumns().map((column, index) => <Column*/}
        {/*    width={200}*/}
        {/*    onRowsRendered={onRowsRendered}*/}
        {/*    headerRenderer={() => column.label}*/}
        {/*    dataKey={column.key}*/}
        {/*    key={index}*/}
        {/*    headerStyle={{ textAlign: column.align || 'center' }}*/}
        {/*    style={{ textAlign: column.align || 'center' }}*/}
        {/*    cellRenderer={({ rowData: product }) => {*/}
        {/*      return !column.getValue ? product[column.key] : column.getValue(product);*/}
        {/*    }}*/}
        {/*  />)}*/}
        {/*</Table>)}*/}
        {({ onRowsRendered, registerChild }) => (
          <List
            height={900}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowHeight={50}
            rowCount={remoteRowCount}
            rowRenderer={rowRenderer}
            width={1300}
          />
        )}
      </InfiniteLoader>
    </div>);
};

export default ProductTable;
