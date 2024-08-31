import { useEffect } from "react";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import NGOBankDetails from "../../../../components/ngoBackend/profile/BankDetails";

const Bank = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  return (
    <NgoDashboardFrame>
      <DetailsFrame>
        <NGOBankDetails />
      </DetailsFrame>
    </NgoDashboardFrame>
  );
};

export default Bank;
