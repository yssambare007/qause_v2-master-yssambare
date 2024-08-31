import { useEffect, useState } from "react";
import Image from "next/image";
import { EMPTY_STRING } from "../../constants/constants";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommonInput from "./inputFields/CommonInput";
interface VolunteerAuthCardProps {
  onSendOTP: any;
  title: string;
  subtitle?: string;
  othertext: string;
  otherLinkText: string;
  otherLinkPath: string;
  setName: (name: string) => void;
  setLang: (lang: string) => void;
  onEnter: () => void;
  langsAdded: string[];
  removeItem: (item: string) => void;
}

const VolunteerPersonalDetailCard = (props: VolunteerAuthCardProps) => {
  const [payload, setPayload] = useState<string>(EMPTY_STRING);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  });

  function onGetOTP() {
    props.onSendOTP(payload);
  }

  const backBtnClick = () => {
    router.push("/volunteer-signup-verify");
  };

  if (loaded) {
    const elem = document.getElementById("langs");
    elem?.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        props.onEnter();
      }
    });
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center gap-y-8 overflow-y-auto px-[5%] pt-8 lg:w-5/12">
      <div className="flex w-full items-center justify-start">
        <ArrowBackIcon
          style={{ fontSize: "35px", cursor: "pointer" }}
          onClick={backBtnClick}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <Image
          src="/images/logo.png"
          width={177}
          height={54}
          alt="logo"
          className="cursor-pointer"
        />
      </div>
      <div className="w-full text-left text-4xl font-extrabold">
        {props.title}
      </div>
      {props.subtitle && (
        <div className="text-black-500 w-full text-left text-base font-normal leading-5">
          {props.subtitle}
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center">
        <CommonInput
          onChange={(e: any) => props.setName(e.target.value)}
          readOnly={false}
          label="Full Name"
          placeHolder="Add your name"
        />
        <CommonInput
          id="langs"
          onChange={(e: any) => props.setLang(e.target.value)}
          readOnly={false}
          label="Languages Known*"
          placeHolder="Add language"
          sublabel="Press enter to add language"
        />
        {props.langsAdded.length === 0 && (
          <div className="flex w-full justify-start">
            <span className="text-[14px] text-[red]">Language is required</span>
          </div>
        )}
        {props.langsAdded.length > 0 && (
          <div className="flex w-full">
            {props.langsAdded.map((item: string, index) => (
              <div
                className="bg-grey ml-[5px] flex items-center justify-center rounded-md border border-black px-[2%] py-[2%] text-[13px] font-bold"
                key={index}
              >
                <p>
                  {item}{" "}
                  <span
                    onClick={() => props.removeItem(item)}
                    className="ml-[15px] cursor-pointer text-[15px]"
                  >
                    x
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-start">
          <button
            className={`w-[100%] rounded-3xl ${
              props.langsAdded.length ? "bg-[#f7a212]" : "bg-[#f8c165]"
            } py-4 text-white`}
            onClick={onGetOTP}
            disabled={props.langsAdded.length > 0 ? false : true}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <p className="mt-4 text-center text-sm text-gray-600">
          By continuing to use mobile app, you agree to Qause&apos;s
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

export default VolunteerPersonalDetailCard;
