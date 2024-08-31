interface SubContainerProps {
  subTitle: string;
  badgeCount: number;
  children: React.ReactNode;
}

function SubContainer(props: SubContainerProps) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-l mb-3 font-semibold">{props.subTitle}</p>
        {!!props.badgeCount && (
          <div className="ms-2 grid h-5 w-5 place-content-center rounded-full bg-[#FF8F8F]">
            <div className="mt-0 text-xs font-extrabold">
              {props.badgeCount}
            </div>
          </div>
        )}
      </div>
      <div>{props.children}</div>
    </div>
  );
}

SubContainer.defaultProps = {
  subTitle: "Current Tasks",
  badgeCount: 0,
  children: null,
};
export default SubContainer;
