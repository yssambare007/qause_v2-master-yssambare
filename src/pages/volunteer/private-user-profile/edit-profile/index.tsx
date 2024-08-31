import { type NextPage } from "next";
import { useState } from "react";

//Custom Components
import Layout from "../../../../components/layouts/defaultPages/Index";
import BioPage from "../../../../components/volunteer/editProfile/BioPage";
import InfoPage from "../../../../components/volunteer/editProfile/InfoPage";
import InterestPage from "../../../../components/volunteer/editProfile/InterestPage";
import LinksPage from "../../../../components/volunteer/editProfile/LinksPage";
import ProfileTabs from "../../../../components/volunteer/editProfile/ProfileTabs";
import SettingsPage from "../../../../components/volunteer/editProfile/SettingsPage";

const EditProfile: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<
    "Bio" | "Info" | "Interest" | "Links" | "Settings"
  >("Bio");
  return (
    <Layout className="bg-#f9fafb flex w-full flex-col gap-7 pt-10 md:px-40 lg:px-60 lg:pb-56">
      <h1 className="text-3xl">
        <span className="font-extrabold">Edit Profile</span> / {currentTab}
      </h1>
      <div className="flex w-full flex-col md:gap-24 md:flex-row">
        <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="flex flex-1 flex-col">
          {currentTab === "Bio" && <BioPage />}
          {currentTab === "Info" && <InfoPage />}
          {currentTab === "Interest" && <InterestPage />}
          {currentTab === "Links" && <LinksPage />}
          {currentTab === "Settings" && <SettingsPage />}
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
