import { AccessTimeFilled, Share } from "@mui/icons-material";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import type { FundraisingType } from "../../services/types/needs";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "green" : "#308fe8",
  },
}));

const VolunteerFundraisingCard = (props: { data: FundraisingType }) => {
  return (
    <div>
      <div className="relative mx-4 rounded-3xl border border-qause-yellow bg-white capitalize">
        <span className="absolute  right-[55px]  top-0 z-10 flex items-center gap-1 bg-qause-blue px-3 py-1.5 text-xs font-bold text-white">
          <AccessTimeFilled
            sx={{
              fontSize: "1rem",
            }}
            htmlColor="#FFFFFF"
          />
          {31 - moment().diff(props.data.createdAt.split("T")[0], "days")} days
          left
        </span>
        <div className="relative h-[160px]">
          <Image
            fill
            style={{
              objectFit: "contain",
            }}
            alt="qause need logo"
            src={props.data.logo}
            className="p-6"
          />
        </div>
        <div className="p-6">
          <div className="flex h-[44px] justify-between text-base font-semibold">
            <span>
              {props.data.questionValues.needTitle} For {props.data.ngo.name}
            </span>
            <Share />
          </div>
          <div className="flex items-center gap-2 ">
            <div className="relative h-10 w-10">
              <Image
                fill
                alt="ngo logo"
                className="rounded-full border border-gray-500 "
                style={{ objectFit: "contain" }}
                src={props.data.ngo.logo}
              />
            </div>
            <div className="text-sm font-bold">
              <div className="font-extrabold text-qause-blue-gray">
                {props.data.ngo.name}
              </div>
              <div className="text-qause-blue">{props.data.ngo.state}</div>
            </div>
          </div>
          <div className="my-3">
            <div className="mb-2 text-base">
              <span className="text-lg font-extrabold leading-6">
                ₹{props.data.donates / 100}
              </span>{" "}
              raised out of ₹{props.data.questionValues.amount / 100}
            </div>
            <BorderLinearProgress
              variant="determinate"
              value={
                (props.data.donates / props.data.questionValues.amount) * 100
              }
            />
            <div className="mb-8 mt-2 text-center">
              <div className="text-base">
                {props.data.supporters} Supporters
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="mx-auto rounded bg-qause-blue px-7 py-2 text-sm font-bold text-white">
              Donate now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerFundraisingCard;
