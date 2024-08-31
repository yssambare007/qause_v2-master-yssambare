import NgoDashboardFrame from "../../../components/common/NgoDashboardFrame";
import CreatedNeed from "../../../components/ngoBackend/CreatedNeed";
import ActiveNeeds from "../../../components/activeNeeds/Index";
import { useEffect, useState } from "react";
import Pending from "../../../components/activeNeeds/Pending";
import NeedsHistory from "../../../components/activeNeeds/NeedsHistory";
import { useRouter } from "next/router";
function Index() {
  const [tab, setTab] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  const parentChange = (i: any) => {
    setTab(i);
  };
  return (
    <NgoDashboardFrame>
      <CreatedNeed changeTab={parentChange} />
      {tab === "Active" && <ActiveNeeds />}
      {tab === "History" && <NeedsHistory />}
      {tab === "In Progress" && <Pending />}
    </NgoDashboardFrame>
  );
}
export default Index;
