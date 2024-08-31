import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { END_POINTS } from "../../constants/endpoints";

interface DetailsFrameProps {
  children: React.ReactNode;
}

const DetailsFrame = ({ children }: DetailsFrameProps) => {
  const router = useRouter();
  const navItems = [
    {
      label: "About NGO",
      path: END_POINTS.ABOUT_NGO,
    },
    {
      label: "Founder",
      path: END_POINTS.ABOUT_FOUNDER,
    },
    {
      label: "Bank Details",
      path: END_POINTS.BANK,
    },
    {
      label: "KYC Details",
      path: END_POINTS.KYC_DETAILS,
    },
    {
      label: "Credits",
      path: END_POINTS.CREDITS,
    },
    {
      label: "Transaction",
      path: END_POINTS.TRANSACTIONS,
    },
  ];
  const currentRoute = navItems.filter((item) => item.path === router.asPath)[0]
    ?.label;
  return (
    // <div className="flex min-h-full w-full flex-col items-center pt-5 gap-1">
    <div className="flex min-h-full w-full flex-col gap-7 rounded bg-white p-5 md:gap-1">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="mx-3 text-center font-['GeneralSans'] text-3xl font-[600]">
          Edit Profile
        </h2>
        {/* <div className="flex max-w-full overflow-x-auto">
          {navItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={` flex min-w-fit items-center justify-center bg-[#f2f2f2] px-4 py-2 text-black md:p-5 ${
                index === 0 || index === navItems.length
                  ? ""
                  : "border-l-2 border-gray-300"
              }
              ${
                router.asPath.includes(item.path)
                  ? "border-b-4 border-b-[#2e026d]"
                  : ""
              }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div> */}
      </div>
      {children}
    </div>
  );
};

export default DetailsFrame;
