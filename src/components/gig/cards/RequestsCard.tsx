import Image from "next/image";
import React from "react";

const RequestsCard = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-7 rounded border border-gray-500 px-5 py-5">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-thin">Associate Volunteer</span>
        <span className="text-sm font-thin">1 out 50</span>
      </div>

      <div className="flex w-full items-center justify-start gap-4">
        <Image
          src="https://qauseuat.s3.ap-south-1.amazonaws.com/templates/E012/woman-verified.png"
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full border border-gray-900"
        />
      </div>
    </div>
  );
};

export default RequestsCard;
