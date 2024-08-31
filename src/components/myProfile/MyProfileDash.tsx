import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CollectionsIcon from "@mui/icons-material/Collections";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
import { useQuery } from "react-query";
import {
  getProfileDashboardData,
  getProfilePictureData,
} from "../../utils/apis/profile/Index";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import Image from "next/image";
import NeedsAddCreditDialog from "../needs/NeedsAddCreditDialog";
import { Chip } from "@mui/material";
import NoLogoImage from "../../../public/images/no-logo.jpeg";
const ORANGE_COLOR = "bg-[#f79e09]";
const BLUE_FONT_COLOR = "text-[#333846]";

interface DATA {
  ngo: any;
  profileCompleted: string;
  stories: string;
  events: string;
  gallery: string;
  donationReceived: string;
  creditLeft: string;
}
function MyProfileDash() {
  const { data } = useQuery<DATA, Error>(
    USE_QUERY_KEYS.fetchProfileDashBoardData,
    getProfileDashboardData
  );
  return (
    <div className="w-[100%]">
      {/* head */}
      <div
        className={`w-full ${ORANGE_COLOR} pb-20 pl-16 pr-14 pt-12 text-white`}
      >
        <div className="block w-full justify-between pb-8 sm:flex">
          <div>
            <div className="text-3xl font-bold">Hey {data?.ngo?.founder}</div>
            <p className="text-1xl mt-5 font-normal sm:text-base">
              Welcome Back! Here is what&apos;s new while you were away.
            </p>
          </div>
          <Link
            href={END_POINTS.PREVIEW + data?.ngo?._id}
            className="float-right my-2"
          >
            <button className="rounded bg-blue-800 px-4 py-2 text-sm font-bold text-white">
              Live Preview
            </button>
          </Link>
        </div>
      </div>

      {/* dashboard wrapper */}
      <div className="relative z-10 mx-4 my-16 -mt-12 block sm:mx-16 md:flex">
        {/* left section */}
        <LeftMyProfile
          profileCompleted={data?.profileCompleted ?? "0"}
          noInspirationStory={data?.stories ?? "0"}
          noGallery={data?.gallery ?? "0"}
          noEvents={data?.events ?? "0"}
        ></LeftMyProfile>
        {/* right section */}
        <RightMyProfile
          id={data?.ngo?._id}
          name={data?.ngo?.name}
          website={data?.ngo?.website}
          mobile={data?.ngo?.mobile}
          email={data?.ngo?.email}
          donationReceived={data?.donationReceived ?? "0"}
          creditLeft={data?.creditLeft ?? "0"}
          category={data?.ngo?.category}
          state={data?.ngo?.address.state}
          country={data?.ngo?.address.country}
        ></RightMyProfile>
      </div>
    </div>
  );
}
interface LeftProps {
  noInspirationStory: string;
  noEvents: string;
  noGallery: string;
  profileCompleted: string;
}
function LeftMyProfile(props: LeftProps) {
  return (
    <div className=" mr-4 w-full md:w-2/3">
      <div className={`rounded-xl  bg-white ${BLUE_FONT_COLOR}`}>
        <div className="pb-7 pl-7 pr-7 pt-11">
          {/* text and svg */}
          <div className="flex justify-between">
            <div className="">
              <p className="mb-4 text-base font-semibold md:text-xl">
                Build your profile effortlessly!<br></br>
                We are there with you every step of the way!
              </p>
              <Link href={END_POINTS.PROFILE_UPDATE}>
                <button className="rounded bg-blue-800 px-4 py-2 font-bold text-white">
                  Update Profile
                </button>
              </Link>
            </div>
            <div className="">{/* svg will come here */}</div>
          </div>

          <div className="mt-6 block justify-between md:flex">
            <p className="text-sm font-semibold md:text-xl">
              Need help in updating your web profile?
            </p>
            <button className="my-3 rounded bg-blue-900 px-4 py-2 text-xs font-bold text-white md:text-sm">
              Ask For Support
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 w-full rounded-md border-2 border-slate-300 ">
        <div className="block pb-7 pl-7 pr-7 pt-11 md:flex">
          <div className="w-3/4 pr-5">
            <div className="flex items-center gap-x-2">
              <ImportContactsIcon className="text-base"></ImportContactsIcon>
              <div className="text-base font-bold sm:text-2xl">
                Inspiration Story
              </div>
            </div>
            <p className="my-4 text-xs sm:text-sm">
              We are transforming transcripts into stories. These stories will
              give readers a peek into life-changing work that you have been
              doing.
            </p>
          </div>
          <div className="my-2 flex items-center justify-between gap-4 sm:text-center md:w-1/4 md:flex-col md:items-center">
            <div className="text-base font-extrabold sm:text-2xl sm:font-bold md:w-full md:text-center">
              0{props.noInspirationStory} of 06
            </div>
            <Link href={END_POINTS.STORY_DESK} className="md:w-full">
              <Chip
                label="Create a New Story"
                className="w-full cursor-pointer bg-blue-100 text-black"
              />
            </Link>{" "}
          </div>
        </div>
      </div>
      <div className="my-4 w-full rounded-md border-2 border-slate-300 ">
        <div className="block pb-7 pl-7 pr-7 pt-11 md:flex">
          <div className="w-3/4 pr-5">
            <div className="flex items-center gap-x-2">
              <CollectionsIcon className="text-base"></CollectionsIcon>
              <div className="text-base font-bold sm:text-2xl">
                Showcase Events
              </div>
            </div>
            <p className="my-4 text-xs sm:text-sm">
              All your hard work needs a platform and we are giving it to you!
              Showcase your events you have organised in the past and get the
              attention of changemakers!
            </p>
          </div>
          <div className="my-2 flex items-center justify-between gap-4 sm:text-center md:w-1/4 md:flex-col md:items-center">
            <div className="text-base font-extrabold sm:text-2xl sm:font-bold md:w-full md:text-center">
              0{props.noEvents} of 06
            </div>
            <Link href={END_POINTS.EVENT_DESK} className="md:w-full">
              <Chip
                label="View / Edit Events"
                className="w-full cursor-pointer bg-blue-100 text-black"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 w-full rounded-md border-2 border-slate-300 ">
        <div className="block pb-7 pl-7 pr-7 pt-11 md:flex">
          <div className="w-3/4 pr-5">
            <div className="flex items-center gap-x-2">
              <DateRangeIcon className="text-base"></DateRangeIcon>
              <div className="text-base font-black sm:text-2xl sm:font-bold">
                Gallery
              </div>
            </div>
            <p className="my-4 text-xs sm:text-sm">
              Because every picture tells a story! Share your beautiful moments
              in the NGO and the work you’ve been doing to bring the change
            </p>
          </div>
          <div className="my-2 flex items-center justify-between gap-4 sm:text-center md:w-1/4 md:flex-col md:items-center md:justify-center">
            <div className="text-base font-extrabold sm:text-2xl sm:font-bold md:w-full md:text-center">
              0{props.noGallery} of 06
            </div>
            <Link
              href={END_POINTS.GALLERY}
              className="cursor-pointer md:w-full"
            >
              <Chip
                label="Upload Photo"
                className="w-full cursor-pointer bg-blue-100 text-black"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RightProps {
  name: string;
  category: string;
  mobile: string;
  email: string;
  creditLeft: string;
  donationReceived: string;
  id: string;
  website: string;
  state: string;
  country: string;
}
function RightMyProfile(props: RightProps) {
  const { data } = useQuery<any, Error>(
    USE_QUERY_KEYS.fetchProfilePictureData,
    getProfilePictureData
  );
  return (
    <div className=" ${BLUE_FONT_COLOR} w-full rounded-xl bg-white md:ml-4 md:w-1/3">
      <div className="px-2 pb-7 pt-7 sm:pl-7 sm:pr-7">
        <div className="flex w-full flex-col">
          {data?.images?.logo ? (
            data?.images?.logo?.includes("http") ? (
              <Image
                src={data?.images?.logo}
                className="h-[65px] w-[65px] cursor-pointer rounded-full border border-zinc-700 object-contain p-1"
                width={55}
                height={55}
                alt="logo"
              />
            ) : (
              <Image
                src={`https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${data._id}/${data?.images?.logo}`}
                className="h-[65px] w-[65px] cursor-pointer rounded-full border border-zinc-700 object-contain p-1"
                width={55}
                height={55}
                alt="logo"
              />
            )
          ) : (
            <Image
              src={NoLogoImage}
              className="h-[65px] w-[65px] cursor-pointer rounded-full border border-zinc-700 object-contain p-1"
              width={55}
              height={55}
              alt="logo"
            />
          )}

          {/* <Image className="w-[100px] rounded-full " src={NoLogoImage} alt="Logo"></Image> */}
          <p className="text-xs font-bold ">{props.category}</p>
          <p className="text-xl font-extrabold">{props.name}</p>
        </div>
        <div className="mt-4 text-xs md:text-base">
          <CallIcon
            sx={{ color: "rgba(247, 158, 9)" }}
            className="m-1"
          ></CallIcon>
          {props.mobile}
        </div>
        <div className="text-xs md:text-base">
          <EmailIcon
            sx={{ color: "rgba(247, 158, 9)" }}
            className="m-1"
          ></EmailIcon>
          {props.email}
        </div>
        <div className="text-xs md:text-base">
          <HomeIcon
            sx={{ color: "rgba(247, 158, 9)" }}
            className="m-1"
          ></HomeIcon>
          {props.country} , {props.state}
        </div>

        <div className="mt-4 sm:mt-[60px]">
          <p className="font-extrabold sm:text-xl">Bank Verification</p>
          <p className="text-xs">
            Get your documents verified with us and start receiving donations!
          </p>
          <Link href={END_POINTS.BANK}>
            <button className="my-2 rounded border border-blue-500 px-4 py-2 text-xs sm:text-base">
              Activate Donation
            </button>
          </Link>
        </div>

        <div className="mt-4 sm:mt-[70px]">
          <div className="flex w-full justify-between">
            <p className="font-extrabold sm:text-xl">
              Donation Received Lifetime
            </p>
            <p className="flex font-extrabold text-orange-600 sm:text-xl">
              <CurrencyRupeeIcon
                sx={{ color: "rgba(247, 158, 9)" }}
              ></CurrencyRupeeIcon>{" "}
              {props.donationReceived}
            </p>
          </div>
          <Link href={END_POINTS.TRANSACTIONS} className="text-xs">
            View Detail
          </Link>
        </div>

        <div className="mt-4 sm:mt-[70px]">
          <div className="flex w-full justify-between">
            <p className="font-extrabold sm:text-xl">Credit Left</p>
            <div className="flex items-start font-extrabold sm:text-xl">
              {props.creditLeft}
              <NeedsAddCreditDialog>
                <p className="ml-1 text-xs font-normal">add more</p>
              </NeedsAddCreditDialog>
            </div>
          </div>
          <Link href={END_POINTS.CREDITS} className="text-xs">
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MyProfileDash;
