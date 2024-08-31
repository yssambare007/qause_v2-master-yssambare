import React from "react";

type PackageCardProps = {
  heading: string;
  benefits: string[];
  btnText: string;
  description?: string;
  icon: JSX.Element;
};
const PackageCard = ({
  heading,
  benefits,
  btnText,
  description,
  icon,
}: PackageCardProps) => {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-around gap-4 rounded-[22px] bg-[#002DC914] p-6">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white">
          {icon}
        </div>
        <div className="text-2xl font-medium">{heading}</div>
        {description && <div className="font-normal">{description}</div>}
        <ul className="list-disc">
          {benefits.map((benefit, index) => {
            return (
              <li className="font-medium" key={index}>
                {benefit}
              </li>
            );
          })}
        </ul>
      </div>
      <button className="w-full rounded bg-[#002DC9] py-3 text-white transition-all duration-300 hover:opacity-70">
        {btnText}
      </button>
    </div>
  );
};

export default PackageCard;
