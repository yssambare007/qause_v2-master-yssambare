import { type Pagination } from "../profile/details";

export interface GigDescription {
  success: boolean;
  data: DescriptionDatum[];
}

export interface DescriptionDatum {
  value: number | string;
  title: string;
  type: string;
  inputType: string;
  displayType: string;
}

export interface GigUpdates {
  success: boolean;
  total: number;
  pagination: Pagination;
  data: UpdatesDatum[];
}

export interface UpdatesDatum {
  _id: string;
  updates: Update[];
}

export interface Update {
  isPrivate: boolean;
  _id: string;
  files: any[];
  remark: string;
  title: string;
  createdAt: Date;
  onModel: string;
  createdBy: string;
}

export interface GigSupporters {
  success: boolean;
  total: number;
  pagination: Pagination;
  data: SupportersData;
}

export interface SupportersData {
  _id: string;
  title: string;
  transitions: Transition[];
}

export interface Transition {
  _id: string;
  mode: string;
  anonymous: boolean;
  amount: number;
  createdAt: Date;
  donorName: string;
  donorContact: string;
  donorEmail: string;
}
