import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";
import NeedsAddCreditDialog from "../needs/NeedsAddCreditDialog";

export default function MyProfileCard({ user, className }: any) {
  return (
    <div
      className={`flex h-full w-full flex-col divide-y rounded-xl bg-white p-3 ${
        className || ""
      }`}
    >
      <div className="flex h-3/4 w-full flex-col justify-between gap-y-2 pb-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-qause-yellow xs:text-sm md:text-lg">
            My Profile
          </div>
          <Link href={END_POINTS.PROFILE_UPDATE}>
            <button className="rounded-md bg-qause-yellow-light px-3 pb-1 text-xs font-normal text-white">
              Update
            </button>
          </Link>
        </div>
        <div className="flex w-full flex-row items-center">
          <div className="font-light xs:text-xs md:text-sm">
            {" "}
            <span> Contact Person: </span>
            {user.contactPerson}
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="text-xs font-light">
            <CallIcon className="h-4 w-4 text-qause-yellow" /> {user.mobile}
          </div>
          <div className="text-xs font-light">
            <EmailIcon className="h-4 w-4 text-qause-yellow" /> {user.email}
          </div>
        </div>
      </div>
      <div className="flex h-1/4 w-full flex-row items-center gap-x-2">
        <div className="flex flex-grow items-center gap-x-1">
          <div className="font-medium text-qause-yellow underline">
            ₹{user.creditLeft}
          </div>
          <div className="text-xs font-normal">Credit Left</div>
          <NeedsAddCreditDialog availableCredits={user.creditLeft}>
            <AddCircleIcon fontSize="small" className="text-qause-blue-dark" />
          </NeedsAddCreditDialog>
        </div>
        <Link
          href={END_POINTS.CREDITS}
          className="flex items-center justify-end text-xs font-light"
        >
          History
        </Link>
      </div>
    </div>
  );
}
