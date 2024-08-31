import { END_POINTS } from "./endpoints";

export const EMPTY_STRING = "";
export const TOKEN = "TOKEN";
export const NGO_ID = "NGO_ID";
export const UES_QUERY_REQUEST_OPTION = {
  enabled: false,
  // staleTime: 0,
  cacheTime: 0,
};
export const GENERAL_DETAILS = "General Details";
export const BENEFICIARY_NAME = "Beneficiary Name";
export const BANK_NAME = "Bank Name";
export const ACCOUNT_NUMBER = "Account Number";
export const IFSC_CODE_NUMBER = "IFSC Code Number";
export const BRANCH_LOCATION = "Branch Location";
export const UPLOAD_DETAILS = "Upload Details";
export const UPLOAD_CERTIFICATE = "Upload certificate";
export const REUPLOAD = "Re-Upload";
export const TRUST_CERTIFICATE = "Trust Certificate";
export const PAN = "Pan";
export const UPLOAD_PAN = "Upload Pan";
export const CERTIFICATES = "Certificates";
export const UPLOAD_YOUR_12_A_CERTIFICATE = "Upload Your 12 A Certificate";
export const UPLOAD_YOUR_FCRA_CERTIFICATE = "Upload Your FCRA Certificate";
export const UPLOAD_YOUR_80G_CERTIFICATE = "Upload Your 80G Certificate";
export const AUDIT_REPORT = "Audit Report";
export const UPLOAD_YOUR_AUDIT_REPORT = "Upload your Audit Report";
export const CANCELLED_CHEQUE = "Cancelled Cheque";
export const UPLOAD_CANCELLED_CHEQUE = "Upload Cancelled Cheque";
export const OTHER = "Other";

export const MOBILE = "mobile";
export const EMAIL = "email";
export const ROUTE_VOLUNTEER_LOGIN = "/volunteer-login";
export const SIGN_IN = "Sign in";
export const HAVE_AN_ACC = "Already have an account ?";
export const WELCOME = "Welcome to Qause";
export const SIGNUP_VERIFY_SUBTITLE = "Let your passion serve the cause";
export const ROUTE_SIGNUP_PERSONAL_DETAIL = "/volunteer-signup-personal-detail";
export const SIGN_UP_QUASE = "Signup with Qause";
export const ROUTE_VOLUNTEER_SIGNUP_VERIFY = "/volunteer-signup-verify";
export const ERROR = "error";
export const ROUTE_VOLUNTEER_SIGNUP = "/volunteer-signup";

export const myProfileLinks = {
  about: { name: "About", secPath: END_POINTS.ABOUT_NGO },
  founder: { name: "Founder", secPath: END_POINTS.ABOUT_FOUNDER },
  bank: { name: "Bank Details", secPath: END_POINTS.BANK },
  credit: { name: "Credit", secPath: END_POINTS.CREDITS },
  transaction: { name: "Transactions", secPath: END_POINTS.TRANSACTIONS },
  accountSettings: {
    name: "Account Settings",
    secPath: END_POINTS.ACCOUNT_SETTINGS,
  },
};
