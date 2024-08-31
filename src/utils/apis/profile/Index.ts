import { NGO_ID, TOKEN } from "../../../constants/constants";
import { base_url } from "../../utils";

export const getCurrentProfile = async () => {
  const data = await fetch(`${base_url}ngo/find/one`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem(TOKEN)}`,
    },
  });
  const result = await data.json();
  return result;
};

export const getProfileDashboardData = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const res = await fetch(base_url.concat("v2/profile"), options);
  const data = await res.json();
  return data.data;
};

export const getProfilePictureData = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const res = await fetch(base_url.concat("ngo/find/one"), options);
  const data = await res.json();
  localStorage.setItem(NGO_ID, data._id);
  return data;
};

export const getAllCategories = async () => {
  const data = await fetch(`${base_url}ngo/category/all`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem(TOKEN)}`,
    },
  });
  const result = await data.json();
  return result;
};

export const getPlans = async () => {
  const data = await fetch(`${base_url}v2/subscription/order`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem(TOKEN)}`,
    },
  });
  const result = await data.json();
  return result;
};

export const getSavedCards = async () => {
  const data = await fetch(`${base_url}v2/payment-information`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem(TOKEN)}`,
    },
  });
  const result = await data.json();
  return result;
};
