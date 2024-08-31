import React from "react";
import Image from "next/image";
import Link from "next/link";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col bg-[#3E414E] px-4 py-10 text-white lg:flex-row lg:px-16">
        <div className="relative flex flex-col items-center gap-4 lg:w-96">
          <Image
            className="bottom-0 lg:absolute"
            height={400}
            width={319}
            alt="child"
            src={"/images/Group 227005.png"}
          />
          <div className="z-[1] flex h-56 flex-col justify-between gap-0 bg-gradient-to-t from-[#3E414E] lg:justify-end lg:gap-3">
            <h6 className="text-center text-[24px] leading-8 lg:text-left">
              Subscribe & Get Full Digital Assistance for your NGO
            </h6>
            <button className="m-auto w-fit rounded-md bg-[#4AC6C6] px-[24px] py-[16px] text-black lg:m-0">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 lg:flex-row lg:gap-0">
          <div className="flex flex-col items-center justify-center lg:block">
            <Image
              height={60}
              width={150}
              alt="logo"
              src={"/images/footer-logo.png"}
            />
            <p className="mt-4 text-[14px] leading-6 lg:w-56">
              Qause aims to strengthen the social sector by providing a digital
              experience to non profits volunteers and donors.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="grid grid-cols-2 gap-5 lg:flex">
              <Link className="text-[14px] leading-4" href="#">
                Home
              </Link>
              <Link className="text-[14px] leading-4" href="#">
                About Us
              </Link>
              <Link className="text-[14px] leading-4" href="#">
                Blogs
              </Link>
              <Link className="text-[14px] leading-4" href="#">
                Grants
              </Link>
              <Link className="text-[14px] leading-4" href="#">
                Frequently Asked Questions
              </Link>
              <Link className="text-[14px] leading-4" href="#">
                Privacy Policy
              </Link>
              <Link className="text-[14px] leading-4" href="#">
                Terms and conditions
              </Link>
            </div>

            <span className="flex items-center gap-2">
              Social Contact
              <FacebookOutlinedIcon className="ml-2" />
              <InstagramIcon className="ml-2" />
              <YouTubeIcon className="ml-2" />
            </span>

            <p className="text-[14px] leading-5 lg:w-44">
              Mindism Tech Pvt. Ltd.30, Arjun Marg, DLF Phase-1, Gurgaon,
              Haryana.
            </p>

            <p className="text-[14px] leading-5">support@qause.com</p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-start justify-center bg-[#353742] py-[24px] text-white">
        © 2023 - Qause India
      </div>
    </div>
  );
};

export default Footer;
