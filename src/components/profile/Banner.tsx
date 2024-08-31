import Image from "next/image";
import BannerCoverImg from "./../../../public/images/profile/bannerCoverImg.svg";
export interface BannerProps {
  name: string;
  message: string;
}
function Banner(props: BannerProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-[#CCD5F4]">
      <div className="px-9">
        <b className="relative">
          Hi{" "}
          <span className="rounded-full bg-[#ECA43E] px-3 py-1 text-white">
            {props.name} !
          </span>
          <Image
            alt="yellow splash"
            src={"/images/profile/yellowSpark.png"}
            width={19.23}
            height={21.6}
            className="absolute"
            style={{ top: "-15px", right: "-15px" }}
          />
        </b>
        <p className="text-3xl font-bold">{props.message}</p>
      </div>
      <BannerCoverImg />
    </div>
  );
}

Banner.defaultProps = {
  name: "Viswanth!",
  message: "Check your tasks and reviews",
};

export default Banner;
