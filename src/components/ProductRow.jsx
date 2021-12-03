import * as React from 'react';

export const ProductRow = ({ product, columns }) => {

  return <tr>
    {columns.map((column, index) => <td key={index}>{column.key ? product[column.key] : column.getValue(product)}</td>)}
    {/*<td>*/}
    {/*{product.id}*/}
    {/*</td>*/}
    {/*<td>*/}
    {/*  {product.code}*/}
    {/*</td>*/}
    {/*<td>*/}
    {/*  xyz number*/}
    {/*</td>*/}
    {/*<td>*/}
    {/*  stock*/}
    {/*</td>*/}
    {/*<td>*/}
    {/*  stock*/}
    {/*</td>*/}
    {/*<td>*/}
    {/*  {product.name[selectedLanguage]}*/}
    {/*</td>*/}
    {/*<td>*/}
    {/*  {product.description[selectedLanguage].plainText}*/}
    {/*</td>*/}
  </tr>
}
