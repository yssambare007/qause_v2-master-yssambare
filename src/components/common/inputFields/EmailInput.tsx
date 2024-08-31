import EmailIcon from "@mui/icons-material/Email";
interface Props {
  label?: string;
  value?: string;
  disabled?: boolean | false;
  onChange?: (e: any) => void;
  id?: string | "";
}
function EmailInput(props: Props) {
  return (
    <div className="mb-[0.5rem]">
      <div className="mb-2 text-[16px] font-medium">{props.label}</div>
      <div
        className={`flex items-center ${props.disabled ? "bg-gray-200" : ""}`}
      >
        <EmailIcon
          className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
          sx={{ fontSize: "2.5rem" }}
        />
        <input
          disabled={props.disabled}
          type="text"
          onChange={props.onChange}
          className="h-[30px] w-[100%] rounded-r-sm border-b border-r border-t border-gray-400 px-[1rem] py-[19px] font-[muli] text-[12px] text-[#636363] focus:outline-[#80bdff86]"
          placeholder="Email ID *"
          value={props.value ? props.value : ""}
          id={props.id}
        />
      </div>
      <div
        className="mt-1 hidden text-[14px] text-[#ff0000a3]"
        id="email_error"
      ></div>
    </div>
  );
}

export default EmailInput;
