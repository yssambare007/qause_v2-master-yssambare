import { TOKEN } from "../../../constants/constants";
import { base_url } from "../../utils";

export const fetchTagsRequest = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const resTags = await fetch(
    base_url.concat("ngo/event/tags/find/all"),
    options
  );
  const dataTags = await resTags.json();
  const tags = dataTags.map((dataTag: any) => {
    return dataTag.name;
  });
  return tags;
};

export const fetchEventRequest = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const res = await fetch(base_url.concat("ngo/event/all"), options);
  const data = await res.json();
  return data.data;
};
