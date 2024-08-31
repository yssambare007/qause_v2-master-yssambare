import { base_url } from "../../utils";
import type { Feedback } from "../../../services/types/feedback";

export const saveFeedback = async (payload: {
  gigId: string | null;
  data: FormData;
}) => {
  if (!payload.gigId) {
    throw new Error("no gigId passed");
  }

  const res = await fetch(`${base_url}v2/need/${payload.gigId}/feedback`, {
    method: "POST",
    body: payload.data,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const getVolunteers = async (
  gigId: string | null
): Promise<Feedback | null> => {
  if (!gigId) {
    return null;
  }

  const res = await fetch(`${base_url}v2/need/card/${gigId}`, {
    method: "GET",
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
  });
  const result = await res.json();
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};
