export const ProductHeader = ({ columns }) => {

  console.warn(columns.map(column => column));

  return (
    <thead>
    <tr>
      {columns.map(column => (<th>{column.label}</th>))}
    </tr>
    </thead>
  );
};
