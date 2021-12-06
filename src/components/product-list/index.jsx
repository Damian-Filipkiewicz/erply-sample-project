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
  keySort: 'name',
  language: selectedLanguage,
},
  {
    label: 'Code',
    key: 'code',
    keySort: 'code',
  },
  {
    label: 'in webshop',
    getValue: (obj) => obj.displayed_in_webshop ? 'Yes' : 'No',
    keySort: 'displayed_in_webshop',
  },
  {
    label: 'Width',
    key: 'width',
    keySort: 'width',
  },
  {
    label: 'Height',
    key: 'height',
    keySort: 'height',
  },
  {
    label: 'Type',
    key: 'type',
    keySort: 'type',
  },
  {
    label: 'Price',
    getValue: (obj) => `$${obj.price}`,
    keySort: 'price',
  },
  {
    label: 'Cost',
    getValue: (obj) => `$${obj.cost}`,
    keySort: 'cost',
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
    initialLoad(completeRequest).catch(err => console.error(err));
  }, [filters, limit]);

  const getColumns = React.useCallback(() => columns(selectedLanguage), [selectedLanguage]);

  const handleSorting = (selector, desc, language) => {
    const setDesc = selector === filters.sort.selector ? !desc : false;
    setFilters(prev => ({ ...prev, sort: { selector, desc: setDesc, ...(language && { language }) } }));
  };

  return (
    <div className="list__wrapper">
      <Filters setFilters={setFilters}/>
      <ProductHeader
        columns={getColumns()} handleSorting={handleSorting} selected={filters.sort.selector} desc={filters.sort.desc}
      />
      <InfiniteList
        columns={getColumns()} limit={limit} productData={productData} setProductData={setProductData}
        filterQuery={filterQuery}
      />
    </div>);
};

export default ListWrapper;
