import { Height } from "@mui/icons-material";

interface EditablePaymentFormBadgeProps {
  title: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  image?: any;
  width?: string;
}
const EditablePaymentFormBadge = (props: EditablePaymentFormBadgeProps) => {
  return (
    <>
      <div>
        <div className="font-inter pl-8 pt-8 text-base font-normal leading-[84.48%] text-[#767D89]">
          {props.title}
        </div>
        <div className="ml-8 mr-0 flex flex-col">
          <input
            type="text"
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
            placeholder={props.text}
            className="font-inter mt-4 rounded-lg border-2 pl-2 text-base font-medium leading-[105.6%] text-black"
            style={{ width: props.width, height: "38.893px" }}
          />
          <div className="absolute ml-[535px] mt-6">{props.image}</div>
        </div>
      </div>
    </>
  );
};
export default EditablePaymentFormBadge;
