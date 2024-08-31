export interface BadgeProps {
  text: string;
  type: BadgeType;
}

export enum BadgeType {
  STALE = "STALE",
  NORMAL = "NORMAL",
  WARNING = "WARNING",
  FAILED = "FAILED",
}

function Badge(props: BadgeProps) {
  return (
    <div
      className="rounded-lg px-2 pb-1 text-center"
      style={{ ...getClassName(props.type), width: "128px" }}
    >
      <p>{props.text}</p>
    </div>
  );
}

const getClassName = (type: BadgeType) => {
  switch (type) {
    case BadgeType.STALE:
      return { color: "#253DC0", backgroundColor: "#253DC01F" };
    case BadgeType.FAILED:
      return { color: "#F60D0D", backgroundColor: "#F60D0D1F" };
    case BadgeType.NORMAL:
      return { color: "#36B933", backgroundColor: "#36B9331F" };
    case BadgeType.WARNING:
      return { color: "#FF8515", backgroundColor: "#FFB1151F" };
    default:
      return {};
  }
};
export default Badge;
