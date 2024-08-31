import { base_url } from "../../utils";

export const getDashboardCardData = async () => {
  const data = await fetch(`${base_url}v2/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result.data;
};
