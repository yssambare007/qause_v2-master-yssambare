import { Restore } from "@mui/icons-material";
import Link from "next/link";
import { END_POINTS } from "../../../constants/endpoints";

function NeedsDashboardStatusNavPanel(props: any) {
  return (
    <div className="sticky bottom-0 mx-4 mb-10 flex flex-col items-center bg-white md:mx-16 md:mb-20 md:flex-row">
      <div className="mb-4 text-base font-bold text-[#1B3763]">
        Need Cards Status
      </div>
      <div className="flex gap-4  md:ml-[30%]">
        <div className="flex items-center gap-6 rounded-3xl border border-gray-300 px-6 py-1">
          <img className="h-[70px]" src="/images/need-addicon.svg" />
          <Link
            className="text-sm text-[#1B3763] underline"
            href={END_POINTS.NEEDS_ACTIVE}
          >
            {" "}
            Active{" "}
          </Link>
        </div>
        <div className="w-px  bg-gray-300" />
        <div className="flex items-center gap-6 rounded-3xl border border-gray-300 px-6 py-1">
          <Restore htmlColor="#F79E09" />
          <Link
            className="text-sm text-[#1B3763] underline"
            href={END_POINTS.NEEDS_HISTORY}
          >
            {" "}
            History{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NeedsDashboardStatusNavPanel;
