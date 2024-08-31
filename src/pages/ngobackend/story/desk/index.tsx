import { Grid } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import SideBar from "../../../../components/dashboard/SideBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewStories from "../../../../components/ngoBackend/ViewStories";
import { useRouter } from "next/router";
import { base_url } from "../../../../utils/utils";
import Navbar from "../../../../components/navbar/Navbar";
import SeoHeadComponent from "../../../../components/common/SeoHeadComponent";
import { seoContext } from "../../../../utils/seo";

const Desk = () => {
  const [data, setData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
    reloadStories();
  }, []);
  const reloadStories = async () => {
    const res = await fetch(`${base_url}ngo/story/all`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const dataImages = await res.json();
    console.log(dataImages);
    if (dataImages.data) setData(dataImages.data);
  };
  const pushtoAdd = () => {
    if (data.length < 6) {
      router.push("/ngobackend/story/create");
    }
  };

  return (
    <>
      <SeoHeadComponent {...seoContext.Stories} />
      <Navbar />
      <div className="relative">
        <Grid container spacing={0}>
          <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
            <SideBar />
          </Grid>
          <Grid item xl={9.5} lg={9} md={9} sm={12} xs={12} container>
            <Grid item xl={9} lg={8} md={8} sm={12} xs={12}>
              {/* <Desk /> */}
              <div className="flex flex-col items-center justify-center px-[26.4px] pt-5">
                <Image
                  src="/images/add-more-story-desk.png"
                  alt=""
                  width="500"
                  height="0"
                />

                <p className="mt-[50px] font-[muli] text-[18.36px] font-semibold text-[#f5ad00]">
                  You can add {6 - (data.length ? data.length : 0)} more
                  stories.
                </p>

                <p className="mt-[50px] text-center font-[muli] text-[28.16px] font-medium text-[#313131] xs:text-[22px]">
                  Every story needs to be told and we bet you have many!
                </p>

                <button
                  className={`mt-[30px] flex h-[70px] w-full max-w-[276px] items-center justify-center rounded-sm bg-[#061fa3] px-[40px] text-3xl font-medium text-white duration-200 ease-in lg:py-[30px] ${
                    data?.length == 6 ? "opacity-50" : "hover:bg-[#ea6309]"
                  }`}
                  onClick={pushtoAdd}
                >
                  Add Story
                  <AddCircleIcon className="ml-2 text-4xl" />
                </button>
              </div>
            </Grid>
            <Grid item xl={3} lg={4} md={4} sm={12} xs={12} className="mt-2">
              <ViewStories
                imageHeight={"h-24"}
                Events={data}
                onDataReload={reloadStories}
                imageGridClassName={"lg:grid-cols-2"}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Desk;
