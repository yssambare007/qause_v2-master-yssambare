export interface CardsContainerProps {
  title: string;
  children: React.ReactNode;
}

function CardsContainer(props: CardsContainerProps) {
  return (
    <div>
      <p className="text-l px-8 pb-3 pt-7 font-extrabold">{props.title}</p>
      <div className="rounded-lg border border-gray-300 px-8 py-3">
        {props.children}
      </div>
    </div>
  );
}

CardsContainer.defaultProps = {
  title: "My Tasks",
  children: null,
};

export default CardsContainer;
