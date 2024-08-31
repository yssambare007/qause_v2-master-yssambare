import { useState } from "react";
import Image from "next/image";
import {
  EMPTY_STRING,
  ERROR,
  ROUTE_VOLUNTEER_SIGNUP,
} from "../../constants/constants";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AlertComp from "../Alert";
import { Grid } from "@mui/material";
import { _otp_ } from "../../services/actions/authentication/fetch";
import { optType } from "../../services/types/models";
interface VolunteerAuthCardProps {
  onSendOTP: (payload: any) => void;
  title: string;
  subtitle?: string;
  othertext: string;
  otherLinkText: string;
  otherLinkPath: string;
  error: string;
}

const VolunteerVerifyCard = (props: VolunteerAuthCardProps) => {
  const [payload, setPayload] = useState<string>(EMPTY_STRING);
  const router = useRouter();
  const _otp_: optType = {
    otpArr: new Array(6),
    data: {
      otp: EMPTY_STRING,
      ngomobile: EMPTY_STRING,
    },
  };
  const [otp, setOTP] = useState<optType>(_otp_);

  function onInput(data: string) {
    setPayload(data);
  }

  function onGetOTP() {
    props.onSendOTP(otp.data.otp);
  }

  const backBtnClick = () => {
    router.push(ROUTE_VOLUNTEER_SIGNUP);
  };

  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const arr = [1, 2, 3, 4, 5, 6];

  const onOTPChange = (e: any, i: number) => {
    if (!document.getElementById(`otp_error`)?.classList.contains("hidden")) {
      document.getElementById(`otp_error`)?.classList.add("hidden");
    }
    const otpArr: string[] = [...otp.otpArr];
    otpArr[i] = e.target.value;
    setOTP((prev) => ({
      ...prev,
      otpArr,
      data: {
        ...prev.data,
        otp: otpArr.join(""),
      },
    }));
  };

  const onKeyUp = (index: number, e: any) => {
    if (index !== 6) {
      if (nums.includes(e.key)) {
        document.getElementById(`input/${index + 1}`)?.focus();
      }
      if (e.key == "Backspace") {
        document.getElementById(`input/${index - 1}`)?.focus();
      }
    }
  };

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
      <div className="w-full text-center text-4xl font-extrabold">
        {props.title}
      </div>
      {props.subtitle && (
        <div className="text-black-500 w-full text-center text-base font-normal leading-5">
          {props.subtitle}
        </div>
      )}
      <div className="text-black-500 w-full text-center text-2xl font-bold leading-5">
        Verification
      </div>
      {props.error.length > 0 && (
        <div className="flex w-full justify-center">
          <AlertComp error={props.error} type={ERROR} />
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center">
        <Grid container spacing={1} className="mb-[1rem]">
          {arr.map((item, i) => {
            return (
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2} key={item}>
                <input
                  type="number"
                  id={`input/${i}`}
                  value={otp.otpArr[i] || EMPTY_STRING}
                  className="w-[80%] border-b-2 bg-transparent border-[#161616] py-1 text-center text-[1.5rem] text-[muli] focus:border-[#253dc1] focus:outline-none"
                  autoComplete="none"
                  onChange={(e) => onOTPChange(e, i)}
                  pattern="\d*"
                  maxLength={1}
                  onKeyUp={(e) => onKeyUp(i, e)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <button
            className={`w-[70%] rounded-3xl ${
              otp.data.otp.length === 6 ? "bg-[#f7a212]" : "bg-[#f8c165]"
            } py-4 text-white`}
            onClick={onGetOTP}
            disabled={otp.data.otp.length === 6 ? false : true}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
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

export default VolunteerVerifyCard;
