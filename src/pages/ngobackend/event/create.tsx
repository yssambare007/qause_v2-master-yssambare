import { Grid } from "@mui/material";
import SideBar from "../../../components/dashboard/SideBar";
import EventCreate from "../../../components/myProfile/CreateComponent";
import Navbar from "../../../components/navbar/Navbar";
import SeoHeadComponent from "../../../components/common/SeoHeadComponent";
import { seoContext } from "../../../utils/seo";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Index() {
  const seo = seoContext.Event;
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  return (
    <>
      <SeoHeadComponent {...seo} />
      <Navbar />
      <div className="relative">
        <Grid container spacing={0}>
          <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
            <SideBar />
          </Grid>
          <Grid item xl={9.5} lg={9} md={9} sm={12} xs={12}>
            <div
              style={{ height: "calc(100vh - 78px)" }}
              className="overflow-y-auto"
            >
              <EventCreate />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Index;
