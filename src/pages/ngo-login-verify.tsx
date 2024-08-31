import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import SignupModal from "../components/common/signUpModal/SignupModal";
import { Grid } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Link from "next/link";
import type { optType } from "../services/types/models";
import { EMPTY_STRING, TOKEN } from "../constants/constants";
import { useRouter, withRouter } from "next/router";
import { useOtp } from "../services/actions/authentication/authentication.action";
import { ROUTER_PATH } from "../constants/url.links";
import { base_url_login, requestOptions } from "../utils/utils";
import { getCurrentProfile } from "../utils/apis/profile/Index";
const arr = [1, 2, 3, 4, 5, 6];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const _otp_: optType = {
  otpArr: new Array(6),
  data: {
    otp: EMPTY_STRING,
    ngomobile: EMPTY_STRING,
  },
};

const LoginVerify: React.FC<any> = (props) => {
  const router = useRouter();
  const [otp, setOTP] = useState<optType>(_otp_);
  const otpResponse = useOtp(otp.data);
  const [count, setCount] = useState(119);
  // set the mobile number set from URL in state
  const [loginData, setLoginData] = useState({
    type: "",
    value: "",
  });
  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        const temp = count - 1;
        setCount(temp);
      }, 1000);
    }
  }, [count]);
  useEffect(() => {
    setOTP((prev) => ({
      ...prev,
      data:
        props.router.query.isMobile === "true"
          ? {
              ...prev.data,
              ngomobile: props.router.query.data || EMPTY_STRING,
            }
          : {
              ...prev.data,
              ngoemail: props.router.query.data || EMPTY_STRING,
            },
    }));
    if (localStorage.getItem("loginDetails")) {
      const data: any = localStorage.getItem("loginDetails");
      const value = JSON.parse(data);
      setLoginData({
        ...loginData,
        type: value.type,
        value: value.no,
      });
    }
  }, []);

  // Called on entering otp
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

  const redirectBasedOnPostSignupCompleted = async () => {
    const res = await getCurrentProfile();
    router.push(res?.isPostSignupComplete ? "/ngobackend/profile" : "/signup-data");
  };

  const _opt = async () => {
    if (otp.data.otp.length == 6) {
      const body = {
        ngomobile: loginData.type == "Email" ? null : loginData.value,
        ngoemail: loginData.type == "Email" ? loginData.value : null,
        otp: otp.data.otp,
      };
      const verifyUser = await fetch(
        `${base_url_login}user/ngo/login/verify`,
        requestOptions(body)
      );
      const verifyResult = await verifyUser.json();
      if (verifyResult.success) {
        localStorage.setItem("TOKEN", verifyResult.token);
        redirectBasedOnPostSignupCompleted();
      } else {
        if (verifyResult.otp == "OTP Expired") {
          document.getElementById("otp_error")!.innerHTML =
            "OTP Expired Please Resend";
          document.getElementById("otp_error")?.classList.remove("hidden");
        }
        if (verifyResult.otp == "OTP not valid") {
          document.getElementById("otp_error")!.innerHTML = "OTP is Invalid";
          document.getElementById("otp_error")?.classList.remove("hidden");
        }
      }
    } else {
      document.getElementById("otp_error")!.innerHTML =
        "Please Enter 6 digits OTP";
      document.getElementById("otp_error")?.classList.remove("hidden");
    }
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
  const reset = () => {
    setOTP(_otp_);
  };
  useEffect(() => {
    if (otpResponse.isSuccess && otpResponse.data.success) {
      localStorage.setItem(TOKEN, otpResponse.data.token);
      router.push(ROUTER_PATH.PROFILE);
    }
    return () => {
      // clean up
      reset();
    };
  }, [otpResponse.isSuccess]);
  const resendOtp = async () => {
    const body = {
      ngomobile: loginData.type == "Email" ? null : loginData.value,
      ngoemail: loginData.type == "Email" ? loginData.value : null,
    };
    const loginUser = await fetch(
      `${base_url_login}user/ngo/login`,
      requestOptions(body)
    );
    const signupResult = await loginUser.json();
    if (signupResult.success) {
      document.getElementById("otp_error")!.innerHTML =
        "OTP has been resent successfully";
      document.getElementById("otp_error")?.classList.remove("hidden");
      setCount(119);
      setTimeout(() => {
        document.getElementById("otp_error")?.classList.add("hidden");
      }, 3000);
    }
  };

  return (
    <SignupModal>
      <Image src={Logo} alt="logo" className="mx-auto mb-[30px]" height={25} />

      <div className="relative w-fit cursor-pointer">
        <Link href="/ngo-login" className="flex items-center">
          <div className="mb-[1rem] flex items-center gap-x-2 font-[muli] text-[14px] font-bold">
            <ArrowBackIosRoundedIcon sx={{ fontSize: "1rem" }} />
            Back
          </div>
        </Link>
      </div>

      <div className="mb-[1rem] font-[muli] text-[13px] font-light text-[#353636]">
        We&apos;ve sent an OTP on your {loginData.type} <br />
        <span className="font-bold">{loginData.value}</span> Please enter it
        below to complete the verification.
      </div>
      <Grid container spacing={1} className="mb-[1rem]">
        {arr.map((item, i) => {
          return (
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} key={item}>
              <input
                type="number"
                id={`input/${i}`}
                value={otp.otpArr[i] || EMPTY_STRING}
                className="w-[100%] border-b-2 border-[#e5e5e5] py-1 text-center text-[1.5rem] text-[muli] focus:border-[#253dc1] focus:outline-none"
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
      <div className="flex justify-center">
        {count !== 0 ? (
          <div className="mb-[0.6rem] text-center text-[0.9rem] font-semibold  text-[#ea62089c]">
            Resend OTP in {count} seconds
          </div>
        ) : (
          <button
            className="mb-[0.6rem] cursor-pointer text-center text-[0.9rem] font-semibold text-[muli] text-[#ea6408]"
            onClick={resendOtp}
          >
            Resend OTP
          </button>
        )}
      </div>
      <div className="my-2 hidden text-center text-red-400" id="otp_error">
        Invalid OTP
      </div>
      <button
        className="mb-[1rem] w-[100%] rounded-md bg-[#253dc1] py-[15px] text-center font-[muli] text-[1.2rem] text-[#fff] text-[muli]"
        onClick={_opt}
      >
        Login Now
      </button>
      <div className="mb-[1rem] flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-[18px] w-[18px] cursor-pointer"
          id="login"
        />
        <label
          className="cursor-pointer font-[muli] text-[14px]"
          htmlFor="login"
        >
          Stay logged in
        </label>
      </div>
      <div className="mb-[1rem] font-[muli] text-[12px] font-normal text-[#353636]">
        By continuing you agree to Qause Network&apos;s <br />
        Conditions of Use and{" "}
        <Link href="/privacy-policy">
          <span className="cursor-pointer text-[14px] underline">
            Privacy Policy
          </span>
        </Link>
      </div>
    </SignupModal>
  );
};

export default withRouter(LoginVerify);
