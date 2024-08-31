import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
import { useQuery } from "react-query";
import { getActiveCards } from "../../utils/apis/needsDash/Active";
import { LiveCardCarousal } from "./LiveCardCarousal";

export default function LiveCardWrapper() {
  const { data, status } = useQuery<any>("activeCards", getActiveCards);
  return (
    <div className="mt-3 rounded-xl bg-white p-3 sm:mx-3">
      <div className="pb-4 pt-1">
        <div className="flex w-full border-b-2 pb-2">
          <p className="mr-2 text-qause-yellow sm:text-xl">Live Cards</p>
          <Link href={END_POINTS.CREATE_NEED}>
            <p className="mx-3 font-thin sm:text-xl">View All</p>
          </Link>
        </div>
        <LiveCardCarousal
          isSuccess={status == "success"}
          isLoading={status == "loading"}
          cards={data}
        ></LiveCardCarousal>
      </div>
    </div>
  );
}
