/**
 * Created need
 */

interface GigCard {
  _id: string;
  type: "multipleVolunteering" | "singleVolunteering" | "fundraising";
  title: string;
  logo: string;
  timeNeeded: number;
  createdAt: string;
  category: string;
  ngo: {
    _id: string;
    name: string;
    logo: string;
    state: string;
    country: string;
    website: string;
  };
  requests: VolunteerDetails[];
}

export interface MultipleVolunteeringType extends GigCard {
  type: "multipleVolunteering";
  questionValues: {
    isCurrentLogo: boolean;
    tagLine: string;
    requirements: string;
    inspirations: string[];
    isFeatured: boolean;
    currentLogo: string[];
    website: string;
    facebook: string;
    instagram: string;
    contactPerson: string;
    contactNumber: string;
    needId: string;
    needTitle: string;
  };
}
export interface SingleVolunteeringType extends GigCard {
  type: "singleVolunteering";
  questionValues: {
    isCurrentLogo: boolean;
    tagLine: string;
    requirements: string;
    inspirations: string[];
    isFeatured: boolean;
    currentLogo: string[];
    website: string;
    facebook: string;
    instagram: string;
    contactPerson: string;
    contactNumber: string;
    needId: string;
    needTitle: string;
  };
}

export interface FundraisingType extends GigCard {
  type: "fundraising";
  donates: number;
  supporters: number;
  questionValues: {
    needId: string;
    fundraiserTitle: string;
    deliverable: string;
    amount: number;
    fundraiserVideo: string;
    contactPerson: string;
    contactNumber: string;
    isFeatured: boolean;
    needTitle: string;
  };
}

export interface VolunteerDetails {
  volunteerId: string;
  volunteerAvatar: string;
  volunteerName: string;
  volunteerEmail: string;
  isMobile: boolean;
  volunteerGender: string;
  languageKnown: string[];
  points: number;
  passions: string[];
  address: {
    state: string;
    country: string;
  };
}


interface HistoryNeedCard{
  _id: string;
  category: string;
  createdAt: string;
  type: string;
  title: string;
  ticketId: string;
  request: object;
  isApplied: boolean;
  logo: string;
  isCompleted: boolean;
  creditRequired: number;
  eventLocation: string;
  numberOfVolunteer: number;
  donates: number;
  requests: number;
  supporters: number;
}

export interface ExtendCardType extends HistoryNeedCard { 
  qauseDisable: boolean;
}

export interface FulfilledCardType extends HistoryNeedCard {
  completedDate: string;
}

/**
 * Dashboard
 */
export interface NeedServiceDataMini {
  _id: string;
  title: string;
  logo: string;
  creditRequired: number;
  category: string;
  desc: string;
}

export interface StepCardProps {
  stepNo: number;
  title: string;
}

/**
 * Service page
 */

export interface NeedServiceQuestion {
  title: string;
  VolunteerTitle: string;
  show: boolean;
  desc: string;
  note: string;
  displayType : string;
  url: string;
  key: string;
  mutli: boolean; //TODO typo from backend
  multi: boolean;
  isPopulate: true;
  populatePath: string;
  type: "string" | "boolean" | "number" | "object";
  inputType:
    | "radio"
    | "file"
    | "textarea"
    | "checkbox"
    | "dropdown"
    | "datepicker"
    | "timepicker"
    | "text"
    | "dayspicker"
    | "location";
  placeholder: string;
  options: string[];
  template: number;
  isRequired: boolean;
  isQuestion: boolean;
  stepTitle: string;
  maxLength ?: number;
  minLength ?: number;
  subQuestions: NeedServiceSubQuestion[];
}

export interface NeedServiceSubQuestion extends NeedServiceQuestion {
  subQGroupIndex: number;
  condition: any;
}

export interface NeedServiceData {
  _id: string;
  title: string;
  logo: string;
  category: string;
  gigType: string;
  creditRequired: number;
  desc: string;
  questions: NeedServiceQuestion[];
}

/**
 * Profile
 */

export interface ProfileData {
  id: number;
  profileCompletation: number;
  profileVisit: number;
  leadType: string;
  isFounder: boolean;
  creditLeft: number;
  isFreeContentAccessable: boolean;
  isPassionGruAccessable: boolean;
  otherServices: boolean;
  volunteerMapping: boolean;
  facilities: string[];
  kycStatus: string[];
  isPostSignupComplete: boolean;
  isPublish: boolean;
  e017Sent: boolean;
  e022Sent: boolean;
  e024Sent: boolean;
  isMobileVerified: boolean;
  isEmailVerified: boolean;
  maxStoryLimit: number;
  maxEventLimit: number;
  isBlocked: number;
  _id: string;
  name: string;
  nameWithLower: string;
  email: string;
  contactPerson: string;
  mobile: string;
  createdBy: string;
  website: string;
  rm: string;
  content: string;
  createdAt: string;
  __v: number;
  foundingYear: number;
  publicEmail: string;
  publicMobile: string;
  images: { logo: string; secondary: string[] };
  address: {
    country: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface NeedEditResponses {
  _id: string;
  type: string;
  category: string;
  resolution: string;
  timeNeeded: number;
  title: string;
  questionsFormat: { questions: NeedServiceQuestion[]; creditRequired: number };
  questionsValues: { [key: string]: any };
}
