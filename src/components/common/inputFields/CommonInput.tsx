import { useEffect, useRef, useState } from "react";

interface Props {
  label?: string;
  placeHolder?: string;
  value?: string;
  disabled?: boolean | false;
  onChange?: (e: any) => void;
  id?: string | "";
  readOnly?: boolean;
  sublabel?: string;
}

function CommonInput(props: Props) {
  return (
    <div className="mb-[0.5rem] w-full">
      <div className="mb-2 text-[16px] font-medium">
        {props.label}{" "}
        <span className="text-[12px] text-[gray]">{props?.sublabel}</span>
      </div>
      <div className={`flex items-center`}>
        <input
          disabled={props.disabled}
          type="text"
          onChange={props.onChange}
          className="h-[50px] w-full  rounded-md border border-gray-400 px-[1rem] py-[19px] font-[muli] text-[16px] text-[#636363] focus:outline-[#80bdff86] disabled:focus:outline-none"
          placeholder={props.placeHolder}
          defaultValue={props.value ? props.value : ""}
          id={props.id}
          readOnly={props.readOnly}
        />
      </div>
      <div
        className="mt-1 hidden text-[14px] text-[#ff0000a3]"
        id="email_error"
      ></div>
    </div>
  );
}

export default CommonInput;
