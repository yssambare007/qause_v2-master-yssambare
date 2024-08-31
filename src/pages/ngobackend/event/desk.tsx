import { Grid } from "@mui/material";
import SideBar from "../../../components/dashboard/SideBar";
import EventDash from "../../../components/myProfile/EventsComponent";
import Navbar from "../../../components/navbar/Navbar";
import SeoHeadComponent from "../../../components/common/SeoHeadComponent";
import { seoContext } from "../../../utils/seo";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  return (
    <>
      <SeoHeadComponent {...seoContext.Event} />
      <Navbar />
      <div className="relative">
        <Grid container spacing={0}>
          <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
            <SideBar />
          </Grid>
          <Grid item xl={9.5} lg={9} md={9} sm={12} xs={12} container>
            <EventDash />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Index;
