import { CircularProgress } from "@mui/material";
import type { SearchNGOResponse } from "../../types/search";
import SearchResultCard from "./SearchResultCard";

const SearchResults = (props: {
  results?: SearchNGOResponse[];
  isLoading: boolean;
}) => {
  if (props.isLoading || !props.results) {
    return (
      <div className="flex h-[250px] items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (props.results.length == 0) {
    return (
      <div className="flex h-[250px] items-center justify-center">
        No Results Found.
      </div>
    );
  }

  return (
    <div className="px-7">
      <div className="mb-4 bg-[#F2F2F2] px-3 py-4 text-lg font-bold text-[#253DC0]">
        {props.results.length == 0 ? "No" : props.results.length} Result
        {props.results.length > 1 ? "s" : ""} found
      </div>
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {props.results.map((ngo) => (
          <SearchResultCard key={ngo._id} ngo={ngo} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
