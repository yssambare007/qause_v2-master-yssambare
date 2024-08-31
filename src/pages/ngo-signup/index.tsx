import { Grid } from "@mui/material";
import { requestOptions, base_url } from "../../utils/utils";
import SignupImage from "../../../public/images/signup.png";
import SignupLogo from "../../../public/images/signup-logo.png";
import CallIcon from "@mui/icons-material/Call";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EmailIcon from "@mui/icons-material/Email";
import Checkbox from "@mui/material/Checkbox";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import Image from "next/image";
import CountriesDropdown from "../../components/countryDropDown/CountriesDropdown";
import { useEffect, useState } from "react";

import Router from "next/router";
import Link from "next/link";
import SeoHeadComponent from "../../components/common/SeoHeadComponent";
import { seoContext } from "../../utils/seo";
import Validate from "../../components/validator/Validator";
import InputWithIcon from "../../components/common/inputFields/InputWithIcon";
import AutoComplete from "../../components/autoComplete/Autocomplete";

const arrayStates = [
  "andaman and nicobar islands",
  "andhra pradesh",
  "arunachal pradesh",
  "assam",
  "bihar",
  "chandigarh",
  "chhattisgarh",
  "dadra and nagar haveli",
  "daman and diu",
  "delhi",
  "goa",
  "gujarat",
  "haryana",
  "himachal pradesh",
  "jammu and kashmir",
  "jharkhand",
  "karnataka",
  "kerala",
  "ladakh",
  "lakshadweep",
  "madhya pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "pondicherry",
  "puducherry",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil nadu",
  "telangana",
  "tripura",
  "uttar pradesh",
  "uttrakhand",
  "west bengal",
];
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Signup = () => {
  const maxLength = 25;
  const [data, setData] = useState({
    organizationName: "",
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    countryCode: "91",
    domain: "",
    referalCode: "",
  });

  const [touched, setTouched] = useState({
    organizationName: false,
    name: false,
    email: false,
    phoneNo: false,
    address: false,
    domain: false,
    referalCode: false,
  });

  useEffect(() => {
    const checkDomain = async (domain: string) => {
      const checkDomain = await fetch(
        `${base_url}ngo/domain/check?Hide-Loader=true`,
        requestOptions({ website: domain })
      );
      const checkDomainRes = await checkDomain.json();
      return !checkDomainRes.status;
    };
    if (touched.domain && data.domain) {
      checkDomain(data.domain).then((isValid) => {
        if (!isValid) {
          document.getElementById("domain_error")!.innerHTML =
            "Sorry this domain is already taken";
          document.getElementById("domain_error")?.classList.remove("hidden");
          document.getElementById("domain")?.focus();
        } else if (
          !document.getElementById("domain_error")?.classList.contains("hidden")
        ) {
          document.getElementById("domain_error")?.classList.add("hidden");
        }
      });
      setTouched((prev) => ({ ...prev, domain: false }));
    }
  }, [touched.domain, data.domain]);

  const [bools, setBools] = useState({
    founder: false,
    termsAndConditions: false,
    onlineClasses: false,
  });
  const changeHandler = (e: any) => {
    if (
      !document
        .getElementById(`${e.target.id}_error`)
        ?.classList.contains("hidden")
    ) {
      document.getElementById(`${e.target.id}_error`)?.classList.add("hidden");
    }
    if (e.target.id === "domain") {
      const temp = e.target.value.slice(18, e.target.value.length);
      setData({
        ...data,
        [e.target.id]: temp,
      });
    } else {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    }
  };

  const blurHandler = (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    setTouched((prevVal) => {
      return {
        ...prevVal,
        [event.target.id]: true,
      };
    });
  };

  const boolChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !document
        .getElementById(`${e.target.id}_error`)
        ?.classList.contains("hidden")
    ) {
      document.getElementById(`${e.target.id}_error`)?.classList.add("hidden");
    }
    const { id, checked } = e.target;
    setBools({ ...bools, [id]: checked });
  };
  const _setCountryCode = (code: string) => {
    setData({
      ...data,
      countryCode: code,
    });
  };
  const _setAddress = (address: string) => {
    if (
      !document.getElementById(`address_error`)?.classList.contains("hidden")
    ) {
      document.getElementById(`address_error`)?.classList.add("hidden");
    }
    setData({
      ...data,
      address: address,
    });
  };
  const verifyNumber = async () => {
    const tempArr = data.address.split(",");
    const state: any = tempArr[tempArr.length - 2]?.trim().toLowerCase();
    if (!arrayStates.includes(state)) {
      document.getElementById("address_error")!.innerHTML = !state
        ? "Please enter state"
        : "Please enter a valid state";
      document.getElementById("address_error")?.classList.remove("hidden");
      document.getElementById("address")?.focus();
      return;
    }

    if (!bools.termsAndConditions) {
      document.getElementById("termsAndConditions_error")!.innerHTML =
        "Please accept the terms and conditions";
      document
        .getElementById("termsAndConditions_error")
        ?.classList.remove("hidden");
      return;
    }

    // const checkNgoStatus = useCheckNgo(data.organizationName)
    const checkNgo = await fetch(
      `${base_url}ngo/name/${data.organizationName}`
    );
    const ngoNameRes = await checkNgo.json();

    const checkDomain = await fetch(
      `${base_url}ngo/domain/check?Hide-Loader=true`,
      requestOptions({ website: data.domain })
    );
    const checkDomainRes = await checkDomain.json();

    if (!ngoNameRes.status) {
      document.getElementById("organizationName_error")!.innerHTML =
        "Sorry this Name is already taken";
      document
        .getElementById("organizationName_error")
        ?.classList.remove("hidden");
      document.getElementById("organizationName")?.focus();
    }
    if (checkDomainRes.status) {
      document.getElementById("domain_error")!.innerHTML =
        "Sorry this domain is already taken";
      document.getElementById("domain_error")?.classList.remove("hidden");
      document.getElementById("domain")?.focus();
    }

    if (!ngoNameRes.status || checkDomainRes.status) {
      return;
    }

    const body = {
      mobile: `${data.countryCode}-${data.phoneNo.trim()}`,
      email: data.email.trim(),
      reCaptchaToken: "123",
    };
    const signUpUser = await fetch(
      `${base_url}user/ngo/register`,
      requestOptions(body)
    );
    const signupResult = await signUpUser.json();
    if (signupResult.success) {
      localStorage.setItem("userData", JSON.stringify(data));
      Router.push("/ngo-signup-verify");
    } else {
      if (signupResult.mobile) {
        document.getElementById("phoneNo_error")!.innerHTML =
          "Phone Number is already taken";
        document.getElementById("phoneNo_error")?.classList.remove("hidden");
        document.getElementById("phoneNo")?.focus();
      }
      if (signupResult.email) {
        document.getElementById("email_error")!.innerHTML =
          "Email Id is already taken";
        document.getElementById("email_error")?.classList.remove("hidden");
        document.getElementById("email")?.focus();
      }
    }
  };

  const hasReferal =
    data.referalCode.trim() !== "" &&
    !Validate(data.referalCode.trim(), "maxLength 50").isValid;

  const disableVerifyBtn =
    !Validate(data.organizationName.trim(), "isRequired|maxLength 100")
      .isValid ||
    !Validate(data.name.trim(), "isRequired|maxLength 100").isValid ||
    !Validate(data.email.trim(), "isRequired|isMail").isValid ||
    !Validate(data.phoneNo.trim(), "isRequired|isNumberOnly|isPhoneNum")
      .isValid ||
    !Validate(data.address.trim(), "isRequired").isValid ||
    !Validate(data.domain.trim(), "isRequired").isValid ||
    !bools.termsAndConditions ||
    hasReferal;

  return (
    <>
      <SeoHeadComponent {...seoContext.SignUp} />
      <main className="bg-[#f2f2f2] py-[20px] xs:px-[10px] sm:px-[10px]">
        <div
          className="mx-[auto] max-w-[860px] bg-[#fff] p-[7px]"
          style={{ boxShadow: "0 0 20px 0px #bfbdbd" }}
        >
          <Grid container spacing={0}>
            <Grid item xl={5.4} lg={5.4} md={5.4} sm={5.4} xs={12}>
              <div className="h-[100%] bg-[#f2f2f2] pt-[30px]">
                <Image
                  src={SignupLogo}
                  alt="signupLogo"
                  className="mx-auto mb-[40px]"
                />
                <div
                  className="flex flex-wrap items-center justify-between px-[20px] pb-[18px]"
                  style={{ borderBottom: "1px solid #ffffff" }}
                >
                  <div className="font-[muli] text-[0.9rem]">
                    <CallIcon sx={{ fontSize: "1.1rem", mr: "2px" }} />
                    +91 9119333999
                  </div>
                  <div className="font-[muli] text-[0.9rem]">
                    <EmailIcon sx={{ fontSize: "1.1rem", mr: "2px" }} />
                    support@qause.com
                  </div>
                </div>
                <h1 className="my-[50px] text-center font-[muli] text-[1.3rem] font-medium leading-[30px] text-[#253dc0]">
                  Join us to <br />
                  move closer to your mission. <br />
                  FOR FREE! <br />
                  Enabling web presence and <br />
                  showcasing your causes <br />
                  to the world can get you there. <br />
                </h1>
                <div className="mb-[3.1rem] text-center font-[muli] text-[0.9rem] font-light leading-7 text-[#1D1D1B]">
                  We&apos;re here for you. <br />
                  We&apos;re here for a Quase.
                </div>
                <Image src={SignupImage} alt="signupImage" />
              </div>
            </Grid>
            <Grid item xl={6.6} lg={6.6} md={6.6} sm={6.6} xs={12}>
              <div className="px-[20px] py-[37px] md:px-[43px] lg:px-[43px] xl:px-[43px]">
                <div className="mb-[35px] font-[muli] text-[14px]">
                  Fill in your details below and you&apos;re good to go!
                </div>
                <div className="mb-[1.5rem]">
                  <div className="flex items-center">
                    <AccountTreeIcon
                      className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
                      sx={{ fontSize: "2.5rem" }}
                    />
                    <div className="flex h-[40px] w-[100%] items-center rounded-r-sm border-t border-b border-r border-gray-400 px-[1rem] font-[muli] text-[12px] text-[#636363] focus:outline-[#80bdff86]">
                      <input
                        type="text"
                        className="h-full flex-1 outline-0"
                        placeholder="Organization Name *"
                        value={data.organizationName}
                        onChange={changeHandler}
                        maxLength={maxLength}
                        id="organizationName"
                      />
                      <span
                        className={`${
                          maxLength - data.organizationName.length < 6
                            ? "text-red-600"
                            : "text-gray-400"
                        } text-[0.65rem] leading-none`}
                      >
                        {maxLength - data.organizationName.length}/{maxLength}
                      </span>
                    </div>
                  </div>
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="organizationName_error"
                  ></div>
                </div>

                <div className="mb-[1.5rem]">
                  <div className="flex items-center">
                    <PersonIcon
                      className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
                      sx={{ fontSize: "2.5rem" }}
                    />
                    <div className="flex h-[40px] w-[100%] items-center rounded-r-sm border-t border-b border-r border-gray-400 px-[1rem] font-[muli] text-[12px] text-[#636363] focus:outline-[#80bdff86]">
                      <input
                        type="text"
                        className="h-full flex-1 outline-0"
                        placeholder="Contact Person Name *"
                        maxLength={maxLength}
                        value={data.name}
                        onChange={changeHandler}
                        id="name"
                      />
                      <span
                        className={`${
                          maxLength - data.name.length < 6
                            ? "text-red-600"
                            : "text-gray-400"
                        } text-[0.65rem] leading-none`}
                      >
                        {maxLength - data.name.length}/{maxLength}
                      </span>
                    </div>
                  </div>
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="name_error"
                  ></div>
                </div>
                <div className="mb-[1.5rem] flex items-center">
                  <Checkbox
                    {...label}
                    id="founder"
                    value={bools.founder}
                    onChange={boolChangeHandler}
                    sx={{ mr: "10px", px: "0px", py: "0px" }}
                  />
                  <label className="font-[muli] text-[12px]" htmlFor="founder">
                    Are you the Founder?
                  </label>
                </div>
                <div className="mb-[1.5rem]">
                  <InputWithIcon
                    Icon={
                      <EmailIcon
                        className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
                        sx={{ fontSize: "2.5rem" }}
                      />
                    }
                    placeholder="Email ID *"
                    value={data.email}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    id="email"
                    error={
                      touched.email &&
                      !Validate(data.email.trim(), "isRequired|isMail").isValid
                    }
                    helperText={
                      touched.email &&
                      !Validate(data.email.trim(), "isRequired|isMail").isValid
                        ? Validate(data.email.trim(), "isRequired|isMail")
                            .errorMsg
                        : ""
                    }
                  />
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="email_error"
                  ></div>
                </div>
                <div className="mb-[1.5rem]">
                  <InputWithIcon
                    Icon={
                      <>
                        <CallIcon
                          className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
                          sx={{ fontSize: "2.5rem" }}
                        />
                        <CountriesDropdown onChange={_setCountryCode} style="border-r" />
                      </>
                    }
                    placeholder="Mobile Number *"
                    value={data.phoneNo}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    id="phoneNo"
                    error={
                      touched.phoneNo &&
                      !Validate(
                        data.phoneNo.trim(),
                        "isRequired|isNumberOnly|isPhoneNum"
                      ).isValid
                    }
                    helperText={
                      touched.phoneNo &&
                      !Validate(
                        data.phoneNo.trim(),
                        "isRequired|isNumberOnly|isPhoneNum"
                      ).isValid
                        ? Validate(
                            data.phoneNo.trim(),
                            "isRequired|isNumberOnly|isPhoneNum"
                          ).errorMsg
                        : ""
                    }
                  />
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="phoneNo_error"
                  ></div>
                </div>

                <div className="relative mb-[1.2rem]">
                  <AutoComplete
                    id="address"
                    onChange={_setAddress}
                    onBlur={blurHandler}
                    error={
                      touched.address &&
                      !Validate(data.address.trim(), "isRequired").isValid
                    }
                    helperText={
                      touched.address &&
                      !Validate(data.address.trim(), "isRequired").isValid
                        ? Validate(data.address.trim(), "isRequired").errorMsg
                        : ""
                    }
                  />
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="address_error"
                  ></div>
                </div>
                <div className="mb-1 font-[muli] text-[12px]">
                  Choose your custom domain *
                </div>
                <div className="mb-[1.5rem]">
                  <InputWithIcon
                    Icon={
                      <PublicIcon
                        className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
                        sx={{ fontSize: "2.5rem" }}
                      />
                    }
                    placeholder="Enter a Location *"
                    value={`www.qause.com/ngo/${data.domain}`}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    id="domain"
                    error={
                      touched.domain &&
                      !Validate(data.domain.trim(), "isRequired").isValid
                    }
                    helperText={
                      touched.domain &&
                      !Validate(data.domain.trim(), "isRequired").isValid
                        ? Validate(data.domain.trim(), "isRequired").errorMsg
                        : ""
                    }
                  />
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="domain_error"
                  ></div>
                </div>
                <div className="mb-[1.5rem]">
                  <InputWithIcon
                    Icon={
                      <SettingsAccessibilityIcon
                        className="w-fit rounded-l-sm border border-gray-400 bg-[#e9ecef] p-[8px]"
                        sx={{ fontSize: "2.5rem" }}
                      />
                    }
                    placeholder="Enter your referal code"
                    value={data.referalCode}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    id="referalCode"
                    error={
                      touched.referalCode &&
                      !Validate(data.referalCode.trim(), "maxLength 50").isValid
                    }
                    helperText={
                      touched.referalCode &&
                      !Validate(data.referalCode.trim(), "maxLength 50").isValid
                        ? Validate(data.referalCode.trim(), "maxLength 50")
                            .errorMsg
                        : ""
                    }
                  />
                </div>
                <div className="mb-[1rem]">
                  <div className="flex items-center">
                    <Checkbox
                      {...label}
                      className=" mr-2 px-0 py-0"
                      id="termsAndConditions"
                      value={bools.termsAndConditions}
                      onChange={boolChangeHandler}
                    />
                    <label
                      className="font-[muli] text-[14px]"
                      htmlFor="termsAndConditions"
                    >
                      I have read and agreed to the{" "}
                      <span className="cursor-pointer text-[#007ad9]">
                        {" "}
                        terms of service
                      </span>
                    </label>
                  </div>
                  <div
                    className="mt-1 hidden text-[14px] text-[#ff0000a3]"
                    id="termsAndConditions_error"
                  ></div>
                </div>

                <button
                  className="mb-[1.5rem] w-[100%] rounded-md bg-[#253dc0] py-[20px] text-center font-[muli] text-[1.2rem] text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                  style={{
                    boxShadow:
                      "0 0.6em 0.6em -0.2em rgb(0 0 0 / 30%) !important",
                  }}
                  onClick={verifyNumber}
                  disabled={disableVerifyBtn}
                >
                  Verify Your Number
                </button>
                <div className="text-center font-[muli] text-[14px] text-[#6d7073]">
                  Already have an account?{" "}
                  <Link href={"/ngo-login"}>
                    <span className="cursor-pointer text-[#212529]">
                      Sign in
                    </span>
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </>
  );
};

export default Signup;
