import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PhoneEmailInput from "./inputFields/PhoneEmail";
import AlertComp from "../Alert";
import { volunteerSignUpPayload } from "../../services/types/models";
import { ERROR } from "../../constants/constants";
import { useGoogleLogin } from "@react-oauth/google";
import { UseMutateFunction } from "react-query";

interface VolunteerAuthCardProps {
  onSendOTP: (payload: volunteerSignUpPayload) => void;
  title: string;
  subtitle?: string;
  othertext: string;
  otherLinkText: string;
  otherLinkPath: string;
  error?: string;
  onClose?: () => void;
  googleLogin: (token: string) => void;
}

const VolunteerAuthCard = (props: VolunteerAuthCardProps) => {
  const [payload, setPayload] = useState<volunteerSignUpPayload>({});
  const [user, setUser] = useState<any>({});

  function onInput(data: volunteerSignUpPayload) {
    setPayload(Object.keys(data).length !== 0 ? data : {});
  }

  function onGetOTP() {
    props.onSendOTP(payload);
  }

  //Google login

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => props.googleLogin(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  // useEffect(() => {
  //   props.googleLogin(user.accessToken);
  // },[user]);

  return (
    <div className="flex min-h-full w-full flex-col items-center gap-y-8 overflow-y-auto px-[5%] pt-8 lg:w-5/12">
      <div className="flex w-full items-center justify-center">
        <Image
          src="/images/logo.png"
          width={177}
          height={54}
          alt="logo"
          className="cursor-pointer"
        />
      </div>
      <div className="w-full text-center text-2xl font-extrabold">
        {props.title}
      </div>
      {props.subtitle && (
        <div className="w-full text-center text-base font-normal leading-5 text-gray-500">
          {props.subtitle}
        </div>
      )}
      {props.error && props.error.length > 0 && (
        <div className="flex w-full justify-center">
          <AlertComp error={props.error} type={ERROR} />
        </div>
      )}
      <PhoneEmailInput onChange={onInput} />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <button
            className={`w-[70%] rounded-3xl ${
              payload ? "bg-[#f7a212]" : "bg-[#f8c165]"
            } py-4 text-white`}
            onClick={onGetOTP}
          >
            Get OTP
          </button>
        </div>
        <div className="relative flex w-full items-center py-5">
          <div className="flex-grow border-t border-black"></div>
          <span className="flex-shrink bg-white px-4 font-black text-black">
            Or
          </span>
          <div className="flex-grow border-t border-black"></div>
        </div>
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-center gap-x-4 rounded-xl border border-gray-400 bg-white px-8 py-4">
            <Image
              src={"https://img.icons8.com/color/16/000000/google-logo.png"}
              width={16}
              height={16}
              alt="google-logo"
            />
            <span onClick={() => login()} className="text-lg font-extrabold">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-center text-sm">
          <span>{props.othertext}</span>{" "}
          <Link href={props.otherLinkPath}>
            <span className="font-bold">{props.otherLinkText}</span>
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          By continuing to use mobile app,
          <br /> you agree to Qause&apos;s
        </p>
        <div className="flex justify-center gap-x-2 text-center text-sm">
          <span className="text-blue-800 underline">Terms and Conditions</span>
          <span>and</span>
          <span className="text-blue-800 underline">Conditions</span>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAuthCard;
