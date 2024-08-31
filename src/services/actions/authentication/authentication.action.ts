import {
  loginResponse,
  LoginSuccess,
  loginType,
  loginTypeWithEmail,
  otpRequestType,
  otpRequestTypeEmail,
  checkNgoSuccess,
  SignupType,
  volunteerOtpVerifyResponse,
} from "../../types/models";
import { AUTHENTICATION } from "../../../constants/url.links";
import { useQuery } from "react-query";
import {
  _checkNgo_,
  _fetch_lat_lng_,
  _login_,
  _ngo_signup_verify_,
  _otp_,
  _volunteerSignUp,
  _volunteerSignUpVerify,
} from "./fetch";
import { UES_QUERY_REQUEST_OPTION } from "../../../constants/constants";

// Login API call
export const useLogin = (body: loginType | loginTypeWithEmail) => {
  return useQuery<loginResponse, any>(
    AUTHENTICATION.LOGIN,
    () => _login_(body),
    UES_QUERY_REQUEST_OPTION
  );
};

// OPT API Call
export const useOtp = (body: otpRequestType | otpRequestTypeEmail) => {
  return useQuery<LoginSuccess, any>(
    AUTHENTICATION.OTP,
    () => _otp_(body),
    UES_QUERY_REQUEST_OPTION
  );
};

//check NGO

export const useCheckNgo = (ngoName: string) => {
  return useQuery<checkNgoSuccess, any>(
    AUTHENTICATION.CHECKNGO,
    () => _checkNgo_(ngoName),
    UES_QUERY_REQUEST_OPTION
  );
};

export const useNgosignupVerify = (body: SignupType) => {
  return useQuery<LoginSuccess, any>(
    AUTHENTICATION.SIGNUP_VERIFY,
    () => _ngo_signup_verify_(body),
    UES_QUERY_REQUEST_OPTION
  );
};

export const useFetchLatLng = (address: string) => {
  return useQuery<any, any>(
    AUTHENTICATION.LAT_LNG,
    () => _fetch_lat_lng_(address),
    UES_QUERY_REQUEST_OPTION
  );
};

export const useVolunteerSignup = (body: any) => {
  return useQuery<any, any>(
    AUTHENTICATION.VOLUNTEER_SIGNUP,
    () => _volunteerSignUp(body),
    UES_QUERY_REQUEST_OPTION
  );
};

export const useVolunteerSignupVerify = (body: any) => {
  return useQuery<volunteerOtpVerifyResponse, any>(
    AUTHENTICATION.VOLUNTEER_SIGNUP_VERIFY,
    () => _volunteerSignUpVerify(body),
    UES_QUERY_REQUEST_OPTION
  );
};
