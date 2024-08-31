import { useRouter } from "next/router";
import { useEffect } from "react";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import NeedsDashboard from "../../../../components/needs/dashboard/NeedsDashboard";

function Index() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  return (
    <NgoDashboardFrame>
      <NeedsDashboard />
    </NgoDashboardFrame>
  );
}
export default Index;
