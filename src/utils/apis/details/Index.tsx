import { base_url } from "../../utils";

import type { QueryFunctionContext } from "react-query";
import type { ProfileDetails } from "../../../types/profile/details";

export const getCreditData = async ({ queryKey }: QueryFunctionContext) => {
  const [_, page] = queryKey;
  const data = await fetch(`${base_url}v2/credit/history?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result;
};

export const getProfileDetails = async () => {
  const data = await fetch(`${base_url}v2/profile`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result: ProfileDetails = (await data.json()) as ProfileDetails;
  if (!result.success) {
    throw new Error(result.error || "Something went wrong");
  }
  return result;
};

interface Transaction {
  queryKey: string[];
}

export const getTransactionData = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, id, page] = queryKey;
  const data = await fetch(
    `${base_url}ngo/${id}/bank/transitions?page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    }
  );
  const result = await data.json();
  return result;
};

export const getFundraiseDetails = async ({
  queryKey,
}: QueryFunctionContext) => {
  const id = queryKey[1] as string;
  const key = queryKey[0] as string;

  const result = await fetch(`${base_url}v2/need/${id}/transition?page=1`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const { data } = await result.json();
  return data[key];
};

export const aboutDetails = async ({ queryKey }: QueryFunctionContext) => {
  const name = queryKey[0] as string;

  const result = await fetch(`${base_url}v1/view/ngo/t?page=${name}`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const { data } = await result.json();
  return data;
};

export const getFounderDetails = async () => {
  const result = await fetch(`${base_url}ngo/find/one`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const data = await result.json();
  return data.founder;
};

export const updateFounder = async (founder: {
  id: string;
  formData: FormData;
}) => {
  const result = await fetch(`${base_url}ngo/${founder.id}/founder`, {
    method: "PUT",
    body: founder.formData,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const { success, error } = await result.json();
  if (!success) {
    throw new Error(error);
  }
  return success;
};

export const updatePlanStatus = async () => {
  const data = { subscriptionActive: false };
  const result = await fetch(`${base_url}v2/subscription/status`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const { success, error } = await result.json();
  if (!success) {
    throw new Error(error);
  }
  return success;
};
