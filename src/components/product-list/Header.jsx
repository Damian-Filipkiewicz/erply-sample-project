export const ProductHeader = ({ columns, handleSorting, selected, desc = false }) => {

  const getSortSign = (desc) => desc ? ' ▲' : ' ▼';
  return (
    <div className="list__header">
      {columns.map(column => (
        <div
          key={column.keySort}
          onClick={() => handleSorting(column.keySort, desc, column.language)}
          style={{ 'textAlign': column.align || 'center' }}
        >
          {column.label}
          {selected === column.keySort && getSortSign(desc)}
        </div>
      ))}
    </div>
  );
};
