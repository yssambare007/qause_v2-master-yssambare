import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { capitalizeEachFirstLetter } from "../../../utils/utils";
interface Props {
  type?: string;
  value?: string;
  disabled?: boolean | false;
  onChange?: (e: any) => void;
  id?: string | "";
}
function SocialMediaInput(props: Props) {
  return (
    <div className="mb-[0.5rem]">
      <div className=" flex items-center">
        {props.type === "youtube" && (
          <YouTubeIcon
            className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
            sx={{ fontSize: "2.5rem" }}
          />
        )}
        {props.type === "instagram" && (
          <InstagramIcon
            className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
            sx={{ fontSize: "2.5rem" }}
          />
        )}
        {props.type === "facebook" && (
          <FacebookIcon
            className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
            sx={{ fontSize: "2.5rem" }}
          />
        )}

        <input
          type="text"
          disabled={props.disabled}
          className={`h-[30px] w-[100%] rounded-r-sm border-b border-r border-t border-gray-400 px-[1rem] py-[19px] font-[muli] text-[12px] text-[#636363] focus:outline-[#80bdff86]${
            props.disabled ? " bg-gray-200" : ""
          }`}
          placeholder={`${capitalizeEachFirstLetter(props.type || "")} Link`}
          value={props.value ? props.value : ""}
          onChange={props.onChange}
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

export default SocialMediaInput;
