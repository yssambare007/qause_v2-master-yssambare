import * as React from "react";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectChipProps {
  options: any[];
  label?: string;
  current: any;
  onChange: (event: SelectChangeEvent<any>) => void;
}

export default function MultipleSelectChip(
  props: MultipleSelectChipProps
): JSX.Element {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>(
    props.current?.value || []
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const data = typeof value === "string" ? value.split(",") : value;
    setPersonName(data);
    props.onChange(event);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, textAlign: "left" }}>
        {props?.label && (
          <InputLabel id="qause-multiple-chip-label">{props.label}</InputLabel>
        )}
        <Select
          id="qause-multiple-chip"
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="qause-select-multiple-chip"
              label={props?.label}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.options.map((item: string, index: number) => (
            <MenuItem
              key={index}
              value={item}
              style={getStyles(item, personName, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
