import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { getDashboardCardData } from "../../../utils/apis/dashboard/Index";

import SupportCard from "../../../components/dashboard/SupportCard";
import DonationCard from "../../../components/dashboard/DonationCard";
import MyProfileCard from "../../../components/dashboard/MyProfileCard";
import OpenTicketsCard from "../../../components/dashboard/OpenTicketsCard";
import NgoDashboardFrame from "../../../components/common/NgoDashboardFrame";
import LiveCardWrapper from "../../../components/dashboard/LiveCardWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const { isLoading, data, error } = useQuery(
    "dashboardCardData",
    getDashboardCardData
  );

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  if (isLoading) {
    return (
      <NgoDashboardFrame>
        <div className="flex h-full w-full items-center justify-center">
          <CircularProgress />
        </div>
      </NgoDashboardFrame>
    );
  }

  if (error) {
    return (
      <NgoDashboardFrame>
        <div className="flex h-full w-full items-center justify-center">
          {"Oops! Couldn't fetch dashboard data."}
          <div className="text-md h-full w-full overflow-y-auto text-red-500">
            {JSON.stringify(error)}
          </div>
        </div>
      </NgoDashboardFrame>
    );
  }

  if (data) {
    return (
      <NgoDashboardFrame>
        <div className="flex w-full flex-col gap-4 bg-qause-gray sm:p-4">
          <LiveCardWrapper></LiveCardWrapper>
          <div className="hidden sm:visible sm:w-4 sm:bg-blue-600">h</div>
          <div className="grid sm:h-[600px] max-h-[700px] w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-6">
            <div className="sm:col-span-2 grid h-full grid-cols-1 gap-y-4">
              <DonationCard donation={data.donationReceived} />
              <MyProfileCard user={data.ngo} />
            </div>
            <SupportCard
              manager={data.rm}
              className="xs:h-[300px] md:col-span-2"
            />
            <OpenTicketsCard
              tickets={data.tickets}
              className="xs:h-[300px] md:col-span-2"
            />
          </div>
        </div>
      </NgoDashboardFrame>
    );
  }
};

export default Index;
