import { CircularProgress } from "@mui/material";
import NeedsDashboardSteps from "./NeedsDashboardSteps";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NeedsDashboardStatusNavPanel from "./NeedsDashboardStatusNavPanel";
import Link from "next/link";
import type { NeedServiceDataMini } from "../../../services/types/needs";
import { END_POINTS } from "../../../constants/endpoints";
import { useQuery } from "react-query";
import { getNeeds } from "../../../utils/apis/needs/Index";
import NeedsNavbar from "../NeedsNavbar";
import NeedsCard from "../NeedCard";
import type { ProfileDetails } from "../../../types/profile/details";
import { getProfileDetails } from "../../../utils/apis/details/Index";

function NeedsDashboard() {
  const { status, data } = useQuery<NeedServiceDataMini[], Error>(
    "needs",
    getNeeds,
    { staleTime: Infinity }
  );

  const { data: profileData } = useQuery<ProfileDetails>(
    "details",
    getProfileDetails,
    { staleTime: Infinity }
  );

  return (
    <div className="h-screen w-[100%]">
      {/* head */}
      <NeedsNavbar
        availableCredits={profileData?.data.creditLeft || 0}
        currentPage="Need"
      />
      {/* Steps */}
      <NeedsDashboardSteps />

      {/* dashboard wrapper */}
      <div className="mx-4 my-6 grid grid-cols-1 border-b border-gray-300  pb-6 sm:mx-16 md:my-12 md:grid-cols-3 md:pb-[100px]">
        <NeedDashboardHero />
        <NeedsCardCarousal
          isSuccess={status == "success"}
          isLoading={status == "loading"}
          cards={data}
        />
      </div>

      <NeedsDashboardStatusNavPanel />
    </div>
  );
}

function NeedDashboardHero() {
  return (
    <div className="text-center md:text-left">
      <div className="text-xl font-semibold text-[#F79E09] md:text-4xl md:font-bold">
        Find <br />
        Skilled Volunteers
      </div>
      <div className="text-lg font-semibold text-[#1B3763] md:text-3xl md:font-bold">
        Based on Your Needs
      </div>
      <div className="mb-6 mt-6 text-sm font-normal  text-gray-500 md:mb-12 md:text-base">
        Select your needs and we’ll connect you with people who are passionate
        about using their skills for a good cause.
      </div>
      <Link
        href={END_POINTS.NEEDS}
        className="rounded bg-[#0020D1] px-6 py-3 font-bold text-white"
      >
        Yes, I Need Volunteer
      </Link>
    </div>
  );
}

function NeedsCardCarousal(props: {
  isLoading: boolean;
  isSuccess: boolean;
  cards: NeedServiceDataMini[] | undefined;
}) {
  if (props.isLoading || !props.cards) {
    return (
      <div className="flex min-h-full items-center justify-center p-9 md:col-span-2">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="p-9 md:col-span-2">
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
        {props.cards.map((card, i) => (
          <NeedsCard key={card._id} data={card} varient="v2" />
        ))}
      </Slider>
    </div>
  );
}

export default NeedsDashboard;
