import MyProfileImg from "./../../../public/images/profile/myProfile.svg";
import MyTask from "./../../../public/images/profile/myTask.svg";
import MyAccountSettings from "./../../../public/images/profile/myAccountSettings.svg";
import { SetStateAction } from "react";
import { ActiveTab } from "../../pages/profile";

interface SideBarProps {
  activeTab: ActiveTab | undefined;
  setActiveTab: React.Dispatch<SetStateAction<ActiveTab | undefined>>;
  options: ActiveTab[];
}

export default function SideBar(props: SideBarProps) {
  return (
    <div className="col-span-3 rounded-l-lg bg-[#253DC0] px-5 py-8">
      <h3 className="mb-8 px-5 font-bold text-white">Profile</h3>

      <ul className="list-none">
        {props.options.map((option) => (
          <li
            key={option.id}
            onClick={() => {
              props.setActiveTab(option);
            }}
            className="my-2"
          >
            <div
              className={`profile-sidebar-option flex items-center rounded-full px-5 pb-3 pt-2 ${
                option.title === props.activeTab?.title
                  ? "profile-side-option-active"
                  : ""
              }`}
            >
              <option.icon className="mr-2" />
              <p className="text-white">{option.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
