import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import type { NeedServiceDataMini } from "../../services/types/needs";
import { getNeeds } from "../../utils/apis/needs/Index";
import NeedsCard from "./NeedCard";

interface NeedAllCardsProps {
  category?: string;
  search?: string;
  credits?: string;
}

const NeedAllCards = (props: NeedAllCardsProps) => {
  const { isLoading, isSuccess, data } = useQuery<NeedServiceDataMini[], Error>(
    ["needs", props.category, props.credits, props.search],
    getNeeds,
    { staleTime: Infinity }
  );

  if (isLoading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  if (isSuccess && data.length > 0) {
    return (
      <div className="mt-6 grid w-full gap-x-12 gap-y-8 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.map((card) => (
          <NeedsCard key={card._id} data={card} varient="v1" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center text-lg">
      No Needs found!!
    </div>
  );
};

export default NeedAllCards;
