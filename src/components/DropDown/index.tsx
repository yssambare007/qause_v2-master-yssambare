import {
  Checkbox,
  FormControl,
  InputBasePropsSizeOverrides,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CategoryType } from "../../services/types/models";

interface DropDownProps {
  isMulti: boolean;
  options: CategoryType[] | string[];
  size: "sm" | "md";
  selected: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  label: string;
}
export const DropDown = (props: DropDownProps) => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "300px",
      },
    },
  };
  return (
    <>
      <FormControl>
        <Select
          value={props.selected}
          onChange={props.handleChange}
          MenuProps={MenuProps}
          multiple={props.isMulti}
          size={props.size === "sm" ? "small" : "medium"}
          renderValue={(selected) => selected.join(",")}
        >
          {props.options.map((item: CategoryType | string, index: number) => {
            if (typeof item === "object") {
              return (
                <MenuItem aria-setsize={400} key={index} value={item.name}>
                  <Checkbox checked={props.selected.indexOf(item.name) > -1} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            } else {
              return (
                <MenuItem aria-setsize={400} key={index} value={item}>
                  <Checkbox checked={props.selected.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </>
  );
};
