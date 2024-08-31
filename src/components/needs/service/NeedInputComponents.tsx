import React, { useCallback, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { PanToolAlt } from "@mui/icons-material";
import dynamic from "next/dynamic";
import type { SelectChangeEvent } from "@mui/material";
import {
  TextField,
  OutlinedInput,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
} from "@mui/material";
import Select from "@mui/material/Select";
import MultipleSelectChip from "../../customInput/MultipleSelectChip";
import { useMutation } from "react-query";
import { uploadNeedFiles } from "../../../utils/apis/needs/Index";
import { Box } from "@mui/system";
import PlacesAutocomplete from "react-places-autocomplete";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

interface InputProps {
  id: string;
  current: any;
  required: boolean;
  displayType?: string;
  type: "string" | "boolean" | "number" | "object";
  placeholder?: string;
  onPrompt: (message: string, severity: "success" | "error") => void;
  onChange: (key: string, value: any) => void;
}

const onlystring = (formdata: any): string => {
  return typeof formdata == "string" || typeof formdata == "number"
    ? formdata + ""
    : "";
};

const onlystringarray = (formdata: any): string[] => {
  return Array.isArray(formdata) ? formdata : [];
};

export function NeedTextArea(
  props: InputProps & {
    maxLength: number;
    minLength: number;
  }
) {
  const handleValueChange = useCallback(
    (value: string) => {
      props.onChange(props.id, value);
    },
    [props]
  );

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        ["link", "image"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ script: "sub" }, { script: "super" }],
      ],
    },
  };
  const noWords = onlystring(props.current).split(" ").length;
  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder={props.placeholder}
        className="w-full max-w-[100%] font-[muli]"
        onChange={handleValueChange}
        value={onlystring(props.current)}
      />
      {props.current &&
        (noWords < props.minLength || noWords > props.maxLength) && (
          <div className="m-2 text-right text-red-600">
            Description must be {props.minLength} to {props.maxLength} words.
          </div>
        )}
    </div>
  );
}

