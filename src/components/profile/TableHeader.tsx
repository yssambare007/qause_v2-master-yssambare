interface TableHeaderProps {
  columns: number;
  children: React.ReactNode;
  className?: string;
}

function TableHeader(props: TableHeaderProps) {
  return (
    <div
      className={
        "grid w-full rounded-md bg-[#F0F2FC] drop-shadow-md before:h-full before:w-3 before:rounded-l-lg before:bg-[#CCD5F4] " +
        props.className
      }
      style={{
        gridTemplateColumns: `repeat(${props.columns + 1}, 1fr)`,
      }}
    >
      {props.children}
    </div>
  );
}

export default TableHeader;
