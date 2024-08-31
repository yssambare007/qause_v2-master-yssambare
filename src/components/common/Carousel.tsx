import React, { useRef } from "react";
import Slider, { type Settings } from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  // urls: string[];
  children?: React.ReactNode;
  className?: string;
  background?: string;
  arrowVarient?: "v1" | "v2";
  hideDots?: boolean;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className={`absolute -right-4 flex h-fit w-fit items-center justify-center rounded-full ${
        props.varient === "v1" ? "border bg-white shadow-lg" : ""
      } p-2`}
      onClick={onClick}
    >
      <span className="sr-only">Next carousal</span>
      <ArrowForwardIosIcon
        className={`${props.varient === "v1" ? "!text-black" : "!text-white"}`}
      />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className={`absolute -left-4 flex h-fit w-fit items-center justify-center rounded-full ${
        props.varient === "v1" ? "border bg-white shadow-lg" : ""
      } p-2`}
      onClick={onClick}
    >
      <span className="sr-only">Previous carousal</span>
      <ArrowBackIosNewIcon
        className={`${props.varient === "v1" ? "!text-black" : "!text-white"}`}
      />
    </button>
  );
}

const Carousel = ({
  children,
  className,
  background,
  arrowVarient,
  hideDots,
}: Props) => {
  const slider = useRef<Slider>(null);
  const settings: Settings = {
    dots: !hideDots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow varient={arrowVarient || "v1"} />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider
      ref={slider}
      className={`relative !flex w-full items-center justify-center gap-4 ${
        background || "bg-gradient-to-r from-[#ececec] to-[#f5f5f5]"
      } px-4 ${className}`}
      {...settings}
    >
      {children}
    </Slider>
  );
};

export default Carousel;
