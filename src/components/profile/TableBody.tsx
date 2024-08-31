interface TableBodyProps {
  children: React.ReactNode;
}

function TableBody(props: TableBodyProps) {
  return <div className="bg-[#F7F7F7]">{props.children}</div>;
}

export default TableBody;
