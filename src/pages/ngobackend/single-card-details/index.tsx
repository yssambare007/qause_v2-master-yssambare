import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { UseQueryResult } from "react-query";
import { useQueries } from "react-query";
import NgoDashboardFrame from "../../../components/common/NgoDashboardFrame";
import SingleCardDetails from "../../../components/ngoBackend/SingleCardDetails";
import type { NeedEditResponses, ProfileData } from "../../../services/types/needs";
import { getNeedResponseById } from "../../../utils/apis/needs/Index";
import { getCurrentProfile } from "../../../utils/apis/profile/Index";
function Index() {
  const router = useRouter();
  const results = useQueries<
    [UseQueryResult<NeedEditResponses>, UseQueryResult<ProfileData>]
  >([
    {
      staleTime: Infinity,
      queryKey: ["need", router.query["needId"]],
      enabled: Boolean(router.query["needId"]),
      queryFn: getNeedResponseById,
    },
    { staleTime: Infinity, queryKey: "profile", queryFn: getCurrentProfile },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  const isLoading = !results.every((result) => result.isSuccess);

  return (
    <NgoDashboardFrame>
      {isLoading ? (
        <div className="h-[100vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        results[0].data &&
        results[1].data && (
          <SingleCardDetails
            isEdit={Boolean(router.query["isEdit"])}
            needResponse={results[0].data}
            profile={results[1].data}
          />
        )
      )}
    </NgoDashboardFrame>
  );
}

export default Index;
