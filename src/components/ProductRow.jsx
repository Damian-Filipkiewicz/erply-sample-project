import * as React from 'react';

export const ProductRow = ({ product, columns, style }) => {
  return <div className="list__row style" style={style}>
    {columns.map((column, index) => <div
      key={index} style={{ textAlign: column.align || 'center' }}
    >{column.key ? product[column.key] : column.getValue(product)}</div>)}
  </div>;
};
