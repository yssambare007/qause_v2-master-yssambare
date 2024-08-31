import { base_url } from "../../utils";

export const getGalleryData: any = async () => {
  const data = await fetch(`${base_url}ngo/gallery/all`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result;
};
