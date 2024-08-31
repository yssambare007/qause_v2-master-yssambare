import React from "react";

//Icons
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

//Mui Components
import { Pagination } from "@mui/material";

//Types
import type { GigSupporters } from "../../types/gig/fundraising";

//Utils
import { monthNames } from "../../utils/monthNames";

interface SupportersTabProps {
  data: GigSupporters;
}

const SupportersTab = ({ data }: SupportersTabProps) => {
  return (
    <div className="flex flex-col gap-8">
      {data?.success &&
        data.data.transitions.map((item, i) => (
          <div key={i}>
            <div className="flex w-full flex-col gap-1">
              {/* top info */}
              <div className="flex justify-between">
                <span className="text-xs">
                  <span className="text-xl font-bold">
                    <CurrencyRupeeIcon /> {item.amount}
                  </span>
                  raised out of
                </span>
                <span className="flex items-center text-xs">
                  <CurrencyRupeeIcon sx={{ fontSize: 16 }} /> 100000
                </span>
              </div>
              {/* horizontal bar */}
              <div className="h-1 w-full rounded-lg bg-gray-300" />
              {/* bottom info */}
              <div className="flex items-center justify-between">
                <span className="text-xs">
                  {data?.data.transitions.length} Supporters
                </span>
                <span className="text-sm font-semibold">26 days left</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PersonIcon sx={{ fontSize: 30, color: "orange" }} />
              <div className="flex flex-col">
                <span className="text-md">
                  {item.donorName} donated INR {item.amount}
                </span>
                <span className="text-md">{`${new Date(
                  item.createdAt
                ).getDate()} ${
                  monthNames[new Date(item.createdAt).getMonth()]
                }, ${new Date(item.createdAt)
                  .getFullYear()
                  .toString()
                  .slice(-2)}`}</span>
              </div>
            </div>
          </div>
        ))}

      <div className="flex items-center justify-center">
        <Pagination count={5} />
      </div>
    </div>
  );
};

export default SupportersTab;
