import React from "react";
import Cross from "../../../public/images/profile/Cross.svg";
interface PortfolioLanguageBoxProps {
  text: string;
  onClick: (item: string) => void;
}
const PortfolioLanguageBox = (props: PortfolioLanguageBoxProps) => {
  return (
    <div className="w-113.867 h-33.533 mr-2 flex flex-shrink-0 items-center rounded-xl border border-gray-400 pl-1.5">
      <span className="mr-2">{props.text}</span>
      <Cross
        onClick={() => props.onClick(props.text)}
        className="mt-1.48 mr-1.5 cursor-pointer"
      />
    </div>
  );
};

export default PortfolioLanguageBox;
