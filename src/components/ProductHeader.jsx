export const ProductHeader = ({ columns }) => {

  return (
    <div className="list__header">
      {columns.map(column => (<div style={{ 'text-align': column.align || 'center' }}>{column.label}</div>))}
    </div>
  );
};