export function NeedFileInput(props: InputProps) {
  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      const files = (target?.files && target.files[0]) || null;
      if (files != null) {
        setFileUploadState((prev) => ({
          ...prev,
          fileName: files.name,
          isUploaded: false,
        }));
      }
    },
    []
  );

  const getFileNameFromUrl = (url: string[]) => {
    if (url.length > 0 && url[0]) {
      const comps = url[0].split("/");
      return comps[comps.length - 1];
    }
  };

  const [fileUploadState, setFileUploadState] = useState({
    fileName: props.current && getFileNameFromUrl(props.current),
    isUploaded: Boolean(props.current),
    isError: false,
    isLoading: false,
    error: "",
  });

  const { mutate } = useMutation(uploadNeedFiles, {
    onSuccess: (data: any) => {
      setFileUploadState((prev) => ({
        ...prev,
        isUploaded: true,
        isError: false,
        isLoading: false,
      }));
      props.onChange(props.id, [data.location]);
      props.onPrompt("Files uploaded successfully.", "success");
    },
    onError: (error) => {
      props.onPrompt(error + "", "error");
      setFileUploadState((prev) => ({
        ...prev,
        isUploaded: false,
        isError: true,
        isLoading: false,
        error: error + "",
      }));
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadSelectedFile() {
    setFileUploadState((prev) => ({
      ...prev,
      isUploaded: false,
      isLoading: true,
      isError: false,
    }));
    const payload = new FormData();

    const file = getFile();
    if (!file) {
      return;
    }

    payload.append("file", file);
    mutate(payload);
  }

  const getFile = () => {
    return (
      fileRef.current &&
      fileRef.current.files &&
      fileRef.current.files.length > 0 &&
      fileRef.current.files[0]
    );
  };

  return (
    <div className="flex flex-col items-center gap-y-5">
      <input
        className="hidden"
        type="file"
        ref={fileRef}
        onChange={handleValueChange}
      />
      {fileUploadState.fileName && (
        <p className="max-w-full text-sm">{fileUploadState.fileName}</p>
      )}
      {(fileUploadState.isUploaded || fileUploadState.isLoading) && (
        <div className="my-2 text-sm font-bold text-[#1B3763]">
          {!fileUploadState.isLoading && <div>Uploaded 1 out of 1</div>}
          <div className="my-2">
            {fileUploadState.isLoading ? "File uploading.." : "File uploaded"}
          </div>
        </div>
      )}
      {fileUploadState.isError && (
        <div className="text-sm font-bold text-red-600">
          Error : {fileUploadState.error}
        </div>
      )}
      <p className="text-qause-yellow">
        Note:- Image size should be less than 10MB
      </p>
      <div className="flex w-full flex-row items-center justify-around text-gray-600">
        <button
          className="flex cursor-pointer items-center gap-1 rounded-sm border border-gray-300 px-4 py-1 text-xs text-gray-500 focus:bg-qause-yellow-light focus:text-white"
          onClick={() => fileRef.current?.click()}
        >
          <PanToolAlt />
          Select File
        </button>
        {fileUploadState.fileName && !fileUploadState.isUploaded && (
          <button
            disabled={fileUploadState.isLoading}
            className="flex cursor-pointer items-center gap-1 rounded-sm border border-gray-300 px-4 py-1 text-xs text-gray-500 focus:bg-qause-yellow-light focus:text-white"
            onClick={uploadSelectedFile}
          >
            <FileUploadIcon />
            Start Uploading
          </button>
        )}
      </div>
      {fileUploadState.isUploaded && (
        <p className="my-4 text-qause-yellow">
          Note:- reuploading will overwrite the previous documents
        </p>
      )}
    </div>
  );
}

export function NeedTextInput(
  props: InputProps & {
    inputType: "text" | "number" | "object";
    maxLength: number;
    minLength: number;
  }
) {
  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.value?.length > props.maxLength) {
        return;
      }
      if (
        (props.displayType === "mobile" || props.inputType == "number") &&
        Boolean(e.currentTarget.value) &&
        !/^[1-9]\d{0,14}$/.test(e.currentTarget.value)
      )
        return;
      props.onChange(
        props.id,
        props.inputType == "number" && Number(e.currentTarget.value) > 0
          ? Number(e.currentTarget.value)
          : e.currentTarget.value
      );
    },
    [props]
  );
  return (
    <div className="w-full px-0 sm:px-8">
      <div className="flex w-full items-center">
        <input
          required={props.required}
          type="text"
          onChange={handleValueChange}
          className="block w-full rounded-lg  border border-gray-300 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 "
          placeholder={props.placeholder}
          value={onlystring(props.current)}
        />
        {props.displayType == "name" && (
          <span className={`px-4 text-[0.875rem] leading-none text-gray-400`}>
            {props.maxLength - (props.current?.length || 0)}/{props.maxLength}
          </span>
        )}
      </div>

      {props.current &&
        (props.current.length < props.minLength ||
          props.current.length > props.maxLength) && (
          <div className="m-2 text-right text-red-600">
            {props.displayType == "mobile"
              ? "Invalid phone number."
              : `Text must be ${props.minLength} to ${props.maxLength} characters.`}
          </div>
        )}
    </div>
  );
}

