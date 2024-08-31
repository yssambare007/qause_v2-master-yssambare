import React from "react";

import Image from "next/image";
import type { CardType } from "../../../types/need/card";

interface NgoDescCardProps {
  cardData: CardType;
}

const NgoDescCard = ({ cardData }: NgoDescCardProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-between rounded border border-gray-500 px-3 py-5">
      <div className="flex items-center gap-6 px-4 py-7">
        <Image
          className="rounded-full border border-gray-500"
          alt="ngo-logo"
          src={
            cardData?.data.ngo.logo ||
            "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
          }
          width={60}
          height={60}
        />

        <span className="text-base">{cardData?.data.ngo.name || ""}</span>
      </div>

      <button className="m-auto rounded border border-gray-300 bg-[#f2f2f2] px-4 py-1 text-sm text-[#f79e09]">
        View Profile
      </button>
    </div>
  );
};

export default NgoDescCard;
