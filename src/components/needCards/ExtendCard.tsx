import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import type { ExtendCardType } from "../../services/types/needs";

const ExtendCard = (props: {
  data: ExtendCardType;
  onExtendCard: (currentGigId: string) => void;
  onQauseDoIt: (currentGigId: string) => void;
}) => {
  const handleExtendCard = () => {
    props.onExtendCard(props.data._id);
  };

  const handleQauseDoIt = () => {
    props.onQauseDoIt(props.data._id);
  };

  return (
    <div className="mx-5 rounded-xl border border-qause-yellow px-6 py-7 text-center">
      <div className="mb-3 flex items-center justify-center">
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
        <div className="cursor-pointer text-sm font-semibold text-qause-blue">
          {props.data.title.length > 15
            ? props.data.title.slice(0, 15) + "..."
            : props.data.title}
        </div>
      </div>
      <button
        onClick={handleExtendCard}
        className="mx-auto my-3 rounded-2xl bg-qause-blue px-5 py-2 text-sm font-bold text-white"
      >
        Extend my Card
      </button>
      <div className="my-2 h-0 w-full overflow-visible border-t border-gray-200" />
      <div className="text-xs font-bold leading-4 text-qause-blue-dark">
        Get on a call with us & get it all done by Qause Experts
      </div>
      <button
        disabled={props.data.qauseDisable}
        onClick={handleQauseDoIt}
        className="mx-auto my-3 rounded-2xl bg-qause-yellow px-5 py-2 text-sm font-bold text-white disabled:bg-yellow-700"
      >
        Let Qause do it
      </button>
    </div>
  );
};

export default ExtendCard;
