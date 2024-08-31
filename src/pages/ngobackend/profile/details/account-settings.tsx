import { useEffect } from "react";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import AccountSettings from "../../../../components/profile/AccountSettings";
import { useQuery } from "react-query";
import { getPlans } from "../../../../utils/apis/profile/Index";

const AccountSettingsPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  });  
  return (
    <NgoDashboardFrame>
      <DetailsFrame>
        <AccountSettings />
      </DetailsFrame>
    </NgoDashboardFrame>
  );
};

export default AccountSettingsPage;