export function NeedRadioButtons(
  props: {
    options: string[];
  } & InputProps
) {
  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(
        props.id,
        props.type == "boolean"
          ? e.currentTarget.value === "true"
          : e.currentTarget.value
      );
    },
    [props]
  );

  const getBooleanVal = (index: number) => (index == 0 ? "true" : "false");

  const isChecked = (option: string, i: number) => {
    return (
      props.current == option ||
      (props.type == "boolean" && props.current + "" == getBooleanVal(i))
    );
  };

  return (
    <div className="flex items-center gap-1">
      {props.options.map((option, i) => (
        <div className="mx-6 cursor-pointer" key={option}>
          <input
            id={option}
            type="radio"
            name="radiobtns"
            value={props.type == "boolean" ? getBooleanVal(i) : option}
            className="peer hidden"
            onChange={handleValueChange}
            checked={isChecked(option, i)}
            required={props.required}
          />
          <label
            htmlFor={option}
            className=" h-14 rounded-md border border-gray-500 bg-white p-5 px-8 py-3 text-base font-extrabold text-gray-500 peer-checked:border-none peer-checked:bg-[#f4ad00] peer-checked:text-white "
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export function NeedCheckBox(
  props: {
    title: string;
    options: string[];
    isMulti: boolean;
  } & InputProps
) {
  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(
        props.id,
        props.type == "boolean"
          ? e.currentTarget.checked
          : e.currentTarget.value
      );
    },
    [props]
  );

  const options = props.options.length == 0 ? [props.title] : props.options;

  const isChecked = (option: string, i: number) => {
    if (props.current != null) {
      return (
        props.current == option || (props.type == "boolean" && props.current)
      );
    }
    return false;
  };

  return (
    <div className="flex items-center gap-1">
      {options.map((option, i) => (
        <div className="mx-6 flex cursor-pointer items-center" key={option}>
          <input
            id={option}
            type="checkbox"
            value={option}
            name="checkbox"
            className="h-6 w-6 rounded accent-blue-800"
            onChange={handleValueChange}
            checked={isChecked(option, i)}
            required={props.required}
          />
          <label
            htmlFor={option}
            className=" h-14 p-5 px-3 py-3 text-base text-gray-800"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

interface NeedDropdownProps extends InputProps {
  options: any[];
  multi?: boolean;
}

export function NeedDropdown(props: NeedDropdownProps) {
  const handleChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const {
        target: { value },
      } = event;
      props.onChange(props.id, value);
    },
    [props]
  );

  if (props.multi && props.type === "object") {
    return (
      <MultipleSelectChip
        key={props.id}
        current={props.current}
        onChange={handleChange}
        label={props.placeholder || "Choose"}
        options={props.options}
      />
    );
  } else {
    return (
      <>
        <FormControl>
          {!props.current && (
            <InputLabel shrink={false} id="select-label">
              {props.placeholder || "Choose"}
            </InputLabel>
          )}
          <Select
            notched={false}
            labelId="select-label"
            label={props.placeholder || "Choose"}
            id={props.id}
            value={props.current || ""}
            sx={{ minWidth: 240, textAlign: "left" }}
            onChange={handleChange}
          >
            {props.options.map((label: string) => (
              <MenuItem value={label} key={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
}

export function NeedDatePicker(props: InputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      props.onChange(props.id, new Date(e.currentTarget.value)),
    [props]
  );
  return (
    <input
      value={
        typeof props.current === "string"
          ? props.current?.split("T")[0]
          : props.current?.toISOString().split("T")[0]
      }
      className="mt-2 rounded border-2 border-slate-300 bg-white p-4"
      placeholder={props.placeholder}
      onChange={handleChange}
      type="date"
    ></input>
  );
}

export function NeedTimePicker(props: InputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      props.onChange(props.id, e.currentTarget.value),
    [props]
  );

  return (
    <input
      value={props.current}
      className="mt-2 rounded border-2 border-slate-300 bg-white p-4"
      placeholder={props.placeholder}
      onChange={handleChange}
      type="time"
    ></input>
  );
}

export function NeedLocationInput(props: InputProps) {
  const handleValueChange = useCallback(
    (location: string) => {
      props.onChange(props.id, [location]);
    },
    [props]
  );
  return (
    <div className="relative w-full">
      <PlacesAutocomplete
        value={props.current}
        onChange={handleValueChange}
        onSelect={handleValueChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <TextField
              {...getInputProps()}
              placeholder={props.placeholder || "Enter a location"}
              fullWidth
              size="small"
            />
            {suggestions.length > 0 && (
              <div className="border-grap-500 absolute top-[40px] z-50 w-[100%] border bg-white text-left">
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
}

export function NeedDaysPicker(props: InputProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const {
        target: { value },
      } = event;
      props.onChange(props.id, value.length == 0 ? null : value);
    },
    [props]
  );

  const selectRenderValue = useCallback(
    (selected: any) => (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value: string) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    ),
    []
  );

  return (
    <FormControl sx={{ m: 1, width: 300, textAlign: "left" }}>
      <InputLabel id="qause-multiple-chip-label">
        {props.placeholder || "Select days"}
      </InputLabel>
      <Select
        id="qause-multiple-chip"
        displayEmpty
        value={props.current || []}
        onChange={handleChange}
        input={
          <OutlinedInput
            id="qause-select-multiple-chip"
            label={props?.placeholder || "Select days"}
          />
        }
        multiple
        renderValue={selectRenderValue}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
      >
        {days.map((item: string) => (
          <MenuItem
            key={item}
            value={item}
            className={props.current?.includes(item) ? "!bg-qause-gray" : ""}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
