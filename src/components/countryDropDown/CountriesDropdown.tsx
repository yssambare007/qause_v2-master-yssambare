interface Props {
  style?: string;
  height?: string;
  id?: string;
  onChange: (code: string) => void;
}

import * as React from "react";
import useAutocomplete from "@mui/material/useAutocomplete";
import { countries } from "../../utils/countries";
import Image from "next/image";

export default function CountriesDropdown(props: Props) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: countries,
    getOptionLabel: (option) =>
      `(+${option.callingCodes[0] as string}) ${option.name}`,
    autoComplete: true,
    autoHighlight: true,
    onChange: (e, value) => props.onChange(value?.callingCodes[0] as string),
    defaultValue: countries.find((country) => country.name === "India"),
  });

  return (
    <div className="relative">
      <div className="flex items-center justify-center" {...getRootProps()}>
        <div
          className={`flex items-center justify-center gap-2 px-2 ${
            props.height
          } w-28 sm:w-36 ${props.style || "border"} border-gray-400`}
        >
          {value?.alpha2Code && (
            <div className="relative h-[20px] w-[25px]">
              <Image
                src={`https://flagcdn.com/w20/${value?.alpha2Code.toLowerCase()}.png`}
                className="mr-1 h-[20px] w-[25px]"
                alt="flag"
                fill
              />
            </div>
          )}
          <input
            id="input"
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs outline-none sm:text-sm"
            {...getInputProps()}
          />
        </div>
      </div>
      {groupedOptions.length > 0 ? (
        <ul
          className="absolute z-[100] max-h-52 w-56 overflow-y-auto bg-white"
          {...getListboxProps()}
        >
          {(groupedOptions as typeof countries).map((option, index) => (
            <li
              className="flex min-w-fit cursor-pointer items-center gap-1 px-4 py-2"
              key={option.name}
              {...getOptionProps({ option, index })}
            >
              {option?.alpha2Code && (
                <Image
                  src={`https://flagcdn.com/w20/${option?.alpha2Code.toLowerCase()}.png`}
                  className="mr-1 h-[20px] w-[25px]"
                  alt="flag"
                  width={25}
                  height={20}
                />
              )}
              {`${option.name} (+${option.callingCodes[0]})`}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
