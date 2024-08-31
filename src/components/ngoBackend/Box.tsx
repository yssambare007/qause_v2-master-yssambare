import Image from "next/image";
import React from "react";

const Box = ({
  bgColor,
  textColor,
  image1,
  image2,
  logoBackground,
  heading,
  items,
  padding,
  leftIconWidth,
}: any) => {
  return (
    <div
      className={`relative z-10 h-auto overflow-hidden rounded-xl border-[1px] border-solid px-[20px] py-[10px] xs:mb-[20px] xs:w-[88vw] sm:w-[33%] ${
        padding && "mx-[28px]"
      }`}
      style={{ borderColor: textColor, backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={`/images/${image1}`}
            className={`bg-[${textColor}] rounded-full ${
              leftIconWidth ? "h-[15.77px] w-[15.77px]" : "h-[14px] w-[14px]"
            }  mr-[8px] mt-[5px]`}
            width="14"
            height="14"
            alt="orange icon"
          />
          <p
            className={`font-[muli] text-[16px] font-semibold`}
            style={{ color: textColor }}
          >
            {heading}
          </p>
        </div>

        <Image
          src={`/images/${image2}`}
          className={` z-10 h-[46px] w-[46px] rounded-full`}
          width="46"
          height="46"
          alt="orange loader"
        />

        <Image
          src="/images/curve.png"
          className="absolute left-[32.12%] right-[51.31%] top-[61px] z-0"
          width="265"
          height="198"
          alt="curve"
        />
      </div>

      {items && items.length !== 0 ? (
        <div className="mx-[25px]">
          <ul className="list-disc">
            {items.map((item: string, index: number) => (
              <li className="text-[16px]" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Box;
