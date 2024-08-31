import { TextField } from "@mui/material";

type MuiInputWithLabelProps = {
  label: string;
  placeHolder: string;
  id: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  value: string;
  helperText?: string;
  error?: boolean;
};
const MuiInputWithLabel = ({
  label,
  placeHolder,
  id,
  onChange,
  onBlur,
  disabled,
  value,
  error,
  helperText,
}: MuiInputWithLabelProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="mb-2 text-[16px] font-medium">{label}</span>
      <TextField
        fullWidth
        id={id}
        disabled={disabled}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        size="small"
        sx={{
          "& .MuiInputBase-root": {
            fontFamily: "muli",
            paddingLeft: "0px",
          },
        }}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};

export default MuiInputWithLabel;
