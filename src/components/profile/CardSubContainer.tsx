interface CardSubContainer {
  subTitle: string;
  badgeCount: number;
  children: React.ReactNode;
}

function CardSubContainer(props: CardSubContainer) {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-l font-semibold">{props.subTitle}</p>
        {!!props.badgeCount && (
          <div className="ms-2 grid h-5 w-5 place-content-center rounded-full bg-[#FF8F8F]">
            <div className="mt-0 text-xs font-extrabold">
              {props.badgeCount}
            </div>
          </div>
        )}
      </div>
      <div className="mb-8 mt-3 grid grid-cols-[repeat(auto-fit,minmax(380px,auto))] gap-2">
        {props.children}
      </div>
    </div>
  );
}

CardSubContainer.defaultProps = {
  subTitle: "Current Tasks",
  badgeCount: 0,
  children: null,
};

export default CardSubContainer;
