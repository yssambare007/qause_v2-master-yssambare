import Image from "next/image";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import type { FulfilledCardType } from "../../services/types/needs";

const FulfilledCard = (props: { data: FulfilledCardType }) => {
  return (
    <div className="mx-5 rounded-lg border border-qause-yellow p-4 px-5 pb-6 pt-8">
      <div className="my-4 flex items-center text-sm font-bold text-qause-blue">
        <span className="mr-3">Task Status :</span>
        <span
          className={`${
            props.data.isCompleted ? "text-green-500" : "text-red-500"
          }`}
        >
          {props.data.isCompleted ? "Complete" : "Incomplete"}
        </span>
      </div>
      <div className="mx-auto w-full rounded-xl bg-[#F1F5FA] px-2 py-4 text-center">
        <Image
          className="mx-auto"
          height={90}
          width={160}
          src={props.data.logo}
          alt="needImage"
        />
      </div>
      <div className="my-4 flex items-center text-sm font-bold text-qause-blue">
        <div className="mr-2">
          {props.data.type == "singleVolunteering" && (
            <PersonIcon
              sx={{ fontSize: "1.4rem", color: "#0020D1", mr: "5px" }}
            />
          )}
          {props.data.type == "multipleVolunteering" && (
            <GroupsIcon
              sx={{ fontSize: "1.4rem", color: "#0020D1", mr: "5px" }}
            />
          )}
          {props.data.type == "fundraising" && (
            <VolunteerActivismIcon
              sx={{ fontSize: "1.4rem", color: "#0020D1", mr: "5px" }}
            />
          )}
        </div>
        <div>{props.data.title}</div>
      </div>
      <div className="text-xs font-bold text-qause-blue-dark">
        <div className="mb-4">
          <span className="mr-3">Volunteer</span>
          <span>
            {props.data.requests} of {props.data.numberOfVolunteer}
          </span>
        </div>
        <div className="mb-4">
          <span className="mr-3">Closed On</span>
          <span>{props.data.completedDate.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default FulfilledCard;
