import React from 'react';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { callGetDataApi } from '../../api';
import { EmptyList } from './EmptyList';
import { Row } from './Row';

const ProductList = ({ columns, limit, productData, setProductData, filterQuery }) => {
  const [allDataLoaded, setAllDataLoaded] = React.useState(false);
  const infiniteLoader = React.useRef(null);

  const isRowLoaded = React.useCallback(({ index }) => !!productData[index], [productData]);
  const loadMoreRows = ({ startIndex = 0, stopIndex = 30 }) => {
    if (allDataLoaded) return;

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
    <Row index={index} key={key} product={productData[index]} style={style} columns={columns}/>;

  const remoteRowCount = React.useMemo(() => {
    return productData?.length + 1 || limit;
  }, [productData, limit]);

  return (
    <InfiniteLoader
      ref={infiniteLoader}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={remoteRowCount}
    >
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
    </InfiniteLoader>);
};

export default ProductList;
