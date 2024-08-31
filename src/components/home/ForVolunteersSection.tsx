import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Image from "next/image";
import Carousel from "../common/Carousel";
import { Star, Grass } from "./Decorations";
import HomeSectionFrame from "./HomeSectionFrame";

const options = [
  "Designer",
  "Developer",
  "Influencer",
  "Content Writer",
  "Lawyer",
];

function JoinCommunityCard() {
  return (
    <>
      <div className="w-full p-8 xl:px-16">
        <div className="grid grid-cols-1 gap-5 rounded-3xl bg-[#3E414E] md:grid-cols-2">
          <div className="flex h-full flex-col items-start justify-center px-10 py-5 font-extrabold text-white md:text-3xl">
            <div>
              Join Qause community portal and engage with{" "}
              <span className="text-[#FFB115]">Potential Donors</span>,{" "}
              <span className="text-[#FFB115]">Partners</span>
              and <span className="text-[#FFB115]">Volunteers</span>.
            </div>
            <button className="mt-12 rounded-lg bg-white px-12 py-4 text-base text-[#172B4D]">
              Join now
            </button>
          </div>

          <Image
            src="/images/Group 226978.png"
            alt="demo_img"
            width={3000}
            height={200}
          />
        </div>
      </div>
    </>
  );
}

export default function ForVolunteersSection() {
  return (
    <HomeSectionFrame
      qauseFor="Volunteers"
      forBackground="bg-white"
      forForeground="text-[#98dfdf]"
      background="bg-[#bbeaea]"
      subSection={<JoinCommunityCard />}
    >
      <>
        <svg
          className="absolute -top-16 right-20 hidden md:block"
          width="103"
          height="115"
          viewBox="0 0 103 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="23.6519" height="115" rx="11.8259" fill="#CCD5F4" />
          <rect
            x="39.6738"
            width="23.6519"
            height="115"
            rx="11.8259"
            fill="#CCD5F4"
          />
          <rect
            x="79.3477"
            width="23.6519"
            height="115"
            rx="11.8259"
            fill="#CCD5F4"
          />
        </svg>

        <div className="mt-3 flex flex-col items-center justify-center gap-16 pb-16 md:mt-10">
          {/* heading and subheading */}
          <div className="flex flex-col items-center justify-center gap-6 text-[#172B4D] md:w-[600px]">
            <h3 className="text-center text-xl font-extrabold md:text-3xl">
              Do the work you love. Volunteer for good causes.
            </h3>

            <span className="text-center md:text-lg">
              Find{" "}
              <span className="font-extrabold">Volunteering opportunities</span>{" "}
              that match your skills across the world. Your expertise is what
              nonprofits needs the most!
            </span>
          </div>

          {/* options */}
          <div className="flex max-w-full gap-5 overflow-x-auto py-4 md:gap-10">
            {options.map((option) => (
              <div className="relative z-0 min-w-fit" key={option}>
                {option === "Influencer" && (
                  <Grass
                    className={`-right-8 -top-10 z-10 h-12 w-12 fill-white`}
                  />
                )}
                <button
                  className={`min-w-fit rounded-full border border-white px-4 py-2 font-['GeneralSans'] font-semibold ${
                    option === "Influencer" ? "bg-white" : "bg-[#98DFDF]"
                  }`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>

          {/* cards  */}
          <div className="flex w-full flex-col items-center justify-center gap-10 md:px-5">
            <h3 className="font-['GeneralSans'] text-xl font-black md:text-4xl">
              Explore Opportunities
            </h3>

            <div className="relative">
              <Star className="absolute -left-[2rem] -top-[3.7rem] scale-50 fill-white md:scale-100" />
              <div className="flex w-full max-w-full flex-col justify-center gap-4 py-1 md:flex-row">
                {/* individual card */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col rounded-3xl bg-[#eaf9f9]"
                  >
                    {/* card header */}
                    <div className="rounded-t-3xl bg-white px-4 pb-4 pt-8">
                      <h6 className="w-10/12 font-['GeneralSans'] text-xl font-black text-[#172B4D]">
                        Transparent Hands Foundation
                      </h6>
                      <span className="text-sm text-[#4E4E4E]">
                        California, Floria
                      </span>
                    </div>

                    {/* card body */}
                    <div className="flex flex-col gap-5 px-4 pb-6 pt-3 md:gap-8 md:py-6">
                      <div className="flex flex-col gap-4">
                        <span className="text-sm">Required Skills</span>
                        <div className="flex flex-wrap gap-1">
                          {["Designer", "Developer", "Influencer"].map(
                            (skill) => (
                              <button
                                key={skill}
                                className="min-w-fit rounded-full border border-gray-300 px-4 py-2 text-xs text-gray-500"
                              >
                                {skill}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2">
                        <span className="min-w-fit text-[12px] font-bold text-[##4E4E4E]">
                          Type of Volunteer
                        </span>
                        <span className="min-w-fit text-[12px] font-bold text-[##4E4E4E]">
                          Resource needed
                        </span>
                        <div className="flex items-center gap-x-1 text-xs">
                          <LocalAtmIcon
                            sx={{ color: "#00ff00", width: "14px" }}
                          />{" "}
                          <span className="text-xs">Paid</span>
                        </div>
                        <span className="text-xs text-[#737373]">
                          8 peoples
                        </span>
                      </div>

                      <button className="rounded-md bg-white py-3 text-[#057878]">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button className="w-fit rounded-lg bg-white px-16 py-4 text-[#014D95]">
                View All Opportunities
              </button>
            </div>
          </div>

          {/* carousal */}
          <div className="relative flex w-full flex-col items-center justify-center gap-10">
            <h2 className="text-center font-extrabold text-[#172B4D] md:w-96 md:text-3xl">
              What other Volunteers are saying
            </h2>
            <Carousel
              className="relative !px-16"
              hideDots={true}
              arrowVarient="v2"
              background="bg-transparent"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="pt-16">
                  <div className="z-0 !flex h-[316px] flex-col items-center justify-center gap-10 rounded-3xl bg-white py-5 md:flex-row md:rounded-[50px] md:px-16 ">
                    <div className="relative bottom-5 h-[352px] w-[361px] object-contain">
                      <Image
                        className=""
                        fill
                        src="/images/Group 226980.png"
                        alt="carousel"
                      />
                    </div>

                    <div className="!flex !flex-1 flex-col items-center justify-center gap-6">
                      <span className="flex flex-row items-end gap-5 font-[GeneralSans-Bold] text-xl">
                        <Image
                          className="w-10 md:w-24"
                          width={100}
                          height={100}
                          src="/images/Group 39961.png"
                          alt="img"
                        />
                        Ankita Arora
                      </span>

                      <p className="text-center">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                      </p>

                      <Image
                        src="/images/Ankita arora.png"
                        alt="img"
                        width={179}
                        height={22}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            <svg
              className="absolute -bottom-6 right-4 hidden md:block"
              width="128"
              height="128"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.55087 42.9914C25.0069 51.0246 59.2833 74.3246 41.2729 126.967C48.2 106.72 75.2699 68.2385 126.969 85.9442C75.2699 68.2385 76.4902 20.9039 83.4173 0.656697C65.4069 53.2995 25.0069 51.0246 1.55087 42.9914Z"
                fill="white"
                stroke="#4AC6C6"
                stroke-width="3.82337"
              />
            </svg>
          </div>
        </div>
      </>
    </HomeSectionFrame>
  );
}
