import type {
  MultipleVolunteeringType,
  SingleVolunteeringType,
} from "../../services/types/needs";
import Image from "next/image";
import { Share, ImportContacts, AccessTimeOutlined } from "@mui/icons-material";

const VolunteerGigCard = (props: {
  data: SingleVolunteeringType | MultipleVolunteeringType;
}) => {
  return (
    <div>
      <div className="relative mx-4 rounded-3xl border border-qause-yellow bg-white capitalize">
        <div className="flex items-center gap-2 p-4">
          <div className="relative h-10 w-10">
            <Image
              fill
              className="rounded-full border border-gray-500 "
              alt="ngo logo"
              style={{ objectFit: "contain" }}
              src={props.data.ngo.logo}
            />
          </div>
          <div className="text-sm font-bold">
            <div className=" font-extrabold text-qause-blue-gray">
              {props.data.ngo.name}
            </div>
            <div className="text-qause-blue">{props.data.ngo.state}</div>
          </div>
        </div>
        <div className="relative h-[160px]">
          <Image
            fill
            style={{
              objectFit: "contain",
            }}
            alt="qause need logo"
            src={props.data.logo}
            className="rounded-3xl p-6 pb-6 pt-4"
          />
        </div>
        <div className="p-6 capitalize">
          <div className="flex h-[44px] justify-between gap-4  text-base font-extrabold">
            <span>
              {props.data.questionValues.needTitle} For {props.data.ngo.name}
            </span>
            <Share />
          </div>

          <div className="my-4 mb-6 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-1 overflow-hidden text-base">
              <ImportContacts className="!text-qause-yellow" fontSize="small" />
              <span className="truncate">{props.data.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <AccessTimeOutlined
                className="!text-qause-yellow"
                fontSize="small"
              />
              <span>{props.data.createdAt.split("T")[0]}</span>
            </div>
          </div>
          <div className="text-center">
            <button className="mx-auto rounded bg-qause-blue px-7 py-2 text-sm font-bold text-white">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGigCard;
