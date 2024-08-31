import { FilterOutlined } from "@ant-design/icons";
import { Close } from "@mui/icons-material";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/layouts/defaultPages/Index";
import type {
  FundraisingType,
  MultipleVolunteeringType,
  SingleVolunteeringType,
} from "../../services/types/needs";
import type { Category } from "../../types/volunteers";
import {
  getCategories,
  getVolunteerGigsByCategory,
} from "../../utils/apis/volunteers/Index";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import VolunteerFundraisingCard from "../../components/volunteerGigCards/VolunteerFundraisingCard";
import VolunteerGigCard from "../../components/volunteerGigCards/VolunteerGigCard";
import { CircularProgress } from "@mui/material";

const Index = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const { data: categories, status: categoryStatus } = useQuery<Category[]>(
    "categories",
    getCategories
  );

  const { data: gigs, status: gigStatus } = useQuery<{
    singleVolunteering: SingleVolunteeringType[];
    multipleVolunteering: MultipleVolunteeringType[];
    fundraising: FundraisingType[];
  }>(["volunteerGigs", filters], getVolunteerGigsByCategory);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setFilters((prev) => [...prev, e.target.value]);
      } else {
        setFilters((prev) =>
          prev.filter((filter) => filter !== e.target.value)
        );
      }
    },
    []
  );

  const handleResetFilter = useCallback(() => {
    setFilters([]);
  }, []);

  const sliderOptions = {
    arrows: true,
    responsive: [
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
    ],
    nextArrow: (
      <div>
        <div
          style={{
            top: "-50%",
            transform: "translate(0, -50%)",
            position: "relative",
          }}
        >
          <ArrowForwardIosIcon className="!h-10 !w-10 rounded-full border-2 border-solid border-qause-yellow pl-2 pr-2 text-qause-yellow" />
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div
          style={{
            top: "-50%",
            left: -10,
            transform: "translate(0, -50%)",
            position: "relative",
          }}
        >
          <ArrowBackIosIcon className="!h-10 !w-10 rounded-full border-2 border-solid border-qause-yellow pl-3 pr-1 text-qause-yellow" />
        </div>
      </div>
    ),
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    speed: 500,
  };

  return (
    <Layout>
      <div className="mb-60">
        <div className="my-5 text-center">
          <div className="mb-6 text-3xl sm:text-5xl font-semibold">Volunteer Online</div>
          <div className="flex flex-wrap px-12  items-center justify-center">
            {categoryStatus == "success" &&
              categories &&
              categories.map((option) => {
                return (
                  <div className="mx-1 my-4 cursor-pointer" key={option._id}>
                    <input
                      id={option._id}
                      type="checkbox"
                      name="radiobtns"
                      value={option.title}
                      className="peer hidden"
                      onChange={handleFilterChange}
                      checked={filters.includes(option.title)}
                    />
                    <label
                      htmlFor={option._id}
                      className="rounded bg-[#A5A5A5] px-4 py-2 text-sm text-black hover:bg-[#929292] hover:text-white peer-checked:bg-qause-blue peer-checked:text-white"
                    >
                      {option.title}
                    </label>
                  </div>
                );
              })}
            <button className="ml-2 flex-gr flex items-center gap-1 rounded bg-qause-yellow px-4 py-2 text-sm">
              <FilterOutlined className="text-2xl leading-8" />
              <div>filter</div>
            </button>
          </div>
        </div>
        <div className="m-auto flex max-w-[1140px] items-center justify-between px-3">
          <div className="flex items-center gap-2 px-2 md:px-16  md: py-3">
            <Link className="text-sm font-bold text-qause-yellow" href="#">
              Home
            </Link>
            <div className="font-medium text-gray-500">&gt;</div>
            <div className="text-sm font-bold text-gray-600">Volunteer</div>
          </div>
          {filters.length > 0 && (
            <button
              onClick={handleResetFilter}
              className="flex items-center gap-1 bg-qause-blue py-2 px-4 md:text-sm text-xs text-white "
            >
              <Close htmlColor="#FFFFFF" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="bg-[#f8f8f8] py-12">
          <div className="m-auto max-w-[1140px] px-3">
            <div className="ml-16 mb-8 text-2xl font-bold text-qause-blue">
              Fundraising
            </div>
            {gigStatus == "loading" ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <div className="py-3 ml-12">
                {gigs && gigs.fundraising && gigs?.fundraising.length > 0 ? (
                  <Slider {...sliderOptions}>
                    {gigs.fundraising.map((card) => (
                      <VolunteerFundraisingCard key={card._id} data={card} />
                    ))}
                  </Slider>
                ) : (
                  <div className="my-3 flex w-full justify-center">
                    no Gigs Found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#f8f8f8] py-12">
          <div className="m-auto max-w-[1140px] p-3">
            <div className="ml-16 mb-8 text-2xl font-bold text-qause-blue">
              Group Volunteers
            </div>

            {gigStatus == "loading" ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <div className="py-3 ml-12">
                {gigs &&
                  gigs.multipleVolunteering &&
                  gigs?.multipleVolunteering.length > 0 ? (
                  <Slider {...sliderOptions}>
                    {gigs.multipleVolunteering.map((card) => (
                      <VolunteerGigCard key={card._id} data={card} />
                    ))}
                  </Slider>
                ) : (
                  <div className="my-3 flex w-full justify-center">
                    no Gigs Found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#f8f8f8] py-12">
          <div className="m-auto max-w-[1140px] p-3">
            <div className="ml-16 mb-8 text-2xl font-bold text-qause-blue">
              Individual Volunteer
            </div>
            {gigStatus == "loading" ? (
              <div className="flex justify-center py-8">
                <CircularProgress />
              </div>
            ) : (
              <div className="py-3 ml-12">
                {gigs &&
                  gigs.singleVolunteering &&
                  gigs?.singleVolunteering.length > 0 ? (
                  <Slider {...sliderOptions}>
                    {gigs.singleVolunteering.map((card) => (
                      <VolunteerGigCard key={card._id} data={card} />
                    ))}
                  </Slider>
                ) : (
                  <div className="my-3 flex w-full justify-center">
                    no Gigs Found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
