import { TextField } from "@mui/material";
import * as React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

interface Props {
  // Incoming Props
  onChange: (address: string) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => void;
  disabled?: boolean | false;
  error?: boolean;
  helperText?: string;
  id?: string;
}

const AutoComplete: React.FC<Props> = (props: Props) => {
  const [address, setAddress] = React.useState("");

  function handleChange(newAddress: string) {
    setAddress(newAddress);
    props.onChange(newAddress);
  }

  async function handleSelect(selectedAddress: string) {
    setAddress(selectedAddress);
    props.onChange(selectedAddress);
  }
  return (
    <div className="relative">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            {/* <input
              {...getInputProps()}
              disabled={props.disabled}
              className={`h-[30px] w-[100%] rounded-r-sm border border-gray-400 py-[19px] px-[1rem] font-[muli] text-[12px] text-[#636363] focus:outline-[#80bdff86] ${props.disabled?'bg-gray-200': ''}`}
              placeholder="Enter a location *"
            /> */}
            <TextField
              {...getInputProps()}
              disabled={props.disabled}
              placeholder="Enter a location *"
              fullWidth
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  fontFamily: "muli",
                  paddingLeft: "0px",
                },
              }}
              error={props.error}
              helperText={props.helperText}
              onBlur={props.onBlur}
              id={props.id}
            />
            {suggestions.length > 0 && (
              <div className="border-grap-500 absolute top-10 z-50 w-[100%] border bg-white">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.description}
                    className="cursor-pointer p-1 hover:bg-[#e5e5e5] "
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default AutoComplete;
