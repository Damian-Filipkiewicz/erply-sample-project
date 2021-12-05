import React from 'react';
import 'react-virtualized/styles.css';
import { callGetDataApi } from '../../api';
import { Filters } from './Filters';
import { ProductHeader } from './Header';
import InfiniteList from './InfiniteList';

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

const ListWrapper = () => {
  const initialQuery = 'product?skip=0&take=30';

  const [productData, setProductData] = React.useState([]);
  const [filters, setFilters] = React.useState({ sort: {}, filter: [] });
  const [filterQuery, setFilterQuery] = React.useState(initialQuery);
  const [limit, setLimit] = React.useState(0);

  const selectedLanguage = localStorage.getItem('language') || 'en';

  const initialLoad = (queryParams = '') => callGetDataApi(`product?skip=0&take=30${queryParams}`).then(response => setProductData(response));

  React.useEffect(() => {
    const rawFiltersForApi = Object.keys(filters).filter(key => Object.keys(filters[key]).length).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(filters[key]))}`).join('&');
    const completeRequest = rawFiltersForApi ? `&${rawFiltersForApi}` : '';

    if (!limit) {
      setLimit(30);
      return;
    }
    setFilterQuery(completeRequest);
    initialLoad(completeRequest);
  }, [filters, limit]);

  const getColumns = React.useCallback(() => columns(selectedLanguage), [selectedLanguage]);

  return (
    <div className="list__wrapper">
      <Filters setFilters={setFilters}/>
      <ProductHeader columns={getColumns()}/>
      <InfiniteList
        columns={getColumns()} limit={limit} productData={productData} setProductData={setProductData} filterQuery={filterQuery}
      />
    </div>);
};

export default ListWrapper;
