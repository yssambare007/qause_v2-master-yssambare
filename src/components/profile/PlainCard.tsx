import { useMutation } from "react-query";
import { updatePlanStatus } from "../../utils/apis/details/Index";
import TickIcon from "./../../../public/images/profile/tick.svg";

interface PlainCardProps {
  backgroundColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  textColor?: string;
  borderColor?: string;
  title?: string;
  subTitle?: string | number;
  sideText?: string | number;
  buttonText?: string;
}

function PlainCard(props: PlainCardProps) {
  const {
    mutate,
    status: updatePlanStatusKey,
    isLoading,
  } = useMutation(updatePlanStatus, {
    onSuccess: () => {
      alert("Successfully changed the plan status.");
    },
    onError: (error) => {
      alert(error);
    },
  });
  return (
    <div
      className="rounded-lg border-2 px-4 py-2"
      style={{
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        color: props.textColor,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="font-extrabold">{props.title?.toUpperCase()}</p>
          <div className="ms-2 rounded-full bg-[#CCD5F4] px-1 py-1">
            <TickIcon />
          </div>
        </div>
        <p className="cursor-pointer">{props.sideText}</p>
      </div>
      <p className="text-xs">{props.subTitle}</p>
      <div
        onClick={() => mutate()}
        className="mt-3 inline-block cursor-pointer rounded-full px-4 pb-2 pt-1 text-sm font-light"
        style={{
          backgroundColor: props.buttonColor,
          color: props.buttonTextColor,
        }}
      >
        {props.buttonText}
      </div>
    </div>
  );
}

PlainCard.defaultProps = {
  backgroundColor: "#F0F2FC",
  buttonColor: "#253DC0",
  buttonTextColor: "#ffffff",
  textColor: "ffffff",
  borderColo: "#CCD5F4",
  title: "Free Plan",
  subTitle: "36 days remaining",
  sideText: "view Detail",
  buttonText: "Upgrade Plan",
};

export default PlainCard;
