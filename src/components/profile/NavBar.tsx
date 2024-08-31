import Image from "next/image";
import { FC, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import OutsideClickHandler from "react-outside-click-handler";
import logo from "../../../public/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import LoginSignModal from "../loginSignUpModal/LoginSignModal";
import Link from "next/link";
import css from "./../navbar/navbar.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import Sidebar from "./../navbar/Sidebar";
import { useQuery } from "react-query";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import { getProfilePictureData } from "../../utils/apis/profile/Index";
import { END_POINTS } from "../../constants/endpoints";
import { S3Bucket } from "../../utils/utils";

interface NavbarProps {
  onSearch?: (searchText: string) => void;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [display, setDisplay] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();
  const closeSideBar = () => {
    setSideBar(false);
  };
  const { data, refetch } = useQuery(
    USE_QUERY_KEYS.fetchProfilePictureData,
    async () => {
      if (!localStorage.getItem("TOKEN")) {
        // alert("No Token")
      } else {
        return getProfilePictureData();
      }
    }
  );
  const logout = () => {
    localStorage.clear();
    refetch();
    router.push("/");
  };

  const handleSearched = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText) {
      if (props.onSearch) props.onSearch(searchText);
    }
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const activeClass =
    "bg-[#091E4224] font-bold text-[#44546F] rounded px-4 py-2";

  return (
    <>
      <main className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#fff] px-[15px] py-[20px] shadow-[0px_0px_6px_0px_rgb(0,0,0,0.18)] lg:p-[15px]">
        <div className="flex items-center">
          <MenuIcon
            sx={{
              fontSize: "3rem",
              mr: "10px",
              color: "#ffc107",
              display: "none",
            }}
            id={css.showMenu}
            onClick={() => setSideBar(true)}
          />
          <Image
            src={logo}
            width={150}
            alt="logo"
            className="mr-14 cursor-pointer"
          />
        </div>
        <div>
          <div className={`flex items-center justify-around gap-4`}>
            <Link
              href="/"
              className={`font-[muli] text-[1rem] ${
                router.pathname === "/" ? activeClass : "hover:text-[#f7a212]"
              }`}
              id="navTab"
            >
              Home
            </Link>

            <Link
              href={END_POINTS.ABOUT_US}
              className={`cursor-pointer font-[muli] text-[1rem] ${
                router.pathname.includes(END_POINTS.ABOUT_US)
                  ? activeClass
                  : "hover:text-[#f7a212]"
              }`}
              id="navTab"
            >
              About Us
            </Link>
            <Link
              href="#"
              className={`cursor-pointer font-[muli] text-[1rem]  ${
                router.pathname.includes("/volunteer")
                  ? activeClass
                  : "hover:text-[#f7a212]"
              }`}
              id="navTab"
            >
              My Gigs
            </Link>
            {!data ? (
              <div className="flex gap-5">
                <div
                  className={`cursor-pointer hover:text-[#f7a212] xs:hidden sm:hidden md:hidden xl:block`}
                  onClick={() => setLoginModal(true)}
                >
                  <button
                    className="rounded-md border border-[#002DC9] px-[15px] py-[5px] text-[#002DC9]"
                    id={css.signIn}
                  >
                    Sign in
                  </button>
                </div>
                <div
                  className={`cursor-pointer pr-[1rem] font-[muli] text-[1rem] hover:text-[#f7a212]`}
                  onClick={() => setSignUpModal(true)}
                >
                  <button className="rounded-md border border-[#002DC9] bg-[#002DC9] px-[15px] py-[5px] text-white">
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <OutsideClickHandler onOutsideClick={() => setDisplay(false)}>
                <div className="relative">
                  {display && (
                    <>
                      <div className=" absolute bottom-[-25px] right-[8px] h-[20px] w-[20px] rotate-45 bg-[#fbfbfb] shadow-lg"></div>
                      <div className="absolute right-[-10px] top-[50px] z-50 min-w-[200px] rounded-lg bg-[#fbfbfb] shadow-lg">
                        <div className="border-b border-gray-400 p-2 text-center text-[14px]">
                          {data.founder?.name}
                        </div>
                        <Link href={END_POINTS.USER_PROFILE}>
                          <div className="flex cursor-pointer items-center border-b border-gray-400 p-2">
                            <PersonIcon
                              sx={{ fontSize: "1.3rem" }}
                              className="mr-2"
                            />
                            <div className="text-center text-[14px]">
                              Profile
                            </div>
                          </div>
                        </Link>
                        <div
                          className="flex cursor-pointer items-center p-2"
                          onClick={logout}
                        >
                          <LogoutIcon
                            sx={{ fontSize: "1.3rem" }}
                            className="mr-2"
                          />
                          <div className="text-center text-[14px]">Logout</div>
                        </div>
                      </div>
                    </>
                  )}

                  <Avatar
                    alt={data.name}
                    onClick={() => setDisplay(!display)}
                    src={`${S3Bucket}${data._id}/${data.images?.logo}`}
                    sx={{
                      border: "1px solid #aaa",
                      cursor: "pointer",
                      background: "none",
                      color: "#212529",
                      fontSize: "0.9rem",
                    }}
                  >
                    {data?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
        {loginModal && (
          <LoginSignModal
            title="Login As"
            HandleFunction={setLoginModal}
          ></LoginSignModal>
        )}
        {signUpModal && (
          <LoginSignModal
            title="Join Us"
            HandleFunction={setSignUpModal}
            isSignUp={true}
          ></LoginSignModal>
        )}
      </main>
      <Sidebar state={sideBar} onClose={closeSideBar} data={data} />
    </>
  );
};

export default Navbar;
