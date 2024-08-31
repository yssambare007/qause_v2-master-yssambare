import TickIcon from "./../../../public/images/profile/tick.svg";
import MasterCardLogo from "./../../../public/images/profile/masterCardLogo.svg";
import VisaCardLogo from "./../../../public/images/profile/visaCardLogo.svg";
import Cross from "./../../../public/images/profile/Cross.svg";
export interface ATMCardProps {
  title: string;
  type: CardType;
  lastFourDigit: string;
  isEditing: boolean;
}

export enum CardType {
  MASTER = "MASTER",
  VISA = "VISA",
}

function ATMCard(props: ATMCardProps) {
  return (
    <div
      className="rounded-md border-2 border-[#CCD5F4] bg-[#F0F2FC] px-4 py-2"
      style={{ maxWidth: "290px", minWidth: "250px" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <p className="font-extrabold">{props.title}</p>
          <div className="ms-2 rounded-full bg-[#CCD5F4] px-1 py-1">
            <>
              {!props.isEditing ? (
                <>
                  <TickIcon />
                </>
              ) : (
                <div className="border-[#CCD5F4] bg-[#F0F2FC]"></div>
              )}
            </>
          </div>
          <>
            {props.isEditing ? (
              <>
                <div className="relative">
                  <Cross />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </div>
        <div className="mb-10 mt-3 flex items-center">
          {getCardLogo(props.type)}
          <p className="ms-2">{props.lastFourDigit}</p>
        </div>
      </div>
    </div>
  );
}

const getCardLogo = (cardType: CardType) => {
  switch (cardType) {
    case CardType.MASTER:
      return <MasterCardLogo />;
    case CardType.VISA:
      return <VisaCardLogo />;
    default:
      return <MasterCardLogo />;
  }
};

export default ATMCard;
