import { Stack, Typography } from "@mui/material";
import React, { use, useState } from "react";
interface EditableBillingInfoProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  onSubmit?: (
    name: string,
    address: string,
    phone: string,
    email: string
  ) => void;
}
const EditableBillingInfo = (props: EditableBillingInfoProps) => {
  const [name, setName] = useState<string>(props.name || "");
  const [address, setAddress] = useState<string>(props.address || "");
  const [phone, setPhone] = useState<string>(props.phone || "");
  const [email, setEmail] = useState<string>(props.email || "");
  return (
    <div>
      <p className="font-extrabold">Billing Information</p>
      <div>
        <div className=" flex flex-row items-center gap-[150px]">
          <div>
            <p className="text-[#767D89]">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={props.name}
              className="border-2"
            />
          </div>
          <div className="my-3">
            <p className="text-[#767D89]">Address</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={props.address}
              className="border-2"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[40px]">
          <div className="my-3">
            <p className="text-[#767D89]">Phone Number</p>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={props.phone}
                className="border-2"
              />
              <div className="h-33 p-[8.386px 14.664px 6.614px 16.336px] mb-2 ml-2 mt-2 w-fit flex-shrink-0 items-center justify-center rounded-lg bg-orange-200 bg-opacity-30 px-2 py-1">
                <p className="font-inter pt-1.2 text-center text-base font-semibold text-orange-500">
                  Verify OTP
                </p>
              </div>
            </div>
          </div>
          <div className="my-3">
            <p className="text-[#767D89]">Email Id</p>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={props.email}
                className="border-2"
              />
              <div className="h-33 p-[8.386px 14.664px 6.614px 16.336px] mb-2 ml-2 mt-2 w-fit flex-shrink-0 items-center justify-center rounded-lg bg-orange-200 bg-opacity-30 px-2 py-1">
                <p className="font-inter pt-1.2 text-center text-base font-semibold text-orange-500">
                  Verify OTP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          props.onSubmit && props.onSubmit(name, address, phone, email)
        }
      >
        Update
      </button>
    </div>
  );
};

export default EditableBillingInfo;
