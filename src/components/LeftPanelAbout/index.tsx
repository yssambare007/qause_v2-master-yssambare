import img from "../../../public/images/step-2bg.png";
import Image from "next/image";
import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Cropper from "../common/imageCropper/Index";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  ngoDetailsInitial,
  profileInfoData,
  socialMediaIcon,
  updateProfileData,
} from "../../services/types/models";
import { Dispatch, SetStateAction } from "react";
import { S3Bucket } from "../../utils/utils";

interface LeftPanelAboutProps {
  handleImage?: (FileData: any, File: any) => void;
  ngoImage?: string;
  editable: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setDetailsEdit: Dispatch<SetStateAction<boolean>>;
  detailsEdit: boolean;
  coverImage: string;
  profileData: updateProfileData;
  uniqueWebaddress: profileInfoData;
  name: string;
  profileDataAll: updateProfileData;
  id: string | number;
  inputChange: (name: keyof typeof ngoDetailsInitial, value: string) => void;
}

export const LeftPanelAbout = (props: LeftPanelAboutProps) => {
  const socialMedia: socialMediaIcon[] = [
    {
      name: "Facebook",
      icon: (
        <FacebookOutlinedIcon
          sx={{ color: "blue", fontSize: "1.6rem" }}
          className="absolute bottom-3 right-[6%] cursor-pointer"
        />
      ),
      body: "facebook",
    },
    {
      name: "Instagram",
      icon: (
        <InstagramIcon
          sx={{ color: "#dd92a3", fontSize: "1.6rem" }}
          className="absolute bottom-3 right-[6%] cursor-pointer"
        />
      ),
      body: "instagram",
    },
    {
      name: "Twitter",
      icon: (
        <TwitterIcon
          sx={{ color: "#67daff", fontSize: "1.6rem" }}
          className="absolute bottom-3 right-[6%] cursor-pointer"
        />
      ),
      body: "twitter",
    },
    {
      name: "LinkedIn",
      icon: (
        <LinkedInIcon
          sx={{ color: "##436bb1", fontSize: "1.6rem" }}
          className="absolute bottom-3 right-[6%] cursor-pointer"
        />
      ),
      body: "linkedin",
    },
  ];

  interface InputItemProps {
    Icon: React.ReactNode;
    placeholder: string;
    editable: boolean;
    defaultValue: string;
    onChange: (name: keyof typeof ngoDetailsInitial, value: string) => void;
    property: keyof typeof ngoDetailsInitial;
  }

  const InputItem = (props: InputItemProps) => {
    return (
      <div className="relative my-4 flex w-full justify-center">
        <input
          readOnly={!props.editable}
          className={
            props.editable
              ? "text-md my-1 h-[50px] w-[90%] rounded-lg border-2 p-1 font-bold text-[#898989] focus:outline-0"
              : "h-[50px] w-[90%] rounded-lg border-2 border-black px-2 py-2"
          }
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={(e: any) => props.onChange(props.property, e.target.value)}
        ></input>
        {props.Icon}
        {props.editable ? null : (
          <EditIcon
            className="absolute bottom-3 right-[14%] cursor-pointer"
            sx={{ color: "black", fontSize: "1.6rem" }}
          ></EditIcon>
        )}
      </div>
    );
  };
  console.log(props.coverImage);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <Cropper
            acceptType="image/*"
            disabled={!props.editable}
            onUploadImage={props.handleImage}
            height={200}
            width={300}
          >
            {props.ngoImage === undefined ? (
              <div className="group relative h-[200px] w-[300px]">
                <Image
                  className="h-[200px] w-[300px] rounded-xl object-contain"
                  width={200}
                  height={300}
                  src={props.coverImage ? props.coverImage : ""}
                  alt="founder image"
                ></Image>
                <div
                  className={
                    props.editable
                      ? "absolute bottom-[-10px] right-[5%] flex h-[25px] w-[25px] items-center justify-center rounded-[50%] bg-[#0020d1] transition-all group-hover:opacity-100"
                      : "display-none"
                  }
                >
                  <Edit
                    sx={{
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      color: "#fff",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] w-[200px] cursor-pointer items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] lg:min-w-[300px] xl:min-w-[300px]">
                <div className="text-center">
                  <AddIcon
                    sx={{
                      fontSize: "2rem",
                      textAlign: "center",
                      mb: "5px",
                    }}
                  />
                </div>
              </div>
            )}
          </Cropper>
        </div>
        <h1 className="my-2 text-xl font-black text-black">
          {props.name ? props.name : ""}
        </h1>
      </div>
      <div className="my-10 flex flex-col items-center justify-center">
        <h1 className="font-bolder text-lg text-[#929292]">
          Your Unique Webaddress
        </h1>
        <div className="flex items-center justify-center">
          <h1 className="text-md font-black text-black">
            {props.uniqueWebaddress.value}
          </h1>
          <div className="mx-1 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-[#ccd5f4]">
            <CheckIcon sx={{ color: "", fontSize: "0.9rem" }} />
          </div>
        </div>
        <br />
        {socialMedia.map((item: socialMediaIcon) => {
          const property: keyof typeof ngoDetailsInitial = item.body;
          return (
            <InputItem
              editable={props.detailsEdit}
              key={item.name}
              placeholder={item.name}
              Icon={item.icon}
              defaultValue={
                props.profileDataAll[
                  property as keyof typeof props.profileDataAll
                ]?.value
              }
              onChange={props.inputChange}
              property={property}
            />
          );
        })}
      </div>
    </>
  );
};
