import { Avatar } from "@mui/material";

interface Props {
  card: any;
}

export default function NeedPreviewCard(props: Props) {
  const { card } = props;
  return (
    <>
      <div className="min-w-[15rem] rounded-xl border p-2 text-sm text-qause-blue-dark">
        <div className="flex justify-end pb-1">View Live</div>
        <div className="flex flex-col items-center rounded-xl border bg-[#F8F8F8] p-2">
          <div className="flex w-full justify-start gap-x-2 py-1">
            <Avatar
              alt="No Logo"
              src="https://qauseuat.s3.ap-south-1.amazonaws.com/static/no-logo.png"
            />
            <div className="flex h-full flex-col justify-around">
              <div className="text-sm font-semibold">qause eleven</div>
              <div className="text-[9px]">chhattisgarh, india</div>
            </div>
          </div>
          <div className="mb-3 flex w-full justify-center rounded-lg bg-[#E6E2E2] p-4">
            <img
              src={card.logo}
              className="h-[60px] w-[120px] rounded-md object-contain"
              alt="logo"
            />
          </div>
          <div className="w-full text-left text-xs font-semibold">
            {card.title}
          </div>
        </div>
        {card.status && (
          <div className="my-1 flex justify-start gap-x-1">
            <span>Status:</span>
            <span style={{ color: card.status.color }}>
              {card.status.label}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
