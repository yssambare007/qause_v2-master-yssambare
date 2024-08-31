export interface loginType {
  ngomobile: string;
}

export interface volunteerSignUpPayload{
  mobile?:string | null;
  email?:string | null;
  otp?:string;
}

export interface signUpResponse {
  success: boolean;
  data: string;
}

export interface ErrorType{
  success:boolean
  error:string
}

export interface volunteerOtpVerifyResponse{
  success:boolean;
  data:{
    token:string;
    profilePicture:string;
    isMobileVerified:boolean;
    isEmailVerified:boolean;
  };
}

export interface loginTypeWithEmail {
  ngoemail: string;
}
export interface otpRequestType {
  ngomobile: string;
  otp: string;
}
export interface otpRequestTypeEmail {
  ngoemail: string;
  otp: string;
}
export interface optType {
  otpArr: string[];
  data: otpRequestType | otpRequestTypeEmail;
}

export interface LoginSuccess {
  success: boolean;
  token: string;
}

export interface loginResponse {
  success: boolean;
  data: string;
  email?: string;
  mobile?: string;
}

export interface checkNgoSuccess {
  status: boolean;
  message: string;
}

export interface SignupType {
  name: string;
  contactPerson: string;
  email: string;
  mobile: string;
  formattedAddress: string;
  countryCode: string;
  website: string;
  referalCode: string;
  otp: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  long: number;
}

export interface storyResponse {
  id: string;
  resolution: string;
  storyDetails: {
    desc: string;
    image: {
      secondary: Array<string>;
      primary: string;
    };
    ngoID: string;
    tag: Array<string>;
    title: string;
  };
}

export interface profileInfoData{
  label:string;
  value:string;
}

export interface updateProfileData {
  publicEmail: profileInfoData;
  publicMobile: profileInfoData;
  ownWebsite: profileInfoData;
 country: profileInfoData;
 state: profileInfoData;
  category: profileInfoData;
  subCategories: profileInfoData;
  facilities: profileInfoData;
  facebook: profileInfoData;
  twitter: profileInfoData;
  instagram: profileInfoData;
  linkedIn:profileInfoData;
  ngoEmail:profileInfoData;
  city:profileInfoData;
  address:profileInfoData;
  name:profileInfoData;
  registeredEmailId:profileInfoData;
  ngoWebsite:profileInfoData;
  registeredNumber:profileInfoData;
}

export interface contactType {
  label: string;
  value: string;
  body:string;
  bodyType:keyof ngoDetailsInitialType;
}

export interface updateImageData {
  aboutNgo: string;
  coverImage: string;
  imgFile?:File;
}

export interface ResponseDocType {
  ticketId: string;
  fileLocation: string;
  number?: string;
  status: string;
  remarks: any[];
}
export  interface socialMediaIcon{
  name:string;
  icon:React.ReactNode;
  body:keyof typeof ngoDetailsInitial;
  // value:string;
}

export interface CategoryType{
  _id:string;
  name:string;
  subCategories:string[];
}

export interface ngoDetailsInitialType {
  facebook:  string;
    twitter: string;
    instagram: string; 
    linkedin: string;
    street:string;
    city:string;
    state:string;
    country:string;
    facilities:string;
    categories:string;
    subCategories:string;
    mobile:string,
    email:string,
    publicEmail:string,
    publicMobile:string,
    ownWebsite:string,
}

export const ngoDetailsInitial:ngoDetailsInitialType = {
  "facebook": "",
  "twitter":"",
  "instagram": "",
  "linkedin":"",
  "street":"",
  "city":"",
  state:"",
  country:"",
  mobile:"",
  email:"",
  publicEmail:"",
  publicMobile:"",
  ownWebsite:"",
  categories:"",
  subCategories:"",
  facilities:"",
};
