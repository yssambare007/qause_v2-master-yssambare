import { useEffect, useState } from "react";
import CountriesDropdown from "../../countryDropDown/CountriesDropdown";

interface Payload {
  mobile?: string;
  email?: string;
}

interface InputError {
  status: boolean;
  message: string;
}

function validEmail(e: string) {
  const filter =
    /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
}

export default function PhoneEmail({ onChange }: any) {
  const [isPhoneInput, setIsPhoneInput] = useState(true);
  const [countryCode, setCountryCode] = useState<string>("91-");
  const [payload, setPayload] = useState<Payload>({});
  const [error, setError] = useState<InputError>({
    status: false,
    message: "",
  });
  const _setCountryCode = (code: string) => {
    setCountryCode(code.concat("-"));
  };
  useEffect(() => {
    if (onChange) {
      onChange(payload);
    }
  }, [payload]);
  const onMobileChange = (e: any) => {
    const phone = e.target.value.trim();
    setPayload(() => ({}));
    if (phone === "") {
      setError(() => ({
        status: true,
        message: "Phone number is required",
      }));
      return;
    }
    if (phone.length !== 10) {
      setError(() => ({
        status: true,
        message: "Enter a valid phone number",
      }));
      return;
    }
    setError(() => ({
      status: false,
      message: "",
    }));
    setPayload(() => ({
      mobile: countryCode.concat(phone),
    }));
  };

  function onEmailChange(e: any) {
    const Email = e.target.value.trim();
    setPayload(() => ({}));
    if (Email === "") {
      setError(() => ({
        status: true,
        message: "Email number is required",
      }));
      return;
    }
    if (!validEmail(Email)) {
      setError(() => ({
        status: true,
        message: "Enter a valid email",
      }));
      return;
    }
    setError(() => ({
      status: false,
      message: "",
    }));
    setPayload(() => ({
      email: e.target.value,
    }));
  }

  function changeInputType() {
    setError(() => ({
      status: false,
      message: "",
    }));
    setIsPhoneInput(!isPhoneInput);
  }

  return (
    <div className="flex w-full items-center justify-center p-1">
      <div className="w-full text-gray-600">
        <span className="font-bold">{isPhoneInput ? "Phone" : "Email"}</span>
        <div
          className={`my-[10px] flex items-center gap-x-1 ${
            isPhoneInput ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center">
            <CountriesDropdown
              height="h-[50px]"
              onChange={_setCountryCode}
            ></CountriesDropdown>
          </div>
          <input
            type="number"
            className="h-[30px] w-full rounded-md border border-gray-400 px-[1rem] py-6 font-[muli] text-[12px] text-base text-[#636363] invalid:border-red-500 focus:outline-[#80bdff86]"
            onChange={onMobileChange}
            placeholder="Your Mobile Number"
          />
        </div>
        <div
          className={`my-[10px] flex w-full items-center ${
            isPhoneInput && "hidden"
          }`}
        >
          <input
            className="h-[30px] w-full rounded-md border px-4 py-6 text-base outline-1 outline-blue-300"
            type="email"
            placeholder="Enter email address"
            onChange={onEmailChange}
            required
          />
        </div>
        {error.status && (
          <div className="flex items-center text-red-600">{error.message}</div>
        )}
        <div className="flex justify-end">
          <span
            className="cursor-pointer text-right text-sm font-medium text-qause-blue"
            onClick={changeInputType}
          >
            {!isPhoneInput ? "Phone" : "Email"}
          </span>
        </div>
      </div>
    </div>
  );
}
