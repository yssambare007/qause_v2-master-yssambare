import { CircularProgress, Grid } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LiveCard from "../needCards/LiveCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function LiveCardCarousal(props: {
  isLoading: boolean;
  isSuccess: boolean;
  cards: any;
}) {
  if (props.isLoading || !props.cards) {
    return (
      <div className="flex min-h-full items-center justify-center p-9 md:col-span-2">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-14">
      <Slider
        arrows={true}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
        nextArrow={
          <div>
            <div
              style={{
                top: "-50%",
                left: -10,
                position: "relative",
              }}
            >
              <ArrowForwardIosIcon className="!h-10 !w-10 rounded-full border-2 border-solid border-gray-200 pl-2 pr-2 text-[#f79e09]" />
            </div>
          </div>
        }
        prevArrow={
          <div>
            <div
              style={{
                top: "-50%",
                left: -10,
                position: "relative",
              }}
            >
              <ArrowBackIosIcon className="!h-10 !w-10 rounded-full border-2 border-solid border-gray-200 pl-3 pr-1 text-[#f79e09]" />
            </div>
          </div>
        }
        dots={false}
        slidesToShow={3}
        slidesToScroll={3}
        infinite={false}
        speed={500}
      >
        {props.cards &&
          props.cards.liveCards?.length > 0 &&
          props.cards.liveCards.map((item: any) => {
            return (
              <div key={item} className="px-4 pb-9">
                <LiveCard value={item} type="live" />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
