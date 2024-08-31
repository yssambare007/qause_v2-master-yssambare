import { SearchProps } from "../../../types/general";
import { base_url } from "../../utils";

export const getStatesList = async () => {
  const data = await fetch(`${base_url}ngo/states`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await data.json();
  return result;
};

export const getFoundingYears = async () => {
  const data = await fetch(`${base_url}v1/view/ngo/all/founding-years`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await data.json();
  return result;
};

export const doSearch = async (searchOptions: SearchProps) => {
  const data = await fetch(
    `${base_url}v1/view/ngo/text?${new URLSearchParams(
      Object.entries(searchOptions)
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await data.json();
  return result;
};
