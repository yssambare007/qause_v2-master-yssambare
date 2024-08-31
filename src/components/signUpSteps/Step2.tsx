import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import SignupNavbar from "../signUp/SignupNavbar";
import Image from "next/image";
import CountriesDropdown from "../countryDropDown/CountriesDropdown";
import OutsideClickHandler from "react-outside-click-handler";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { phone } from "phone";

interface Props {
  onChangeStep?: (step: number) => void;
  sendStep2Data?: (obj: any) => void;
  step2Info?: any;
}

const Step2 = (props: Props) => {
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const [year, setYear] = useState("Select year");
  const [isYearRequired, setIsYearRequired] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberRequired, setIsPhoneNumberRequired] = useState(false);

  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [countryCode, setCountryCode] = useState<string>("91-");
  const _setCountryCode = (code: string) => {
    setCountryCode(code.concat(""));
  };

  const phoneNumberRegex = /^\d{0,10}$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  let error = false;

  const currentYear = new Date().getFullYear();
  const yearOptions = [];

  for (let i = 1900; i <= currentYear; i++) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const onChangePhoneNumber = (e: any) => {
    if (phoneNumberRegex.test(e.target.value)) {
      setFlag(true);
      setPhoneNumber(e.target.value);
    }
  };

  const onChangeEmail = (e: { target: { value: string } }) => {
    setEmail(e.target.value);

    if (emailRegex.test(email)) {
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
    }
  };

  useEffect(() => {
    if (props.step2Info) {
      {
        props.step2Info.email && setEmail(props.step2Info.email);
      }
      {
        props.step2Info.phoneNumber &&
          setPhoneNumber(props.step2Info.phoneNumber);
      }
      {
        props.step2Info.year && setYear(props.step2Info.year);
      }

      {
        props.step2Info.socialMedia &&
          setSocialMedia({
            ...socialMedia,
            facebook: props.step2Info.socialMedia.facebook.split("com/")[1],
            youtube: props.step2Info.socialMedia.youtube.split("com/")[1],
            instagram: props.step2Info.socialMedia.instagram.split("com/")[1],
          });
      }
    }
  }, []);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const number: any = "+" + countryCode.split("-")[0] + phoneNumber;

    if (flag && phoneNumber.length === 10 && phone(number).isValid) {
      setIsPhoneNumberRequired(false);
    } else if (flag) {
      setIsPhoneNumberRequired(true);
    }
  }, [phoneNumber, flag]);

  const checkValid = () => {
    if (email === "" || !emailRegex.test(email)) {
      setIsEmailInvalid(true);
      error = true;
    }

    const number: any = "+" + countryCode.split("-")[0] + phoneNumber;

    if (!phone(number).isValid) {
      setIsPhoneNumberRequired(true);
      error = true;
    } else {
      setIsPhoneNumberRequired(false);
    }

    if (year === "Select year") {
      setIsYearRequired(true);
      error = true;
    }
  };

  const changeStep = (step: number) => {
    if (step === 3) {
      checkValid();

      if (!error) {
        const step2Data = {
          email: email,
          phoneNumber: phoneNumber,
          year: year,
          socialMedia: {
            facebook: "www.facebook.com/" + socialMedia.facebook,
            instagram: "www.instagram.com/" + socialMedia.instagram,
            youtube: "www.youtube.com/" + socialMedia.youtube,
          },
          key: 2027,
        };
        if (props.sendStep2Data) {
          props.sendStep2Data(step2Data);
          if (props.onChangeStep) {
            props.onChangeStep(step);
          }
        }
      }
    } else {
      if (props.onChangeStep) {
        props.onChangeStep(step);
      }
    }
  };

  return (
    <div className="relative">
      <SignupNavbar />
      <div className="mx-[20px] flex flex-col justify-between pt-[30px] sm:px-[10px] lg:mx-[75px] lg:flex-row">
        <div className="flex flex-col sm:flex-row lg:mr-[60px]">
          {/* Progress Bar */}
          <div className="mr-[80px] mt-[120px] xs:m-auto xs:mb-[-124px] xs:mt-[-121px] xs:rotate-[-90deg]">
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#1c6102]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
              <DoneIcon sx={{ color: "#1c6102" }} className="xs:rotate-90" />
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
          </div>

          <div className="sm:w-[75%]">
            <h2 className="pb-[30px] text-[27px] font-normal lg:max-w-[440px] xl:max-w-[478px]">
              Lets get started to making your NGO Page. All the data below will
              be visible to Public.
            </h2>

            <div className="text-[28px] font-medium">
              Essential information:
            </div>

            {/* Public Email ID */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Public email ID*
              </p>

              <div className="relative flex h-[30px] items-center border-b border-l border-r border-t border-gray-400 px-[13px] py-[25px] lg:min-w-[440px] xl:min-w-[478px]">
                <input
                  value={email}
                  onChange={onChangeEmail}
                  className="w-full outline-none"
                  placeholder="Enter Public Email Id"
                />
              </div>

              {isEmailInvalid &&
                (email.length == 0 ? (
                  <div className="text-[14px] text-red-500">
                    Email is Required
                  </div>
                ) : (
                  <div className="text-[14px] text-red-500">
                    Email is Invalid
                  </div>
                ))}
            </div>

            {/* Public Phone no. */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Public Phone no.*
              </p>

              <div className="relative flex h-[30px] items-center border-b border-l border-r border-t border-gray-400 py-[25px] pr-[13px] lg:min-w-[440px] xl:min-w-[478px]">
                <span className="">
                  <CountriesDropdown
                    height="h-[50px]"
                    style={"h-[50px] text-center border-r py-6"}
                    onChange={_setCountryCode}
                  ></CountriesDropdown>
                </span>
                <input
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  className="ml-[10px] w-full outline-none"
                  maxLength={10}
                />
              </div>

              {isPhoneNumberRequired &&
                (phoneNumber === "" ? (
                  <div className="text-[14px] text-red-500">
                    Phone Number is required
                  </div>
                ) : (
                  <div className="text-[14px] text-red-500">
                    Phone Number is Invalid
                  </div>
                ))}
            </div>

            {/* Foundation Year */}
            <div className="relative">
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Foundation Year*
              </p>

              <OutsideClickHandler
                onOutsideClick={() => setIsCategoryDropdownOpen(false)}
              >
                <div
                  className="relative flex h-[30px] cursor-pointer items-center justify-between border-b border-l border-r border-t border-gray-400 px-[13px] py-[25px] lg:min-w-[440px] xl:min-w-[478px]"
                  onClick={() => setIsCategoryDropdownOpen(true)}
                >
                  <p>{year}</p>
                  <KeyboardArrowDownIcon />
                </div>

                {isCategoryDropdownOpen && (
                  <div
                    className={`absolute left-0 top-[91px] z-50 max-h-[200px] w-full overflow-scroll overflow-x-hidden border bg-[#fff] lg:w-[107%]`}
                  >
                    {yearOptions.map((ye: any) => {
                      return (
                        <div
                          className="cursor-pointer py-1 pl-4 text-[15px] font-normal hover:bg-[#eaeaea]"
                          key={ye}
                          onClick={() => {
                            if (
                              !document
                                .getElementById("year_error")
                                ?.classList.contains("hidden")
                            ) {
                              document
                                .getElementById("year_error")
                                ?.classList.add("hidden");
                            }
                            setIsCategoryDropdownOpen(false);
                            setYear(ye.key);
                          }}
                        >
                          {ye}
                        </div>
                      );
                    })}
                  </div>
                )}
              </OutsideClickHandler>

              {isYearRequired && year === "Select year" && (
                <div className="text-[14px] text-red-500">Year is required</div>
              )}
            </div>

            {/* Social Media Info */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Social media info.
              </p>

              <div className="relative mb-4 flex h-[30px] items-center border-b border-l border-r border-t border-gray-400 px-[13px] py-[25px] lg:min-w-[440px] xl:min-w-[478px]">
                <Image
                  height="30"
                  width="30"
                  alt="facebook"
                  src="/images/fb.png"
                />

                <p className="ml-2">www.facebook.com/</p>

                <input
                  value={socialMedia.facebook}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      facebook: e.target.value || "",
                    })
                  }
                  className="ml-3 w-full outline-none"
                />
              </div>

              <div className="relative mb-4 flex h-[30px] items-center border-b border-l border-r border-t border-gray-400 px-[13px] py-[25px] lg:min-w-[440px] xl:min-w-[478px]">
                <Image
                  height="30"
                  width="30"
                  alt="instagram"
                  src="/images/insta.png"
                />

                <p className="ml-2">www.instagram.com/</p>

                <input
                  value={socialMedia.instagram}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      instagram: e.target.value || "",
                    })
                  }
                  className="ml-3 w-full outline-none"
                />
              </div>

              <div className="relative mb-4 flex h-[30px] items-center border-b border-l border-r border-t border-gray-400 px-[13px] py-[25px] lg:min-w-[440px] xl:min-w-[478px]">
                <Image
                  height="30"
                  width="30"
                  alt="youtube"
                  src="/images/video.png"
                />

                <p className="ml-2">www.youtube.com/</p>

                <input
                  value={socialMedia.youtube}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      youtube: e.target.value || "",
                    })
                  }
                  className="ml-3 w-full outline-none"
                />
              </div>
            </div>

            <div className="mb-8 mt-12 flex justify-between">
              <Image
                className="rotate-180 cursor-pointer"
                height="70"
                width="70"
                alt=""
                src="/images/submit-btn.png"
                onClick={() => changeStep(1)}
              />

              <Image
                className="cursor-pointer"
                height="70"
                width="70"
                alt=""
                src="/images/submit-btn.png"
                onClick={() => changeStep(3)}
              />
            </div>

            <span className="text-xl font-normal">
              * Indicated required fields
            </span>
          </div>
        </div>

        <div className="pt-[30px] text-right">
          <Image
            className="h-auto w-auto"
            alt=""
            height="400"
            width="400"
            src="/images/step-2bg.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
