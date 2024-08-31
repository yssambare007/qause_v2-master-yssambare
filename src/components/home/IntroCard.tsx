import { ArrowBack } from "@mui/icons-material";
import React from "react";
import {
  CorporateCard,
  DonorCard,
  NgoCard,
  VolunteerCard,
} from "./assets/FeatureCards";
import { IntroCardTitleBlink, ZigZag, ZigZag2 } from "./Decorations";
import HomeSectionFrame from "./HomeSectionFrame";

function FeatureCard(props: { text: string }) {
  return (
    <div
      className={`relative flex h-[245px] w-[276px] flex-col items-center justify-center rounded-[10px]`}
    >
      <div className="absolute z-0">
        {props.text === "NGOs" && <NgoCard />}
        {props.text === "Volunteer" && <VolunteerCard />}
        {props.text === "Donor" && <DonorCard />}
        {props.text === "Corporate (CSR)" && <CorporateCard />}
      </div>
      <div className="absolute right-4 top-4 flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white">
        <ArrowBack className="rotate-180" />
      </div>
      <div
        className={`z-10 text-center text-[32px] font-[600] not-italic text-white`}
      >
        {props.text}
      </div>
    </div>
  );
}

function TrustedByComponent(props: { text: string; imageSrc: string }) {
  return (
    <div className="flex flex-row items-center justify-center">
      <img src={props.imageSrc} className="h-[35px] w-[35px]" />
      <div className="ml-[9px] text-center text-[16px] font-[600] not-italic text-gray-800">
        {props.text}
      </div>
    </div>
  );
}

function ExpertiseNumberDisplay(props: { number: string; text: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[10px]
        "
    >
      <div className="text-center font-sans text-[24px] font-[700] not-italic text-gray-800 xs:text-base sm:text-lg">
        {props.number}
      </div>
      <div className="text-center font-sans text-[14px] font-[400] not-italic text-gray-800 xs:text-xs sm:text-sm">
        {props.text}
      </div>
    </div>
  );
}

function IntroCard() {
  return (
    <HomeSectionFrame background="bg-[#F7F8F9]" padding="px-12">
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-[#DCDFE4] bg-white pb-4 pt-10">
        <div className="absolute left-[197px] top-[194px]">
          <ZigZag />
        </div>

        <div className="absolute bottom-[294px] right-[397px]">
          <ZigZag2 />
        </div>

        <div className="relative z-10 flex w-fit flex-row items-center text-center font-sans font-[700] text-gray-800 xs:flex-col xs:gap-y-2 xs:text-xl sm:text-[30px] md:text-[40px] lg:text-[54px]">
          <span className="flex items-center whitespace-nowrap px-2">
            An Interactive
          </span>
          <span className="mx-2 flex items-center justify-center rounded-full bg-[#EAEAEA] px-4 py-1 text-[#002DC9] md:mt-[0px] lg:mt-[10px]">
            Digital Platform
          </span>
          <span>for</span>
          <IntroCardTitleBlink className="absolute -right-[8%] top-2 h-[10%] w-[10%] xs:h-[20%] xs:w-[20%]" />
        </div>
        {/* 4 boxes of size 100px with different colors */}
        <div
          className="mt-[50px] grid justify-center
                 gap-[17px] md:grid-cols-2 lg:grid-cols-4"
        >
          <FeatureCard text="NGOs" />
          <FeatureCard text="Volunteer" />
          <FeatureCard text="Donor" />
          <FeatureCard text="Corporate (CSR)" />
        </div>

        <div className="mt-[35px] text-center text-[20px] font-[700] not-italic text-gray-800">
          We are trusted by
        </div>

        <div className="mt-[35px] flex flex-row flex-wrap justify-center gap-[25px]">
          <TrustedByComponent
            text="NGO Name One"
            imageSrc={"/images/trusted_img_1.png"}
          />
          <TrustedByComponent
            text="NGO Name One"
            imageSrc={"/images/trusted_img_2.png"}
          />
          <TrustedByComponent
            text="NGO Name One"
            imageSrc={"/images/trusted_img_3.png"}
          />
          <TrustedByComponent
            text="NGO Name One"
            imageSrc={"/images/trusted_img_4.png"}
          />
        </div>

        <div className="mt-[40px] text-center text-[20px] font-[700] text-gray-800">
          Expertise you can trust
        </div>
        <div className="mt-[24px] flex w-full items-center justify-center">
          <div className="mx-2 flex flex-row justify-center rounded-2xl bg-[#EDEEF1] ">
            <div className="flex flex-row gap-8 p-4">
              <ExpertiseNumberDisplay number={"2.6K+"} text="NGO Digitised" />
              <ExpertiseNumberDisplay
                number={"1366+"}
                text="Inspiring Stories Covered"
              />
              <ExpertiseNumberDisplay
                number={"2.1K+"}
                text="Events Showcased"
              />
            </div>
          </div>
        </div>
      </div>
    </HomeSectionFrame>
  );
}

export default IntroCard;
