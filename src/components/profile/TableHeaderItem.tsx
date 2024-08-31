interface TableHeaderItemProps {
  children: React.ReactNode;
  span: string;
  className: string;
}
function TableHeaderItem(props: TableHeaderItemProps) {
  return (
    <div
      className={`py-3 ${props.className}`}
      style={{ gridColumn: props.span }}
    >
      <div>{props.children}</div>
    </div>
  );
}

TableHeaderItem.defaultProps = {
  className: "",
};

export default TableHeaderItem;
