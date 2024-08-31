import { base_url } from "../../utils";

import type { QueryFunctionContext } from "react-query";
import type {
  DeleteUpdateMutationTypes,
  PutUpdateMutationTypes,
} from "../../../types/mutation/gig";

export const getGigDesc = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  const data = await fetch(`${base_url}v2/volunteer/gig/${id}/value`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result;
};

export const getGigSupporters = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id, page] = queryKey;
  const data = await fetch(
    `${base_url}v2/volunteer/gig/${id}/transition/all?page=${page}`,
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

export const getGigUpdates = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id, page] = queryKey;
  const data = await fetch(
    `${base_url}v2/volunteer/gig/${id}/updates?page=${page}`,
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

export const putGigUpdates = async (param: PutUpdateMutationTypes) => {
  const { id, ...payload } = param;
  const formData = new FormData();
  formData.append("remark", payload.remark);
  formData.append("title", payload.title);
  formData.append("isPrivate", payload.isPrivate.toString());
  payload.file && formData.append("file", payload.file);
  const data = await fetch(`${base_url}v2/volunteer/gig/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
    body: formData,
  });
  const result = await data.json();
  return result;
};

export const deleteGigUpdates = async (param: DeleteUpdateMutationTypes) => {
  const { volunteerId, updateId } = param;
  const data = await fetch(
    `${base_url}v2/volunteer/gig/${volunteerId}/${updateId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    }
  );
  const result = await data.json();
  return result;
};
