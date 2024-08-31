import { useState } from "react";
import Navbar from "../../components/profile/NavBar";
import SideBar from "../../components/profile/SideBar";
import Footer from "./../../components/dashboard/Footer";
import Main from "../../components/profile/Main";
import Image from "next/image";
import MyTask from "../../components/profile/MyTask";

import MyTaskIcon from "./../../../public/images/profile/myTask.svg";
import MyProfileImg from "./../../../public/images/profile/myProfile.svg";
import MyProfile from "../../components/profile/MyProfile";

export interface ActiveTab {
  title: string;
  icon: any;
  id: string
}

const sideNavs: ActiveTab[] = [
  {
    title: "My Tasks",
    icon: MyTaskIcon,
    id: "MY_TASK",
  },
  {
    title: "My Profile",
    icon: MyProfileImg,
    id: "MY_PROFILE"
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab | undefined>(sideNavs[0]);


  return (
    <div className="bg-[#CCD5F4]">
      <Navbar />
      <div className="grid max-w-screen-2xl grid-cols-12 p-8 m-auto">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} options={sideNavs} />
        <Main>
          {getScreen(activeTab?.id)}
        </Main>
      </div>
      <div>
        <Image
          src={"/images/profile/footerText.svg"}
          alt="get in touch"
          width={535.89}
          height={116.15}
          style={{ marginLeft: "auto", marginRight: "65px", marginBottom: "15px" }}
        />
      </div>
      <Footer />
    </div>
  );
};


const getScreen = (id: string | undefined) => {
  switch(id) {
    case "MY_TASK":
      return <MyTask />;
    case "MY_PROFILE":
      return <MyProfile />;
    default:
      return <MyTask />;
  }
};

export default Profile;
