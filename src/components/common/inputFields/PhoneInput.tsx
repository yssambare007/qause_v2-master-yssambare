import React from "react";
import CountriesDropdown from "../../countryDropDown/CountriesDropdown";
import CallIcon from "@mui/icons-material/Call";
import { reverseArray } from "../../../utils/utils";
interface Props {
  label?: string;
  value: string;
  disabled?: boolean;
  onChange?: (e: any) => void | React.ChangeEvent;
  id?: string | "";
}
function PhoneInput(props: Props) {
  const _setCountryCode = (e: string) => {
    let number = props.value?.includes("-")
      ? props.value.slice(props.value.indexOf("-") + 1)
      : props.value;
    number = e?.concat(`-${number}`);
    const newE = {
      target: {
        value: number,
        id: props.id,
      },
    };
    if (props.onChange) props.onChange(newE);
  };

  const handleValue = (value: string) => {
    if (value?.includes("+")) {
      return reverseArray(value).slice(0, 10).reverse().join("");
    }
    if (value?.includes("-")) {
      return value.slice(value.indexOf("-") + 1);
    }
    return value;
  };
  return (
    <div className="mb-[0.5rem]">
      <div className="mb-2 text-[16px] font-medium">{props.label}</div>
      <div
        className={`flex items-center ${props.disabled ? "bg-gray-200" : ""}`}
      >
        <CallIcon
          className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
          sx={{ fontSize: "2.5rem" }}
        />
        <CountriesDropdown height="h-[40px]" onChange={_setCountryCode} />
        <input
          disabled={props.disabled}
          onChange={props.onChange}
          type="number"
          value={handleValue(props.value)}
          className="h-[30px] w-[100%] rounded-r-sm border-b border-r border-t border-gray-400 px-[1rem] py-[19px] font-[muli] text-[12px] text-[#636363] focus:outline-[#80bdff86]"
          placeholder="Mobile Number *"
          id={props.id}
        />
      </div>
      <div
        className="mt-1 hidden text-[14px] text-[#ff0000a3]"
        id="phoneNo_error"
      ></div>
    </div>
  );
}

export default PhoneInput;
