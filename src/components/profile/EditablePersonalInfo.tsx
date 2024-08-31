import { Modal } from "@mui/material";
import React, { ChangeEvent, useRef, KeyboardEvent, useEffect } from "react";
import { useState } from "react";
import VolunteerVeirfyCard from "../common/VolunteerVeirfyCard";
import { EMPTY_STRING } from "../../constants/constants";
interface EditablePersonalInfoProps {
  name: string;
  gender: string;
  email: string;
  phone: string;
  DOB: string;
  onSubmit?: (
    name: string,
    DOB: string,
    email: string,
    gender: string,
    phone: string
  ) => void;
  emailVerify:(email:string)=>void;
}

interface OtpInputProps {
  cancel: ()=> void;
  to: string
  verify:(email:string, otp:string, )=> void;
}

const OtpInput = (props: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const {cancel, to, verify} = props;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Add your verification logic here
    // verify && verify(to, otp.join(""));
  };
  const handleCancel = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(60);
    inputRefs.current[0]?.focus();
    cancel()
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/3 mx-auto p-4 bg-white shadow-md rounded my-[15%]">
      <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
      <p className="mb-4">Please enter the OTP sent to {to && to}</p>
      <div className="flex space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <div className="mb-4">
        <span className="text-red-500">{timeLeft > 0 ? `Time left: ${timeLeft}s` : 'OTP expired'}</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleVerify}
          disabled={timeLeft === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Verify
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const EditablePersonalInfo = (props: EditablePersonalInfoProps) => {
  const [name, setName] = useState(props.name || "John Doe");
  const [email, setEmail] = useState(props.email || "www.xyz@gmail.com");
  const [phone, setPhone] = useState(props.phone || "8928878973");
  const [DOB, setDOB] = useState(props.DOB || "");
  const [gender, setGender] = useState(props.gender || "");
  const [showOTPScreen, setShowOTPScreen] = useState<boolean>(false);
  const [showOTPScreenMobile, setShowOTPScreenMobile] = useState<boolean>(false);

  const handleEmail = () => {
    setShowOTPScreen(true);
    props.emailVerify(email)
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-x-40">
        <div className="my-3">
          <p className="text-[#767D89]">Name</p>
          <label htmlFor="name"></label>
          <input
            id="name"
            placeholder={props.name || "John Doe"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 border-2"
          />
        </div>
        <div className="my-3">
          <p className="text-[#767D89]">Date of Birth</p>
          <label htmlFor="DOB"></label>
          <input
            id="DOB"
            placeholder={props.DOB || ""}
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            className="mb-2 border-2"
          />
        </div>
        <div className="my-3 flex-auto">
          <p className="text-[#767D89]">Email Id</p>
          <label htmlFor="email"></label>
          <div className="flex items-center gap-1">
            <input
              id="email"
              placeholder={props.email || "www.xyz@gmail.com"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 border-2"
            />
            <div className="h-33 p-[8.386px 14.664px 6.614px 16.336px] mb-2 ms-1 flex w-40 flex-shrink-0 items-center justify-center rounded-lg bg-orange-200 bg-opacity-30">
              <p
                onClick={handleEmail}
                className="font-inter cursor-pointer text-center text-base font-semibold text-orange-500"
              >
                Verify OTP
              </p>
            </div>
          </div>
        </div>
        <div className="my-3">
          <p className="text-[#767D89]">Gender</p>
          <label htmlFor="gender">{gender}</label>
          <select
            className="m-5"
            id="gender"
            value={props.gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male" onClick={() => setGender("Male")}>
              Male
            </option>
            <option value="female" onClick={() => setGender("Female")}>
              Female
            </option>
            <option value="other" onClick={() => setGender("Other")}>
              Other
            </option>
          </select>
        </div>
        <div className="my-3">
          <p className="text-[#767D89]">Mobile Number</p>
          <label htmlFor="phone"></label>
          <div className="flex items-center gap-1">
            <input
              id="phone"
              placeholder={props.phone || "8928878973"}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-2 border-2"
            />
            <div className="h-33 p-[8.386px 14.664px 6.614px 16.336px] mb-2 flex w-40 flex-shrink-0 items-center justify-center rounded-lg bg-orange-200 bg-opacity-30">
              <p onClick={() => setShowOTPScreenMobile(true)} className="cursor-pointer font-inter text-center text-base font-semibold text-orange-500">
                Verify OTP
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" block flex justify-center">
        <button
          onClick={() => {
            props.onSubmit && props.onSubmit(name, DOB, email, gender, phone);
          }}
          className="flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] font-bold text-white"
        >
          Save Changes
        </button>
      </div>

      <Modal onClose={() => setShowOTPScreen(false)} open={showOTPScreen}>
          <OtpInput verify={props.emailVerify} to={email} cancel={()=>setShowOTPScreen(false)} />
      </Modal>
      <Modal onClose={() => setShowOTPScreenMobile(false)} open={showOTPScreenMobile}>
          <OtpInput verify={props.emailVerify} to={phone} cancel={()=>setShowOTPScreenMobile(false)} />
      </Modal>
    </>
  );
};

export default EditablePersonalInfo;
