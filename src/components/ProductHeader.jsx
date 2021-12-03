export const ProductHeader = ({ columns }) => {

  console.warn(columns.map(column => column));

  return (
    <thead>
    <tr>
      {columns.map(column => (<th style={{ 'text-align': column.align || 'center' }}>{column.label}</th>))}
    </tr>
    </thead>
  );
};
