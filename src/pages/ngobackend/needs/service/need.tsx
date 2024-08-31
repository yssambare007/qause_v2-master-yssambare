import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { UseQueryResult } from "react-query";
import { useQueries } from "react-query";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import NeedService from "../../../../components/needs/service/NeedService";
import type {
  NeedServiceData,
  ProfileData,
} from "../../../../services/types/needs";
import { getNeedById } from "../../../../utils/apis/needs/Index";
import { getCurrentProfile } from "../../../../utils/apis/profile/Index";

function NeedServicePage() {
  const router = useRouter();
  const results = useQueries<
    [UseQueryResult<NeedServiceData>, UseQueryResult<ProfileData>]
  >([
    {
      staleTime: Infinity,
      queryKey: ["need", router.query["needId"]],
      enabled: Boolean(router.query["needId"]),
      queryFn: getNeedById,
    },
    { staleTime: Infinity, queryKey: "profile", queryFn: getCurrentProfile },
  ]);

  const isLoading = false;
  results.some((result) => result.isLoading) ||
    results.some((result) => result.isError);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  return (
    <NgoDashboardFrame>
      {isLoading || !(results[0].data && results[1].data) ? (
        <div className="flex h-screen w-full items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <NeedService need={results[0].data} profile={results[1].data} />
      )}
    </NgoDashboardFrame>
  );
}

export default NeedServicePage;
