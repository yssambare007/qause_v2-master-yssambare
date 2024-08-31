import type { VolunteerDetails } from "./needs";

export interface Feedback {
  _id: string;
  type: "multipleVolunteering" | "singleVolunteering";
  title: string;
  category: string;
  ngo: {
    _id: string;
    name: string;
    logo: string;
    state: string;
    country: string;
    social: {
      youtube: string;
      facebook: string;
      instagram: string;
    };
    website: string;
    files: {
      trust: boolean;
      G80: boolean;
      A12: boolean;
      fcra: boolean;
    };
  };
  questionsFormat: {
    _id: string;
    title: string;
    logo: string;
    category: string;
    gigType: "multipleVolunteering" | "singleVolunteering";
    creditRequired: number;
    desc: "";
  };
  requests: VolunteerDetails[];
}

export interface NgoFeedback {
  gigType?: string;
  isCompleted?: boolean;
  ratting?: number;
  whatDidLike?: string[];
  photo?: File;
  selectedVolunteer?: { _id: string; isSelected: boolean }[];
}
