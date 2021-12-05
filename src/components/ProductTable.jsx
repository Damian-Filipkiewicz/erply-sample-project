import React from 'react';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { callGetDataApi } from '../api';
import { EmptyList } from './EmptyList';
import { Filters } from './Filters';
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
    label: 'in webshop',
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
  {
    label: 'Cost',
    getValue: (obj) => `$${obj.cost}`,
  },
];

const ProductTable = () => {
  const initialQuery = 'product?skip=0&take=30';

  const [productData, setProductData] = React.useState([]);
  const [filters, setFilters] = React.useState({ sort: {}, filter: [] });
  const [filterQuery, setFilterQuery] = React.useState(initialQuery);
  const [limit, setLimit] = React.useState(0);
  const [allDataLoaded, setAllDataLoaded] = React.useState(false);
  const infiniteLoader = React.useRef(null);

  const selectedLanguage = localStorage.getItem('language') || 'en';


  const initialLoad = (queryParams = '') => callGetDataApi(`product?skip=0&take=30${queryParams}`).then(response => setProductData(response));

  React.useEffect(() => {
    const rawFiltersForApi = Object.keys(filters).filter(key => Object.keys(filters[key]).length).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(filters[key]))}`).join('&');
    const completeRequest = rawFiltersForApi ? `&${rawFiltersForApi}` : '';

    if (!limit) {
      setLimit(30);
      return
    }
    setFilterQuery(completeRequest);
    initialLoad(completeRequest);
    console.warn('filters');


    // console.warn(infiniteLoader.current);
    // infiniteLoader.current.resetLoadMoreRowsCache(true)
  }, [filters, limit]);

  // React.useEffect(() => {
  //   initialLoad();
  // }, []);

  const getColumns = React.useCallback(() => columns(selectedLanguage), [selectedLanguage]);

  const isRowLoaded = React.useCallback(({ index }) => !!productData[index], [productData]);
  const loadMoreRows = ({ startIndex = 0, stopIndex = 30 }) => {
    if (allDataLoaded) return;


    console.warn({stopIndex,  startIndex, limit, t: !limit})

    if (stopIndex && startIndex && stopIndex === startIndex) {
      callGetDataApi(`product?skip=${startIndex}&take=${limit}${filterQuery}`).then(response => {
        if (response.length < limit) {
          setAllDataLoaded(true);
        }

        setProductData([...productData, ...response]);
      });
    }
  };

  const rowRenderer = ({ key, index, style }) => productData && productData[index] &&
    <ProductRow index={index} key={key} product={productData[index]} style={style} columns={getColumns()}/>;

  const remoteRowCount = React.useMemo(() => {
    return productData?.length + 1 || limit;
  }, [productData, limit]);

  return (
    <div className="list__wrapper">
      <Filters setFilters={setFilters}/>
      {/*<table className="list__table">*/}
        <ProductHeader columns={getColumns()}/>
      {/*  <tbody className="list__body">*/}
      {/*  {!productData?.length ? <EmptyListInfo/> : productData.map(product => <ProductRow*/}
      {/*    product={product} key={product.id} columns={getColumns()}*/}
      {/*  />)}*/}
      {/*  </tbody>*/}
      {/*</table>*/}
      <InfiniteLoader
        ref={infiniteLoader}
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
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                noRowsRenderer={() => <EmptyList/>}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowHeight={50}
                rowCount={remoteRowCount}
                rowRenderer={rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>);
};

export default ProductTable;
