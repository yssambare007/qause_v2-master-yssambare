import React from "react";

//Material UI Icons
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { monthNames } from "../../../utils/monthNames";
import type { CardType } from "../../../types/need/card";

interface CreatedOnCardProps {
  cardData: CardType;
}

const CreatedOnCard = ({ cardData }: CreatedOnCardProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded border border-gray-500 px-3 py-5">
      <span className="flex items-center gap-2">
        <CreateNewFolderIcon sx={{ color: "#f79e09" }} />
        <p className="text-xs font-thin">Created on</p>
      </span>

      <span className="text-sm font-semibold">{`${new Date(
        cardData?.data.createdAt || ""
      ).getDate()} ${
        monthNames[new Date(cardData?.data.createdAt || "").getMonth()]
      }, ${new Date(cardData?.data.createdAt || "")
        .getFullYear()
        .toString()
        .slice(-2)}`}</span>
    </div>
  );
};

export default CreatedOnCard;
