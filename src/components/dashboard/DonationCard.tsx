import Link from "next/link";
import { END_POINTS } from "../../constants/endpoints";

export default function DonationCard(
  { donation, className }: any = { donation: 0, className: "" }
) {
  return (
    <div
      className={`flex h-full w-full flex-row items-center justify-between rounded-xl bg-white p-3 pr-0 ${className}`}
    >
      <div className="flex h-full flex-grow flex-col justify-between pb-4 pt-1">
        <div className="font-bold text-qause-yellow xs:text-xs md:text-lg">
          Donation Recieved
        </div>
        <div className="text-xl font-bold text-qause-blue-dark md:text-5xl">
          <span>₹</span>
          {donation}
        </div>
        <Link href={END_POINTS.TRANSACTIONS} className="text-xs font-light">
          View Details
        </Link>
      </div>
      <figure>
        <img
          src="https://qause.tech/assets/images/ngo/dashboard-donationicon.svg"
          alt="dashboard-donationicon"
        />
      </figure>
    </div>
  );
}
