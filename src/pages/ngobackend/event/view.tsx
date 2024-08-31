import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SideBar from "../../../components/dashboard/SideBar";
import ViewEvent from "../../../components/myProfile/ViewComponent";
import Navbar from "../../../components/navbar/Navbar";

function Index() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  return (
    <>
      <Navbar />
      <div className="relative">
        <Grid container spacing={0}>
          <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
            <SideBar />
          </Grid>
          <Grid
            style={{ height: "calc(100vh - 80px)" }}
            className="overflow-y-auto"
            item
            xl={9.5}
            lg={9}
            md={9}
            sm={12}
            xs={12}
            container
          >
            <ViewEvent />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Index;
