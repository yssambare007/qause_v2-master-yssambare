import { AUTHENTICATION } from "../../../constants/url.links";
import { base_url, requestOptions } from "../../../utils/utils";
import {
  loginType,
  loginTypeWithEmail,
  otpRequestType,
  otpRequestTypeEmail,
  SignupType,
} from "../../types/models";

export const _login_ = async (body: loginType | loginTypeWithEmail) => {
  const res = await fetch(
    base_url.concat(AUTHENTICATION.LOGIN),
    requestOptions(body)
  );
  return await res.json();
};

export const _otp_ = async (body: otpRequestType | otpRequestTypeEmail) => {
  const res = await fetch(
    base_url.concat(AUTHENTICATION.OTP),
    requestOptions(body)
  );
  return await res.json();
};

export const _checkNgo_ = async (ngoName: string) => {
  const res = await fetch(base_url.concat(AUTHENTICATION.CHECKNGO, ngoName));
  return await res.json();
};

export const _ngo_signup_verify_ = async (body: SignupType) => {
  const res = await fetch(
    base_url.concat(AUTHENTICATION.SIGNUP_VERIFY),
    requestOptions(body)
  );
  return await res.json();
};

export const _fetch_lat_lng_ = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyC13QmK3KBCp9mNECJc5GWB9nawwXLoxbc`
  );
  const data = await response.json();
  const lat = data.results[0].geometry.location.lat;
  const lng = data.results[0].geometry.location.lng;
  return { lat, lng };
};

export const _volunteerSignUp = async (body: any) => {
  const res = await fetch(
    base_url.concat(AUTHENTICATION.VOLUNTEER_SIGNUP),
    requestOptions(body)
  );
  return await res.json();
};

export const _volunteerSignUpVerify = async (body: any) => {
  const res = await fetch(
    base_url.concat(AUTHENTICATION.VOLUNTEER_SIGNUP_VERIFY),
    requestOptions(body)
  );
  return await res.json();
};
