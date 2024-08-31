import { NGO_ID, TOKEN } from "../../../constants/constants";
import { base_url } from "../../utils";

export const fetchBankDetailsRequest = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
  const options = {
    method: "GET",
    headers: myHeaders,
  };
  const url = `v2/ngo/${localStorage.getItem(NGO_ID)}/bank/details/`;
  const res = await fetch(base_url.concat(url), options);
  const data = await res.json();
  return data.data;
};
