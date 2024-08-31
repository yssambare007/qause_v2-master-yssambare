import type {
  NeedServiceQuestion,
  NeedServiceSubQuestion,
} from "../../../services/types/needs";
import {
  NeedCheckBox,
  NeedDropdown,
  NeedDatePicker,
  NeedFileInput,
  NeedRadioButtons,
  NeedTextArea,
  NeedTextInput,
  NeedTimePicker,
  NeedDaysPicker,
  NeedLocationInput,
} from "./NeedInputComponents";

function NeedInputWrapper(props: {
  isSubQuestion: boolean;
  formData: any;
  question: NeedServiceQuestion | NeedServiceSubQuestion;
  onPrompt: (message: string, severity: "success" | "error") => void;
  onChange: (key: string, value: any) => void;
}) {
  const commonProps = {
    required: props.question.isRequired,
    type: props.question.type,
    current: props.formData,
    id: props.question.key,
    onPrompt: props.onPrompt,
    onChange: props.onChange,
    displayType: props.question.displayType,
  };

  switch (props.question.inputType) {
    case "radio":
      return (
        <NeedRadioButtons {...commonProps} options={props.question.options} />
      );
    case "file":
      return <NeedFileInput {...commonProps} />;
    case "textarea":
      return (
        <NeedTextArea
          {...commonProps}
          placeholder="Type here"
          maxLength={props.question.maxLength || 500}
          minLength={props.question.minLength || 10}
        />
      );
    case "checkbox":
      return (
        <NeedCheckBox
          {...commonProps}
          isMulti={props.question.mutli}
          title={props.question.title}
          options={props.question.options}
        />
      );
    case "dropdown":
      const multi = props.question?.multi || props.question?.mutli; // since there are two different spellings in question and subQuestion
      return (
        <NeedDropdown
          {...commonProps}
          options={props.question.options}
          // placeholder="Select an option"
          multi={multi} // because of the typo
        />
      );
    case "datepicker":
      return <NeedDatePicker {...commonProps} />;
    case "timepicker":
      return <NeedTimePicker {...commonProps} />;
    case "dayspicker":
      return <NeedDaysPicker {...commonProps} />;
    case "location":
      return <NeedLocationInput {...commonProps} />;
    default:
      return (
        <NeedTextInput
          {...commonProps}
          placeholder="Type here"
          maxLength={props.question.displayType === "mobile" ? 10 : 25}
          minLength={props.question.displayType === "mobile" ? 10 : 1}
          inputType={
            props.question.type == "string" || props.question.type == "boolean"
              ? "text"
              : props.question.type
          }
        />
      );
  }
}

export default NeedInputWrapper;
