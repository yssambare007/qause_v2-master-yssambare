import { Grid } from "@mui/material";
import SideBar from "../../../../components/dashboard/SideBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../../components/navbar/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AddStory = () => {
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
          <Grid item xl={9.5} lg={9} md={9} sm={12} xs={12}>
            <div
              style={{ height: "calc(100vh - 78px)" }}
              className="overflow-y-auto"
            >
              {/* <Add Story /> */}
              <div className="relative p-[26.4px]">
                <div className="z-10">
                  <p className="z-40 mb-[40px] font-[muli] text-[45.76px] font-semibold xs:text-[35.44px] sm:text-[37.44px]">
                    Add Inspirational Stories
                  </p>

                  <div className="font-[muli] text-[28.16px] font-normal xs:text-[23.04px] sm:text-[23.04px]">
                    <span>The world out there is waiting to</span>
                    <br />
                    <span>know you better!</span>
                  </div>
                  <Link href="/ngobackend/story/create">
                    <button className="mt-[70px] block h-[67px] w-full max-w-[276px] rounded-sm bg-[#061fa3] text-3xl font-medium text-white duration-200 ease-in hover:bg-[#ea6309]">
                      Add Story
                      <AddCircleIcon className="ml-2 text-4xl" />
                    </button>
                  </Link>
                </div>

                <Image
                  src="/images/story-add-side-image.png"
                  alt=""
                  width="350"
                  height="350"
                  className="absolute right-0 top-1 z-0 opacity-0 lg:opacity-100"
                />

                <div className="mt-[100px]">
                  <div className="mb-[4.4px] text-center font-[muli] text-[26.4px] font-semibold xs:text-[21.6px] sm:text-[21.6px]">
                    <span>Follow 3 simple steps to connect</span>
                    <hr className="opacity-0" />
                    <span>with the world through your stories</span>
                    <div className="m-auto mt-[14px] block h-[2.5px] w-[99px] bg-[#313131]"></div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="mx-auto px-[15px] md:w-[394px]">
                      <Image
                        src="/images/got-story-to-tell.png"
                        width="306"
                        height="259"
                        alt={""}
                        className="mx-auto"
                      />
                      <p className="text-center font-[muli] text-xl leading-6 text-[#080808] xs:text-[17.28px] sm:text-[17.28px]">
                        Got a story to tell? Write here. (Upto 350 words)
                      </p>
                    </div>

                    <div className="mx-auto px-[15px] md:w-[394px]">
                      <Image
                        src="/images/upload-profile-pic.png"
                        width="306"
                        height="259"
                        alt={""}
                        className="mx-auto"
                      />
                      <p className="text-center font-[muli] text-xl leading-6 text-[#080808] xs:text-[17.28px] sm:text-[17.28px]">
                        Upload Profile Picture
                      </p>
                    </div>

                    <div className="mx-auto px-[15px] md:w-[394px]">
                      <Image
                        src="/images/got-more-picture.png"
                        width="306"
                        height="259"
                        alt={""}
                        className="mx-auto"
                      />
                      <p className="text-center font-[muli] text-xl leading-6 text-[#080808] xs:text-[17.28px] sm:text-[17.28px]">
                        Got more pictures for the story? Add Here (Max 3
                        pictures)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddStory;
