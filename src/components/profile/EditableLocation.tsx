import React, { useState } from "react";
import LocationIcon from "./../../../public/images/profile/location.svg";
interface EditableLocationProps {
  address: string;
  state: string;
  city: string;
  country: string;
  subCategory: string;
  category: string;
  facility: string;
  onSubmit?: (
    address: string,
    state: string,
    city: string,
    country: string,
    subCategory: string,
    category: string,
    facility: string
  ) => void;
}
const EditableLocation = (props: EditableLocationProps) => {
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [facility, setFacility] = useState("");
  return (
    <>
      <div>
        <div className="mt-4 inline-flex items-center justify-center rounded-full bg-[#253DC0] px-6 py-2">
          <LocationIcon />
          <div className="pb -1 ms-3 text-white">Use My Location</div>
        </div>
        <div className="ms-3">
          <p>or</p>
          <p>Enter Location Manually</p>
          <div className="grid grid-cols-3 justify-center gap-0.5">
            <div className="my-3 ml-1">
              <p className="text-[#767D89]">Address</p>
              <label htmlFor="Address"></label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
            <div className="ml-0.25 my-3 justify-start">
              <p className="text-[#767D89]">State</p>
              <label htmlFor="State"></label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
            <div className="my-3 ml-1">
              <p className="text-[#767D89]">City</p>
              <label htmlFor="City"></label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
            <div className="ml-0.25 my-3">
              <p className="text-[#767D89]">Country</p>
              <label htmlFor="Country"></label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
            <div className="ml-0.25 my-3">
              <p className="text-[#767D89]">Sub Category</p>
              <label htmlFor="Sub Category"></label>
              <input
                type="text"
                id="sub category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
            <div className="ml-0.25 my-3">
              <p className="text-[#767D89]">Facility</p>
              <label htmlFor="Facility"></label>
              <input
                type="text"
                id="facility"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
            <div className="ml-0.25 my-3">
              <p className="text-[#767D89]">Category</p>
              <label htmlFor="Category"></label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mb-2 border-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" block flex justify-center">
        <button
          onClick={() => {
            props.onSubmit &&
              props.onSubmit(
                address,
                state,
                city,
                country,
                subCategory,
                category,
                facility
              );
          }}
          className="flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] font-bold text-white"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditableLocation;
