interface TableProps {
  children: React.ReactNode;
}

function Table(props: TableProps) {
  return <div className="bg-[#F7F7F7]">{props.children}</div>;
}

export default Table;
