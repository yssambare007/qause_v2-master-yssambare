import React from "react";

//Material UI Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import type { CardType } from "../../../types/need/card";

interface DescriptionCardProps {
  cardData: CardType;
}

const DescriptionCard = ({ cardData }: DescriptionCardProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-5 rounded border border-gray-500 px-3 py-5">
      <div className="flex flex-col items-center justify-center">
        <LocationOnIcon sx={{ fontSize: "3rem", color: "#f79e09" }} />
        <p className="text-lg font-semibold text-gray-400">Chhattisgarh</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <AccessTimeIcon sx={{ fontSize: "3rem", color: "#f79e09" }} />
        <p className="text-lg font-semibold text-gray-400">8 Hours</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <SchoolIcon sx={{ fontSize: "3rem", color: "#f79e09" }} />
        <p className="text-lg font-semibold text-gray-400">
          {cardData?.data.questionsFormat.category || ""}
        </p>
      </div>
    </div>
  );
};

export default DescriptionCard;
