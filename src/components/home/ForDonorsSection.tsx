import { DonorSupportorIcon } from "./assets/DonorSupporterIcon";
import HomeSectionFrame from "./HomeSectionFrame";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Star } from "./Decorations";
import RegisterBannerSection from "./RegisterBannerSection";
import { DraggableHorizontalScrolling } from "./HorizontalScrolling";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#FFB115",
  },
}));

function DonationCard() {
  return (
    <div className="flex flex-col rounded-[10px] bg-white xs:min-w-full sm:min-w-full md:min-w-[500px]">
      <img
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        className="h-[218px] w-full rounded-t-[10px] object-cover
        "
      />
      <div className="flex flex-col gap-y-4 p-4">
        <div className="text-left text-[20px] font-[600] text-qause-blue-dark">
          Need For Disabled Students
        </div>
        {/* Channel logo, name, subscribers and subscribe button */}
        <div className="flex w-full flex-row items-center justify-between xs:flex-wrap xs:gap-y-4 sm:flex-wrap">
          <div className="flex flex-row items-center gap-x-2 py-2">
            <img
              src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              className="h-[44px] w-[44px] rounded-[50%]"
            />
            <div className="flex flex-col justify-evenly">
              <div className="text-left text-[14px] font-[400] text-[#172B4D]">
                Shri Adwait Pariwar Foundation
              </div>
              <div className="text-left text-[14px] font-[400] text-[#626F86]">
                Differently Abled, India
              </div>
            </div>
          </div>
          <div className="flex h-fit flex-row items-center justify-center gap-x-2 rounded-[10px] bg-[#CFEEF2] p-1.5">
            <DonorSupportorIcon />
            <div className="text-[16px] font-[400] not-italic text-[#172B4D]">
              2 Supporters
            </div>
          </div>
        </div>

        {/* Start of the sond, end of the song and the progressbar */}
        <div className="flex w-full flex-row justify-between">
          <div className="text-left text-[20px] font-[600] not-italic text-[#172B4D]">
            ₹4.5 Lacs
          </div>
          <div className="text-left text-[20px] font-[400] not-italic text-[#172B4D]">
            ₹56 Lacs
          </div>
        </div>

        <div className="w-full">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>

        <div className="w-full py-4">
          <button className="w-full rounded-lg bg-[#3E414E] px-6 py-5 text-white">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ForDonorsSection() {
  return (
    <HomeSectionFrame
      qauseFor="Donors"
      forBackground="bg-[#ffb115]"
      forForeground="text-black"
      background="bg-[#edf2f3]"
      grassFillColor="fill-[#ffb115]"
      subSection={<RegisterBannerSection />}
    >
      <>
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col gap-y-10">
            <div className="justify-between rounded-tl-[10px] rounded-tr-[10px] bg-[#FEE2AB]">
              <div className="flex flex-row items-center justify-between xs:flex-col-reverse">
                <div className="flex h-[419px] flex-col justify-center gap-y-8 xs:p-4 md:p-8">
                  <div className="text-left font-sans text-[20px] font-[400] not-italic text-gray-800 xs:text-center">
                    Donate Today !
                  </div>
                  <div className="text-left font-[GeneralSans-Bold] text-[40px] font-[600] leading-[3rem] text-gray-800 xs:text-center">
                    Wake up the philanthropist in <br /> you. They need you now
                    !
                  </div>
                  <div className="flex xs:justify-center md:justify-start">
                    <button className="rounded-lg bg-[#FFB115] px-6 py-5 text-[#172B4D]">
                      Create Account & Donate
                    </button>
                  </div>
                </div>

                <div className="relative h-[419px]">
                  <Star className="z-3 -left-20 bottom-10 fill-[#FFB115] stroke-white" />
                  <Star
                    className="z-1 bottom-20 right-9 w-full fill-[#FFB115] stroke-white "
                    iconProps={{
                      width: "120%",
                      height: "120%",
                    }}
                  />
                  <img
                    src="/images/help_image1.png"
                    className="z-100 relative bottom-28 right-9 h-[445px] w-[446px] rounded-tl-[10px] rounded-tr-[10px] object-cover"
                  />
                </div>
              </div>

              <div className="flex h-[11px] w-[100%] flex-row rounded-bl-[10px] rounded-br-[10px] bg-[#FFB115]" />
            </div>

            <div className="flex w-full flex-col">
              <div className="non-italic text-center text-[40px] font-[600] text-qause-blue-dark">
                A little goes a long way.
              </div>
              {/* Donations Section */}
              <DraggableHorizontalScrolling className="scrollbar-hide no-scrollbar mt-[54px] flex w-[100%] flex-row gap-[12px] overflow-scroll overflow-x-scroll rounded-[10px]">
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
              </DraggableHorizontalScrolling>
            </div>
          </div>
        </div>
        <svg
          className="absolute right-20"
          width="69"
          height="77"
          viewBox="0 0 69 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="15.8365" height="77" rx="7.91823" fill="white" />
          <rect
            x="26.5642"
            width="15.8365"
            height="77"
            rx="7.91823"
            fill="white"
          />
          <rect
            x="53.1289"
            width="15.8365"
            height="77"
            rx="7.91823"
            fill="white"
          />
        </svg>
      </>
    </HomeSectionFrame>
  );
}
