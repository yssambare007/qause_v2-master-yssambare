import type { QueryFunctionContext } from "react-query";
import type {
  FundraisingType,
  MultipleVolunteeringType,
  SingleVolunteeringType,
} from "../../../services/types/needs";
import { base_url } from "../../utils";

export const getCategories = async () => {
  const response = await fetch(`${base_url}v2/volunteer/category`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const { data, success, error } = await response.json();
  if (!success) {
    throw new Error(error);
  }
  return data;
};

export const getVolunteerGigsByCategory = async ({
  queryKey,
}: QueryFunctionContext) => {
  const categories: string[] = queryKey[1] as string[];
  const options = {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  };
  const singleResponse = await fetch(
    `${base_url}v2/volunteer/gig?gigType=singleVolunteering&singlePage=1&search=&category=${categories.join(
      ","
    )}&city=&ngoId=`,
    options
  );
  const multipleResponse = await fetch(
    `${base_url}v2/volunteer/gig?gigType=multipleVolunteering&singlePage=1&search=&category=${categories.join(
      ","
    )}&city=&ngoId=`,
    options
  );
  const fundraisingResponse = await fetch(
    `${base_url}v2/volunteer/gig?gigType=fundraising&singlePage=1&search=&category=${categories.join(
      ","
    )}&city=&ngoId=`,
    options
  );
  const {
    data: singleData,
    success: singleSuccess,
    error: singleError,
  } = await singleResponse.json();
  const {
    data: multipleData,
    success: multipleSuccess,
    error: mulipleError,
  } = await multipleResponse.json();
  const {
    data: fundData,
    success: fundSuccess,
    error: fundError,
  } = await fundraisingResponse.json();

  if (!singleSuccess || !multipleSuccess || !fundSuccess) {
    throw new Error(singleError || mulipleError || fundError);
  }
  return {
    singleVolunteering: singleData,
    multipleVolunteering: multipleData,
    fundraising: fundData,
  } as {
    singleVolunteering: SingleVolunteeringType[];
    multipleVolunteering: MultipleVolunteeringType[];
    fundraising: FundraisingType[];
  };
};
