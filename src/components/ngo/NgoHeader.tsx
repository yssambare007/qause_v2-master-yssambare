import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Navbar from "../navbar/Navbar";

const NgoHeader = (props: any) => {
  return (
    <>
      <Navbar />
      <div className="flex h-[65px] flex-row items-start items-center bg-[#F5F5F6] pl-6">
        <Link href="/">
          <p className="font-[muli] text-[#7E7E7E] xs:text-[12.96px] md:text-[14.4px] lg:text-[15.84px]">
            Qause
          </p>
        </Link>
        <KeyboardArrowRightIcon
          className="xs:mx-0 sm:mx-[10px]"
          style={{ color: "#7E7E7E" }}
        />
        <Link href="/null">
          <p className="cursor-pointer font-[muli] text-[#7E7E7E] xs:text-[12.96px] md:text-[14.4px] lg:text-[15.84px]">
            NGO
          </p>
        </Link>
        <KeyboardArrowRightIcon
          className="xs:mx-0 sm:mx-[10px]"
          style={{ color: "#7E7E7E" }}
        />
        <p className="font-[muli] font-semibold capitalize text-black xs:text-[12.96px] md:text-[14.4px] lg:text-[15.84px]">
          {props?.Headername}
        </p>
      </div>
    </>
  );
};

export default NgoHeader;
