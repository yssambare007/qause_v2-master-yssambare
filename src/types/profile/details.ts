export interface NGOPreview {
  _id: string;
  name: string;
  address: Address;
  category: {
    subCategories: string[];
    name: string;
  };
  foundingYear: number;
  founder: Founder;
  publicEmail: string;
  publicMobile: string;
  images: {
    secondary: string[];
    logo: string;
    cover: string;
  };
  stories: [];
  story: {
    approveStatus: string;
    text: string;
  };
  events: [];
}

export interface Credits {
  success: boolean;
  creditLeft: number;
  total: number;
  pagination: Pagination;
  data: Datum[];
}

export interface Datum {
  _id: string;
  balance: number;
  status: string;
  type: string;
  desc: string;
  credit: number;
  amount: number;
  createdAt: Date;
}

export interface ProfileDetails {
  success: boolean;
  data: Data;
  error?: string;
}

export interface Founder {
  approveStatus?: string;
  name: string;
  bio?: string;
  image?: string;
}

export interface UpdateFounder {
  bio: string;
  file?: File;
  imageUrl?: string;
}

export interface Data {
  ngo: Ngo;
  profileCompleted: number;
  creditLeft: number;
  donationReceived: number;
  events: number;
  stories: number;
  gallery: number;
}

export interface Ngo {
  _id: string;
  name: string;
  website: string;
  category: string;
  mobile: string;
  email: string;
  founder: string;
  address: Address;
  isBankDetailsVerified: boolean;
}

export interface Address {
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  formattedAddress: string;
}

export interface Transaction {
  success: boolean;
  total: number;
  pagination: Pagination;
  data: Datum[];
}

export interface Datum {
  _id: string;
  mode: Mode;
  amount: number;
  createdAt: Date;
  name: string;
}

export enum Mode {
  Upi = "upi",
}

export interface Pagination {
  next?: Next;
  prev?: Next;
}

export interface Next {
  page: number;
  limit: number;
}
