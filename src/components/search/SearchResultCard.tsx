import Image from "next/image";
import type { SearchNGOResponse } from "../../types/search";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const getStoryText = (story: string) => {
  const span = document.createElement("span");
  span.innerHTML = story;
  const storyText = span.textContent || span.innerText || "";
  if (storyText.length <= 160) return storyText;
  else {
    return storyText.slice(0, 150) + " ...";
  }
};

const SearchResultCard = (props: { ngo: SearchNGOResponse }) => {
  return (
    <div className="relative min-w-fit rounded-lg border border-gray-300 xs:w-full sm:w-full md:w-fit">
      <div className="relative h-[250px] w-full">
        <Image
          className="mx-auto object-contain pt-3"
          fill
          alt="result image"
          src={props.ngo.images.logo}
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center text-base font-black capitalize">
          <span
            className="mr-4 inline-block h-[15px] min-w-[20px] bg-no-repeat"
            style={{
              background: "url(/images/small-icons.png) no-repeat 0px -159px",
            }}
          ></span>
          {props.ngo.name}
        </div>
        <div className="mb-2 flex items-center text-base font-thin capitalize">
          <span className="mr-4">
            <LocationOn fontSize="small" className="!text-qause-yellow" />
          </span>
          {props.ngo.address.state}
        </div>
        <div className="mb-2 flex items-center text-base font-thin">
          <span className="mr-4">
            <CalendarToday fontSize="small" className="!text-qause-yellow" />
          </span>
          Founding Year {props.ngo.foundingYear}
        </div>
        <div className="absolute -left-4 top-6 z-10 h-[35px] max-w-[250px] rounded-3xl bg-qause-yellow px-[30px] text-sm font-bold capitalize leading-8 text-white">
          {props.ngo.category.name}
        </div>
        <div className="mb-7 mt-[10px]  w-[250px] overflow-hidden text-ellipsis border-t border-gray-300 pt-[10px] text-justify text-sm text-[#737373]">
          {getStoryText(props.ngo.story.text)}
        </div>
        <button className="mt-2 w-full rounded bg-qause-blue px-3 py-1.5 text-sm leading-6 text-white">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default SearchResultCard;
