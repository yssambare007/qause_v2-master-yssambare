import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
import type { NeedServiceDataMini } from "../../services/types/needs";

function NeedsCard(props: { data: NeedServiceDataMini; varient: "v1" | "v2" }) {
  return (
    <div className={`${props.varient === "v2" ? "ml-3 mr-6" : ""}`}>
      <Link
        href={{
          pathname: END_POINTS.NEEDS_SERVICE,
          query: { needId: props.data._id },
        }}
        className={`flex h-[190px] w-full flex-col items-center rounded-xl border border-solid border-[#1B3763] bg-white p-2 sm:h-[258px]`}
      >
        <div className="flex w-full items-center justify-center rounded-md bg-[#F1F5FA] px-2 sm:py-4">
          <img
            className="h-[90px] w-40 object-contain sm:h-24"
            src={props.data.logo}
          />
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 ">
          <img className="w-[8px]" src="/images/credit-icon.svg" />
          <span>Credit: {props.data.creditRequired}</span>
        </div>
        <div className="m-auto whitespace-pre-wrap text-center text-sm font-bold text-[#1B3763]">
          {props.data.title}
        </div>
      </Link>
    </div>
  );
}

export default NeedsCard;
