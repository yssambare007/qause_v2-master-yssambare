import Image from "next/image";
import React from "react";

export interface FooterPoint {
  text: string;
  icon?: string;
}

export interface CardProps {
  title: string;
  subTitle: string;
  footerTitle: string;
  footerPoints: FooterPoint[];
  cta: string;
  barColor?: string;
  backgroundColor?: string;
  btnColor?: string;
  btnTextColor?: string;
  listmarkerColor?: string;
  footerTitleIcon?: string;
  CornerIcon?: React.ElementType | null;
  cornerText?: string;
  CornerTextIcon?: React.ElementType | null;
  cornerIconColor: string;
  cornerIconBorderColor: string;
  ctaFn: () => null;
}

function Card(props: CardProps) {
  return (
    <div
      className="grid max-w-lg grid-cols-12 rounded-lg"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div
        className="col-span-1 w-3.5 rounded-l-lg"
        style={{ backgroundColor: props.barColor }}
      ></div>
      <div className="col-span-11 flex flex-col justify-between py-3 pe-3">
        <div className="mb-3 flex justify-between">
          <div>
            <h4 className="text-base font-extrabold">{props.title}</h4>
            <p className="text-xs">{props.subTitle}</p>
          </div>

          <div
            className="inline-block cursor-pointer rounded-full px-6 py-2 text-sm font-light drop-shadow-md"
            style={{
              backgroundColor: props.btnColor,
              color: props.btnTextColor,
            }}
          >
            View Detail
          </div>
        </div>

        <div>
          <div>
            <span className="text-sm font-bold">{props.footerTitle}</span>
            {!!props.footerTitleIcon && (
              <Image
                alt="blue tick"
                className="ms-2 inline-block"
                src={props.footerTitleIcon}
                width={11.17}
                height={11.17}
              />
            )}
          </div>
          <div className="flex">
            {props.footerPoints.map((point, index) => (
              <div
                key={index}
                className="me-7 flex items-center justify-center"
              >
                <div
                  className="me-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: props.listmarkerColor }}
                ></div>
                <p className="text-sm">{point.text}</p>
                {!!point.icon && (
                  <Image
                    src={point.icon}
                    alt="option icon"
                    width={34.66}
                    height={34.66}
                    className="ms-1"
                  />
                )}
              </div>
            ))}

            {!!props.CornerIcon && (
              <div className="ml-auto flex items-center">
                {!!props.cornerText && (
                  <span className="text-sm ">{props.cornerText}</span>
                )}
                {!!props.CornerTextIcon && (
                  <span className="me-2 ms-1">
                    <props.CornerTextIcon className="change-path-color" />
                  </span>
                )}
                <div
                  className="cursor-pointer rounded-full bg-[#ffffff] px-2 py-2 drop-shadow-md"
                  style={{
                    border: `1px solid ${props.cornerIconBorderColor}`,
                  }}
                >
                  <props.CornerIcon
                    className="change-message-path-color"
                    style={{ "--tooltip-pathcolor": props.cornerIconColor }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  title: "Absolute NGO",
  subTitle: "Haryana India",
  footerTitle: "Event",
  footerPoints: [
    { text: "Online", icon: "/images/profile/mapIcon.svg" },
    { text: "20-02-2023", icon: null },
  ],
  cta: "View details",
  backgroundColor: "#F0F2FC",
  barColor: "#CCD5F4",
  ctaFn: () => null,
  btnColor: "#253DC0",
  btnTextColor: "#FFFFFF",
  listmarkerColor: "#CED6FF",
  footerTitleIcon: null,
  CornerIcon: null,
  cornerText: "",
  CornerTextIcon: null,
  cornerIconColor: "#98DFDF",
  cornerIconBorderColor: "#98DFDF",
};

export default Card;
