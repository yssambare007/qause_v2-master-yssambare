import React, { ReactElement } from "react";
import { InputAdornment, TextField } from "@mui/material";

type InputWithIconProps = {
  Icon: ReactElement;
  onChange: (e: any) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => void;
  value: string;
  id: string;
  placeholder: string;
  error?: boolean;
  helperText?: string;
};

const InputWithIcon = ({
  Icon,
  onChange,
  onBlur,
  value,
  id,
  placeholder,
  error,
  helperText,
}: InputWithIconProps): JSX.Element => {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      placeholder={placeholder}
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          fontFamily: "muli",
          paddingLeft: "0px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{Icon}</InputAdornment>
        ),
      }}
      error={error}
      helperText={helperText}
    />
  );
};

export default InputWithIcon;
