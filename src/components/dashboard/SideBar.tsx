import React from "react";
import { END_POINTS } from "../../constants/endpoints";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import GridViewIcon from "@mui/icons-material/GridView";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { myProfileLinks } from "../../constants/constants";

const SideBarItems = () => {
  const router = useRouter();
  const sideBarItems = {
    "MY DASHBOARD": {
      rootPath: END_POINTS.DASHBOARD,
      highlightPaths: [END_POINTS.DASHBOARD],
    },
    "MY PROFILE": {
      rootPath: END_POINTS.PROFILE,
      highlightPaths: [
        END_POINTS.PROFILE,
        END_POINTS.EVENT_CREATE,
        END_POINTS.EVENT_DESK,
        END_POINTS.EVENT_VIEW,
        END_POINTS.STORY_DESK,
        END_POINTS.STORY_CREATE,
        END_POINTS.STORY_VIEW,
        END_POINTS.STORY_ADD,
        END_POINTS.GALLERY,
        END_POINTS.CREDITS,
        END_POINTS.ABOUT_FOUNDER,
        END_POINTS.ABOUT_NGO,
        END_POINTS.BANK,
        END_POINTS.KYC_DETAILS,
        END_POINTS.TRANSACTIONS,
      ],
    },
    "MY NEEDS": {
      rootPath: END_POINTS.NEEDS_DASHBOARD,
      highlightPaths: [
        END_POINTS.NEEDS_DASHBOARD,
        END_POINTS.NEEDS,
        END_POINTS.NEEDS_SERVICE,
      ],
    },
  };

  return (
    <ul>
      {Object.entries(sideBarItems).map(([label, path]) => (
        <div key={label}>
          <li
            className={`mb-[3rem] ${
              label === "MY PROFILE" &&
              path.highlightPaths.includes(router.pathname)
                ? "bg-[#C0CAFF33]"
                : ""
            } rounded-bl-lg rounded-br-lg rounded-tl-[18px] rounded-tr-[18px]`}
          >
            <Link key={label} href={path.rootPath}>
              <div
                className={`${
                  path.highlightPaths.includes(router.pathname)
                    ? "bg-[#FFFFFF] text-black"
                    : "text-white"
                }  flex cursor-pointer content-center items-center space-x-1 rounded-full px-[1.3rem] py-[1rem] text-sm font-bold hover:text-black md:text-xs`}
              >
                <div className="flex">
                  {label == "MY DASHBOARD" ? (
                    <GridViewIcon fontSize="small" />
                  ) : label == "MY PROFILE" ? (
                    <UserOutlined />
                  ) : (
                    <NotificationsActiveIcon />
                  )}
                </div>
                <div>{label}</div>
              </div>
            </Link>

            <div
              className={`${
                path.highlightPaths.includes(router.pathname) &&
                label == "MY PROFILE"
                  ? ""
                  : "hidden"
              } flex flex-col items-center text-white`}
            >
              <div className={"flex w-[98%] flex-col p-[1rem]"}>
                {Object.entries(myProfileLinks).map(([name, secPath]) => (
                  <Link
                    key={name}
                    className={` p-[.2rem] hover:text-black ${
                      secPath.secPath == router.pathname ? "bg-[#677DF9]" : ""
                    }  rounded-md text-white`}
                    href={`${secPath.secPath}`}
                  >
                    {secPath.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};

function SideBar() {
  return (
    <div
      className="relative  bg-[#253DC0] px-[3rem] pt-20"
      style={{ height: "calc(100vh - 78px)" }}
      id="dashboardSideBar"
    >
      <div></div>
      {/* <div className="absolute bottom-2 flex w-[75%] items-center rounded-full bg-[#253DC0] p-1 pr-11">
        <div className="relative mr-6">
          <div className="w-10 h-10">
            <Image fill src="/images/helpdesk-icon-img.svg" alt="helpdesk" />
          </div>
          <div className="absolute top-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-white bg-[green]"></div>
        </div>
        <div className="font-extralight">
          <div className="text-sm mb-2 text-white">Customer Care</div>
          <div className="flex items-center">
            <CallIcon
              sx={{ color: "[#00000091", fontSize: "1.2rem", mr: "5px" }}
              className="rounded-full bg-[#00000091] p-1"
            />
            <div className="text-sm text-white">9119333999</div>
          </div>
        </div>
      </div> */}
      <SideBarItems />
    </div>
  );
}

export default SideBar;
