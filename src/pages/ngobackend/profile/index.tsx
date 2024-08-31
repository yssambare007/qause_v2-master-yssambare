import { useEffect } from "react";
import { useRouter } from "next/router";
import NgoDashboardFrame from "../../../components/common/NgoDashboardFrame";
import MyProfileDash from "../../../components/myProfile/MyProfileDash";

function Index() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      router.push("/ngo-login");
    }
  }, []);
  return (
    <NgoDashboardFrame>
      <MyProfileDash />
    </NgoDashboardFrame>
  );
}
export default Index;
