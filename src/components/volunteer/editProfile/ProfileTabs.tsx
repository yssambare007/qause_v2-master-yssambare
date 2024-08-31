import React from "react";

interface ProfileTabsProps {
  currentTab: "Bio" | "Info" | "Interest" | "Links" | "Settings";
  setCurrentTab: React.Dispatch<
    React.SetStateAction<"Bio" | "Info" | "Interest" | "Links" | "Settings">
  >;
}

const tabs = [
  {
    name: "Bio",
    type: "Bio",
  },
  {
    name: "Personal Info",
    type: "Info",
  },
  {
    name: "Interest",
    type: "Interest",
  },
  {
    name: "Links",
    type: "Links",
  },
  {
    name: "Account Settings",
    type: "Settings",
  },
];

const ProfileTabs = ({ currentTab, setCurrentTab }: ProfileTabsProps) => {
  return (
    <div className="flex max-w-full flex-row items-start overflow-x-auto bg-white md:w-64 md:flex-col">
      {tabs.map((tab, i) => (
        <button
          className={`min-w-fit border-b border-gray-300 px-3 py-3 text-left text-sm md:min-w-full ${
            tabs.length === i + 1 && "border-b-0"
          } ${currentTab === tab.type && "bg-gray-100 text-blue-600"}`}
          onClick={() => setCurrentTab(tab.type as typeof currentTab)}
          key={tab.name}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
