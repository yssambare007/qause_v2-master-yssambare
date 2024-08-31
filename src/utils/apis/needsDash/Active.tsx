import type {
  ExtendCardType,
  FulfilledCardType,
} from "../../../services/types/needs";
import { base_url } from "../../utils";

export const getActiveCards: any = async () => {
  const data = await fetch(
    `${base_url}v2/need/my?type=active&&subType=feedbackAwaited,liveCard%20&&livePage=1&&feedbackAwaitedPage=1`,
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
export const getPendingCards: any = async () => {
  const data = await fetch(
    `${base_url}v2/need/my?type=pendingForApprovel&&page=1`,
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

export const getHistoryCards = async () => {
  const response = await fetch(
    `${base_url}v2/need/my?type=history&=&=&=&subType=fulfilled,extendCard&extendPage=1&fulfilledPage=1`,
    {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    }
  );
  const { extendCards, fulfilledCards, success, error } = await response.json();
  if (!success) {
    throw new Error(error);
  }
  return { extendCards, fulfilledCards } as {
    extendCards: ExtendCardType[];
    fulfilledCards: FulfilledCardType[];
  };
};
