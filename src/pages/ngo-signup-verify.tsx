import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../public/images/logo.png";
import SignupModal from "../components/common/signUpModal/SignupModal";
import { CircularProgress, Grid } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Link from "next/link";
import { useNgosignupVerify } from "../services/actions/authentication/authentication.action";
import { SignupType } from "../services/types/models";
import { EMPTY_STRING, TOKEN } from "../constants/constants";
import { useRouter } from "next/router";
import { ROUTER_PATH } from "../constants/url.links";
import { base_url, requestOptions } from "../utils/utils";
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const arr = [1, 2, 3, 4, 5, 6];
const signupForm: SignupType = {
  name: EMPTY_STRING,
  contactPerson: EMPTY_STRING,
  email: EMPTY_STRING,
  mobile: EMPTY_STRING,
  formattedAddress: EMPTY_STRING,
  countryCode: "91",
  website: EMPTY_STRING,
  referalCode: EMPTY_STRING,
  otp: EMPTY_STRING,
  street: EMPTY_STRING,
  city: EMPTY_STRING,
  state: EMPTY_STRING,
  country: EMPTY_STRING,
  zip: EMPTY_STRING,
  lat: 0,
  long: 0,
};
const _arr: { otp: string[] } = {
  otp: new Array(6),
};
const SignupVerify: React.FC<any> = () => {
  const router = useRouter();

  const [otpArr, setOtpArr] = useState<{ otp: string[] }>(_arr);
  const [userData, setUserData] = useState<SignupType>(signupForm);
  const mutation = useNgosignupVerify(userData);
  const [count, setCount] = useState(119);
  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        const temp = count - 1;
        setCount(temp);
      }, 1000);
    }
  }, [count]);
  // Called on entering otp
  const onOTPChange = (e: any, i: number) => {
    if (!document.getElementById(`otp_error`)?.classList.contains("hidden")) {
      document.getElementById(`otp_error`)?.classList.add("hidden");
    }
    const _otpArr: string[] = [...otpArr.otp];
    _otpArr[i] = e.target.value;
    setUserData((prev) => ({
      ...prev,
      otp: _otpArr.join(EMPTY_STRING),
    }));
    setOtpArr((prev) => ({
      ...prev,
      otp: _otpArr,
    }));
  };

  useEffect(() => {
    const __userData: any = localStorage.getItem("userData");
    const values = JSON.parse(__userData);
    const tempArr = values.address.split(",");
    setUserData({
      ...userData,
      name: values.organizationName,
      contactPerson: values.name,
      email: values.email,
      countryCode: values.countryCode,
      mobile: `${values.countryCode}-${values.phoneNo}`,
      website: values.domain,
      referalCode: values.referalCode,
      country: tempArr[tempArr.length - 1]?.trim().toLowerCase(),
      state: tempArr[tempArr.length - 2]?.trim().toLowerCase(),
    });
  }, []);

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
  const _useNgosignupVerify = async () => {
    if (userData.otp.length == 6) {
      const res = await fetch(`${base_url}user/ngo/register/verify`, requestOptions(userData));
      const result = await res.json();
      if (result.success) {
        localStorage.setItem("TOKEN", result.token);
        router.push("/signup-data");
      } else {
        if (result.otp == "OTP Expired") {
          document.getElementById("otp_error")!.innerHTML =
            "OTP Expired Please Resend";
          document.getElementById("otp_error")?.classList.remove("hidden");
        }
        if (result.otp == "OTP not valid") {
          document.getElementById("otp_error")!.innerHTML = "OTP is Invalid";
          document.getElementById("otp_error")?.classList.remove("hidden");
        }
      }
    } else {
      document.getElementById("otp_error")!.innerHTML = "Please Enter 6 digits OTP";
      document.getElementById("otp_error")?.classList.remove("hidden");
    }

  };

  useEffect(() => {
    if (mutation.isSuccess && mutation.data?.success) {
      localStorage.setItem(TOKEN, mutation.data?.token || EMPTY_STRING);
      router.push(ROUTER_PATH.SIGNUP_SCREEN_1);
    }
  }, [mutation.isSuccess, mutation.data?.success]);
  const resendOtp = async () => {
    const body = {
      mobile: userData.mobile,
      email: userData.email,
      reCaptchaToken: "123",
    };
    const signUpUser = await fetch(
      `${base_url}user/ngo/register`,
      requestOptions(body)
    );
    const signupResult = await signUpUser.json();
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
        <Link href="/ngo-signup">
          <ArrowBackIosRoundedIcon
            className="absolute left-[-20px] top-1 md:left-[-25px] lg:left-[-25px] xl:left-[-25px]"
            sx={{ fontSize: "1rem" }}
          />
          <div className="mb-[1rem] font-[muli] text-[14px] font-bold">
            Back
          </div>
        </Link>
      </div>

      <div className="mb-[1rem] font-[muli] text-[13px] font-light text-[#353636]">
        We&apos;ve sent an OTP on your Mobile Number <br />
        <span className="font-bold">+{userData.mobile}</span> Please enter it below
        to complete the verification.
      </div>
      <Grid container spacing={1} className="mb-[1rem]">
        {arr.map((item: number, i: number) => {
          return (
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} key={item}>
              <input
                type="number"
                id={`input/${i}`}
                value={otpArr.otp[i] || EMPTY_STRING}
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
        onClick={_useNgosignupVerify}
      >
        {mutation.isLoading ? <CircularProgress /> : "Verify Number"}
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

export default SignupVerify;
