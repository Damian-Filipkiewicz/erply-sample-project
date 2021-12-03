import * as React from 'react';

export const ProductRow = ({ product, columns }) => {
  return <tr className="list__row">
    {columns.map((column, index) => <td key={index} style={{ 'text-align': column.align || 'center' }}>{column.key ? product[column.key] : column.getValue(product)}</td>)}
  </tr>
}
