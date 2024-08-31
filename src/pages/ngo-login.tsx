import { useLogin } from "../services/actions/authentication/authentication.action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../public/images/logo.png";
import SignupModal from "../components/common/signUpModal/SignupModal";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import type { loginType, loginTypeWithEmail } from "../services/types/models";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import CountriesDropdown from "../components/countryDropDown/CountriesDropdown";
import { base_url_login, requestOptions, validateEmail } from "../utils/utils";
import { ROUTER_PATH } from "../constants/url.links";
import SeoHeadComponent from "../components/common/SeoHeadComponent";
import { seoContext } from "../utils/seo";

const _loginData: loginType = {
  ngomobile: "",
};
const _loginWithemail: loginTypeWithEmail = {
  ngoemail: "",
};

const LoginVerify: React.FC = (props) => {
  const router = useRouter();

  // state management
  const [isMobileVerify, setMobileVerify] = useState(true);
  const [login, setLogin] = useState<loginType>(_loginData);
  const [countryCode, setCountryCode] = useState<string>("91-");
  const [loginWithemail, setLoginWithEmail] =
    useState<loginTypeWithEmail>(_loginWithemail);

  const _setCountryCode = (code: string) => {
    setCountryCode(code.concat("-"));
  };
  // API request
  const loginState = useLogin(
    isMobileVerify
      ? { ...login, ngomobile: countryCode.concat(login.ngomobile) }
      : loginWithemail
  );

  // called on mobile number entered
  const onMobileNumberEnter = (e: any) => {
    if (
      !document.getElementById(`number_error`)?.classList.contains("hidden")
    ) {
      document.getElementById(`number_error`)?.classList.add("hidden");
    }
    setLogin((prev) => ({
      ngomobile: e.target.value,
    }));
  };
  const [email, setEmail] = useState("");
  const onEmailChange = (e: any) => {
    if (!document.getElementById(`email_error`)?.classList.contains("hidden")) {
      document.getElementById(`email_error`)?.classList.add("hidden");
    }
    setEmail(e.target.value);
  };

  // clean up
  const reset = () => {
    setLogin(_loginData);
    setLoginWithEmail(_loginWithemail);
  };

  const _loginEmail = async () => {
    const body = {
      // ngomobile: `${countryCode}${login.ngomobile}`,
      ngoemail: email,
      reCaptchaToken: "123",
    };
    const loginUser = await fetch(
      `${base_url_login}user/ngo/login`,
      requestOptions(body)
    );
    const signupResult = await loginUser.json();
    if (!signupResult.success) {
      document.getElementById("email_error")!.innerHTML =
        "Email Id doesn't exists.";
      document.getElementById("email_error")?.classList.remove("hidden");
    } else {
      localStorage.setItem(
        "loginDetails",
        JSON.stringify({
          type: "Email",
          no: email,
        })
      );
      router.push(`/ngo-login-verify`);
    }
  };

  const _loginMobile = async () => {
    const body = {
      ngomobile: `${countryCode}${login.ngomobile}`,
    };
    const loginUser = await fetch(
      `${base_url_login}user/ngo/login`,
      requestOptions(body)
    );
    const signupResult = await loginUser.json();
    if (!signupResult.success) {
      document.getElementById("number_error")!.innerHTML =
        "Mobile Number doesn't exists.";
      document.getElementById("number_error")?.classList.remove("hidden");
    } else {
      localStorage.setItem(
        "loginDetails",
        JSON.stringify({
          type: "Mobile Number",
          no: `${countryCode}${login.ngomobile}`,
        })
      );
      router.push(`/ngo-login-verify`);
    }
  };

  // login API call
  const _login = async () => {
    if (isMobileVerify) {
      if (login.ngomobile == "") {
        document.getElementById("number_error")!.innerHTML =
          "Mobile Number is required";
        document.getElementById("number_error")?.classList.remove("hidden");
        return;
      }
      if (login.ngomobile !== "" && login.ngomobile.length !== 10) {
        document.getElementById("number_error")!.innerHTML =
          "Mobile Number is invalid";
        document.getElementById("number_error")?.classList.remove("hidden");
        return;
      }
      _loginMobile();
    } else {
      if (email == "") {
        document.getElementById("email_error")!.innerHTML =
          "Email Id is required";
        document.getElementById("email_error")?.classList.remove("hidden");
        return;
      }
      if (email !== "" && !validateEmail(email)) {
        document.getElementById("email_error")!.innerHTML =
          "Email Id is invalid";
        document.getElementById("email_error")?.classList.remove("hidden");
        return;
      }
      _loginEmail();
    }
  };
  useEffect(() => {
    if (loginState.isSuccess && loginState.data.success) {
      // on login succssful push to OTP verification page with mobile as params
      router.push({
        pathname: ROUTER_PATH.OTP_VERIFY_SCREEN,
        query: {
          data: isMobileVerify
            ? countryCode.concat(login.ngomobile)
            : loginWithemail.ngoemail,
          isMobile: isMobileVerify,
        },
      });
    }
    return () => {
      // clear the state on unmount
      reset();
    };
  }, [loginState.isSuccess]);

  return (
    <>
      <SeoHeadComponent {...seoContext.Login} />
      <SignupModal>
        <Image
          src={Logo}
          alt="logo"
          className="mx-auto mb-[30px]"
          height={25}
        />

        <div className="flex flex-col ">
          <p className="mb-6 pb-2 text-center text-2xl font-bold">NGO Login</p>
          <div hidden={!isMobileVerify} className="text-gray-600">
            <span className="font-bold ">Mobile Number</span>
            <div className="my-[10px] flex items-center">
              {/* Need to change the front drop down for the mobile verify */}
              <span className="">
                <CountriesDropdown
                  height="h-[50px]"
                  onChange={_setCountryCode}
                ></CountriesDropdown>
              </span>
              <input
                name="Mobile-Number"
                type="number"
                value={login.ngomobile}
                className="h-[30px] w-[100%] rounded-r-sm border-b border-r border-t border-gray-400 px-[1rem] py-6 font-[muli] text-[12px] text-[#636363] invalid:border-red-500 focus:outline-[#80bdff86]"
                onChange={onMobileNumberEnter}
                placeholder="Your Mobile Number"
              />
            </div>
            <div className="flex justify-between">
              <div>
                {/* <p hidden={(numberLengthValidation)} className="text-red-900 text-xs text-left">enter a valid mobile number</p> */}
                <div
                  className="hidden text-[13px] text-red-400"
                  id="number_error"
                ></div>
              </div>
              <p
                className="cursor-pointer text-right text-xs font-thin"
                onClick={() => setMobileVerify(false)}
              >
                Email Address
              </p>
            </div>
          </div>

          <div hidden={isMobileVerify} className="text-gray-600">
            <span className="font-bold">Email Address</span>
            <div className="my-[10px] flex items-center">
              <span className="flex h-[30px] w-fit items-center justify-between rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[4px] py-[22px] text-center">
                <EmailRoundedIcon
                  sx={{ color: "#636363", fontSize: "2.5rem", padding: "8px" }}
                ></EmailRoundedIcon>
              </span>
              <input
                name="Email-Address"
                type="email"
                value={email}
                className="h-[30px] w-[100%] rounded-r-sm border-b border-r border-t border-gray-400 px-[1rem] py-[22px] font-[muli] text-[12px] text-[#636363] invalid:border-red-500 focus:outline-[#80bdff86]"
                onChange={onEmailChange}
                placeholder="Your Email Address"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <div
                  className="hidden text-[13px] text-red-400"
                  id="email_error"
                ></div>
              </div>
              <div>
                <p
                  hidden={loginState.data?.success}
                  className="text-left text-xs text-red-900"
                >
                  {loginState.data?.email}
                </p>
              </div>
              <p
                className="cursor-pointer text-right text-xs font-thin"
                onClick={() => setMobileVerify(true)}
              >
                Mobile Number
              </p>
            </div>
          </div>
          <div className="text-center">
            {/* <button hidden={isMobileVerify} className={`bg-[#253dc1] py-3 px-8 text-xl font-bold text-white border rounded-lg mt-[60px] mb-[80px] max-w-[195px] ${emailAddress.length < 1 ? "cursor-not-allowed" : ""}`} style={{ boxShadow: "0 .6em .6em -.2em rgb(0 0 0/30%)" }} onClick={() => console.log(emailAddress)}>
            Request OTP
          </button> */}
            <button
              // hidden={!isMobileVerify}
              className={`mb-[80px] mt-[60px] max-w-[195px] cursor-pointer rounded-md bg-[#253dc1] px-8 py-3 text-xl font-bold text-white`}
              style={{ boxShadow: "0 .6em .6em -.2em rgb(0 0 0/30%)" }}
              onClick={_login}
            >
              {loginState.isLoading ? <CircularProgress /> : "Request OTP"}
            </button>
          </div>
        </div>
      </SignupModal>
    </>
  );
};

export default LoginVerify;
