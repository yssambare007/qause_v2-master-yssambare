import type { QueryFunctionContext } from "react-query";
import { TOKEN } from "../../../constants/constants";
import { base_url } from "../../utils";

export const getNeeds = async ({ queryKey }: QueryFunctionContext) => {
  const filters = {
    page: 1,
    category: queryKey[1] || "",
    credits: queryKey[2] || "",
    search: queryKey[3] || "",
    isFeatured: false,
  };
  const url = new URL(`${base_url}v2/need`);
  const searchParams = new URLSearchParams();
  Object.entries({ ...filters }).forEach(([k, v]: any[]) =>
    searchParams.append(k, v)
  );
  url.search = searchParams.toString();
  const data = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result.data;
};

export const getNeedResponseById = async ({
  queryKey,
}: QueryFunctionContext) => {
  const id = queryKey[1];
  if (!id) {
    throw new Error("id must be given");
  }
  const data = await fetch(`${base_url}v2/need/card/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result.data;
};

export const getNeedById = async ({ queryKey }: QueryFunctionContext) => {
  const id = queryKey[1];

  if (!id) {
    throw new Error("id must be given");
  }
  const data = await fetch(`${base_url}v2/need/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result.data;
};

export const updateNeed =
  (method: "PUT" | "POST") => async (data: { [key: string]: any }) => {
    const headers = new Headers();
    headers.append("Authorization", "" + localStorage.getItem(TOKEN));
    headers.append("Content-Type", "application/json");
    const res = await fetch(`${base_url}v2/need`, {
      method: method,
      body: JSON.stringify(data),
      headers: headers,
    });
    const result = await res.json();

    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  };

export const uploadNeedFiles = async (data: FormData) => {
  const headers = new Headers();
  headers.append("Authorization", "" + localStorage.getItem(TOKEN));
  const res = await fetch(`${base_url}v2/need/file`, {
    method: "POST",
    body: data,
    headers: headers,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const getNeedCard = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  const data = await fetch(`${base_url}v2/need/card/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result;
};

export const cancelNeed = async (needId: string) => {
  const headers = new Headers();
  headers.append("Authorization", "" + localStorage.getItem(TOKEN));
  headers.append("Content-Type", "application/json");
  const res = await fetch(`${base_url}v2/need/${needId}/cancle`, {
    method: "PUT",
    headers: headers,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result;
};

export const extendNeed = async (needId: string) => {
  const headers = new Headers();
  headers.append("Authorization", "" + localStorage.getItem(TOKEN));
  headers.append("Content-Type", "application/json");
  const res = await fetch(`${base_url}v2/need/${needId}/extend`, {
    method: "PUT",
    headers: headers,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const letQauseDoIt = async (needId: string) => {
  const headers = new Headers();
  headers.append("Authorization", "" + localStorage.getItem(TOKEN));
  headers.append("Content-Type", "application/json");
  const res = await fetch(`${base_url}v2/need/${needId}/qause`, {
    method: "GET",
    headers: headers,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const checkForSupport = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  const data = await fetch(`${base_url}v2/ticket/support/${id}/check`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await data.json();
  return result.success;
};

export const askForSupport = async (needId: string) => {
  const headers = new Headers();
  headers.append("Authorization", "" + localStorage.getItem(TOKEN));
  headers.append("Content-Type", "application/json");
  const res = await fetch(`${base_url}v2/ticket/support/${needId}`, {
    method: "GET",
    headers: headers,
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};
