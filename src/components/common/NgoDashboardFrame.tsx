import { CircularProgress, Grid } from "@mui/material";
import { useAuthRedirect } from "../../utils/hooks";
import SideBar from "../dashboard/SideBar";
import Navbar from "../navbar/Navbar";

interface NgoDashboardFrameProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}
const NgoDashboardFrame = (props: NgoDashboardFrameProps) => {
  const isAuthenticated = useAuthRedirect();
  return (
    <>
      <Navbar />
      <div className="flex min-h-full justify-center bg-[#ccd5f4]">
        <div className="my-10 min-h-full w-[95%] rounded-xl bg-[#f5f7fb] p-5">
          <Grid container spacing={0}>
            <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
              <SideBar />
            </Grid>
            <Grid item xl={9.5} lg={9} md={9} sm={12} xs={12}>
              {isAuthenticated ? (
                <>
                  {props.title && (
                    <h2 className="my-5 ml-10 text-lg font-semibold text-[#8f9091]">
                      {props.title}
                    </h2>
                  )}
                  {props.subtitle && (
                    <>
                      <h1 className="mb-2 ml-[50px] text-xl font-black">
                        {props.subtitle}
                      </h1>
                    </>
                  )}
                  <div className="flex justify-center">
                    <div className="border-black-600 w-[95%] rounded-xl border-2 bg-[#fff] shadow-lg">
                      {props.children}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-[100vh] w-full items-center justify-center">
                  <CircularProgress />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
export default NgoDashboardFrame;
