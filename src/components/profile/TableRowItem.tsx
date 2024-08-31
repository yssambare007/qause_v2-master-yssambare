interface TableRowItemProps {
  children: React.ReactNode;
  span: string;
  className: string;
}
function TableRowItem(props: TableRowItemProps) {
  return (
    <div
      className={props.className}
      style={{
        gridColumn: props.span,
      }}
    >
      {props.children}
    </div>
  );
}

TableRowItem.defaultProps = {
  className: "",
};
export default TableRowItem;
