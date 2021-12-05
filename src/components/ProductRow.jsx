import * as React from 'react';

export const ProductRow = ({ product, columns }) => {
  if (!product) return <div></div>;
  return <div className="list__row">
    {columns.map((column, index) => <div
      key={index} style={{ 'text-align': column.align || 'center' }}
    >{column.key ? product[column.key] : column.getValue(product)}</div>)}
  </div>;
};
