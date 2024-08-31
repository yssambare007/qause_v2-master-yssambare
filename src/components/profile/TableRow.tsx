interface TableRowProps {
  columns: number;
  children: React.ReactNode;
  className?: string;
}

function TableRow(props: TableRowProps) {
  return (
    <div
      className={"grid " + props.className}
      style={{
        gridTemplateColumns: `repeat(${props.columns + 1}, 1fr)`,
      }}
    >
      <div className="col-span-1"></div>
      {props.children}
    </div>
  );
}

export default TableRow;
