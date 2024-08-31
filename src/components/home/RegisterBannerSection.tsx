import Image from "next/image";
import { Star } from "./Decorations";

export default function RegisterBannerSection() {
  return (
    <div className="relative flex w-full overflow-hidden p-8 xl:px-16">
      <svg
        className="absolute left-20 top-2 hidden md:block"
        width="64"
        height="62"
        viewBox="0 0 64 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.771184 20.1805C12.4857 24.3552 29.6054 36.0442 20.6168 61.2667C24.0739 51.5657 37.5882 33.3011 63.4079 42.5025C37.5882 33.3011 38.1926 10.4357 41.6498 0.734711C32.6612 25.9572 12.4857 24.3552 0.771184 20.1805Z"
          fill="white"
          stroke="#FFB115"
          stroke-width="2"
        />
      </svg>
      {/* A Banner of 520px with image on left side and text on right side */}
      <div className="flex w-full flex-row justify-between rounded-[32px] bg-[#3E414E] xs:flex-col xs:p-4 xl:pr-16">
        {/* Image on left */}
        <div className="align-end relative flex h-full flex-col justify-end xs:w-full sm:w-1/2">
          <img
            src="/images/three_child_decoration.png"
            className="z-10 pt-4"
            alt="Donate"
          />
        </div>
        {/* Text on right */}
        <div className="items-left flex h-full flex-col justify-center gap-y-8 p-4 font-sans xs:w-full xs:items-center">
          <div className="font-[600] text-white xs:text-center xs:text-xl md:text-2xl lg:text-[40px] lg:leading-[50px] xl:leading-[40px]">
            Trust our years of experience
            <br /> with nonprofits &
            <span className="ml-2 font-[700] text-[#FFB115]">REGISTER</span>
            <br />
            to enter the digital world of
            <br /> opportunities for
            <span className="ml-2 font-[700] text-[#FFB115]">FREE!</span>
          </div>
          <button className="w-fit rounded-lg bg-[white] px-6 py-5 text-[#3E414E]">
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  );
}
