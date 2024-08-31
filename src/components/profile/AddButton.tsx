import React from "react";
interface AddButtonProps {
  text?: string;
  width?: string;
  height?: string;
}
const AddButton = (props: AddButtonProps) => {
  return (
    <div className="ml-5 flex">
      <div
        className="h-32.091 relative flex-shrink-0"
        style={{ width: props.width, height: props.height }}
      >
        <div className="rounded-lg bg-[#CCD5F4] px-2 py-1">
          <p className="font-inter text-center text-base font-medium leading-[110%] text-black">
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddButton;
