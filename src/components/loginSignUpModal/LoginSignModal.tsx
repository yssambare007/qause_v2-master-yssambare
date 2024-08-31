import React, { useState } from "react";
import Image from "next/image";
import NonProfitImg from "../../../public/images/joinusmodal-ngoprofit.png";
import VolunteerImg from "../../../public/images/joinusmodal-volunteeer.png";
import BottomBannerImg from "../../../public/images/joinusmodal-bottom-img.png";
import ClearIcon from "@mui/icons-material/Clear";
import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
interface Props {
  HandleFunction: (handle: boolean) => unknown;
  title?: string;
  isSignUp?: boolean;
}
export default function LoginSignModal(props: Props) {
  const [showModal, setShowModal] = useState(true);
  const modalOff = (value: boolean) => {
    setShowModal(value);
    props.HandleFunction(value);
  };
  return (
    <>
      <div
        hidden={showModal}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#c9cbcc] outline-none  focus:outline-none"
      >
        <div className="relative mx-4 my-8 p-2 md:w-1/2">
          {/*content*/}
          <div className="relative flex w-full flex-col outline-none focus:outline-none ">
            {/*header*/}
            <button
              className="absolute -right-2 -top-2 float-right ml-auto rounded-lg border-0 p-2 font-semibold leading-none text-black outline-none focus:outline-none"
              onClick={() => modalOff(false)}
            >
              <ClearIcon className="rounded-tr-xl bg-black text-2xl text-white"></ClearIcon>
            </button>
            <div className="rounded-xl bg-[#f3f9fe] p-4 shadow-lg">
              <div className="flex justify-evenly p-1 pt-6 text-center text-base">
                Join a community of changemakers & do good things together!
              </div>
              <div className="flex items-center justify-center">
                <div className="relative my-8 flex w-5/6 flex-row items-center text-2xl dark:text-black">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="mx-4 flex-shrink font-bold text-[#333333]">
                    {props.title}
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex">
                  <Link
                    href={props.isSignUp ? "/ngo-signup" : "/ngo-login"}
                    className="flex w-1/2 flex-col items-center justify-center"
                  >
                    <figure className="m-2 flex h-auto justify-center rounded-2xl border border-gray-600 align-middle">
                      <Image
                        alt="non-profit"
                        className="rounded-2xl bg-white"
                        src={NonProfitImg}
                      ></Image>
                    </figure>
                    <div className="mt-1 text-base font-bold">Non Profit</div>
                  </Link>
                  <Link
                    href={
                      props.isSignUp ? "/volunteer-signup" : "/volunteer-login"
                    }
                    className="flex w-1/2 flex-col items-center justify-center"
                  >
                    <figure className="m-2 flex h-auto justify-center rounded-2xl border border-gray-600 align-middle">
                      <Image
                        alt="volunteer"
                        className="rounded-2xl bg-white"
                        src={VolunteerImg}
                      ></Image>
                    </figure>
                    <div className="mt-1 text-base font-bold">Volunteer</div>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <Image alt="banner" src={BottomBannerImg}></Image>
              </div>

              <div
                className={`flex flex-col items-center text-sm font-light ${
                  !props?.isSignUp && "hidden"
                }`}
              >
                <p className="mt-8">OR</p>
                <p className="mt-2">
                  Already have an account?{" "}
                  <Link
                    href={END_POINTS.NGO_LOGIN}
                    className="font-extrabold text-orange-400"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
