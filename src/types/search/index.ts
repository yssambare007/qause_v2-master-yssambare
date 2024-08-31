import type { Address, Founder } from "../profile/details";

export interface SearchNGOResponse {
  _id: string;
  address: Address;
  location: {
    type: string;
    coordinates: number[];
  };
  category: {
    name: string;
    subCategories: string[];
  };
  founder: Founder;
  images: {
    secondary: string[];
    logo: string;
    cover: string;
  };
  story: {
    approveStatus: string;
    text: string;
    updatedBy: string;
  };
  profileCompletation: number;
  name: string;
  website: string;
  foundingYear: number;
}

export interface SearchResponse {
  totalNgo: number;
  ngoPagination: object;
  categories: string[];
  states: string[];
  foundingYears: number[];
  ngos: SearchNGOResponse[];
}
