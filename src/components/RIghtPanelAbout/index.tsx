import { Grid, SelectChangeEvent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Dispatch, SetStateAction } from "react";
import {
  CategoryType,
  contactType,
  ngoDetailsInitial,
  updateProfileData,
} from "../../services/types/models";
import { DropDown } from "../DropDown";

interface RightPanelAboutProps {
  editable: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setDetailsEdit: Dispatch<SetStateAction<boolean>>;
  detailsEdit: boolean;
  editBio: (value: string) => void;
  submit: () => void;
  profileData: updateProfileData;
  categories: CategoryType[];
  handleDropdownChange: (event: SelectChangeEvent<string[]>) => void;
  handleDropdownChangeSubCategories: (
    event: SelectChangeEvent<string[]>
  ) => void;
  selectedCategories: string[];
  selectedSubCategories: string[];
  subCategories: string[];
  bio: string;
  inputChange: (name: keyof typeof ngoDetailsInitial, value: string) => void;
  onSubmit: () => void;
}
export const RightPanelAbout = (props: RightPanelAboutProps) => {
  const address: contactType[] = [
    {
      label: "Address",
      value: "Spice Garden, Marathahalli",
      body: "street",
      bodyType: "street",
    },
    {
      label: "State",
      value: "Karnataka",
      body: "state",
      bodyType: "state",
    },
    {
      label: "City",
      value: "Bengaluru",
      body: "city",
      bodyType: "city",
    },
    {
      label: "Country",
      value: "Bengaluru",
      body: "country",
      bodyType: "country",
    },
    {
      label: "Facility",
      value: "Lorem Ipsem",
      body: "facilities",
      bodyType: "facilities",
    },
  ];
  const contact: contactType[] = [
    {
      label: "Registered Number",
      value: "1234567890",
      body: "registeredNumber",
      bodyType: "mobile",
    },
    {
      label: "Public Phone Number",
      value: "1234567890",
      body: "publicMobile",
      bodyType: "publicMobile",
    },
    {
      label: "Registered Email Id",
      value: "ngoforyou@gmail.com",
      body: "registeredEmailId",
      bodyType: "email",
    },
    {
      label: "Public Email Id",
      value: "ngoforyou@gmail.com",
      body: "publicEmail",
      bodyType: "publicEmail",
    },
    {
      label: "NGO Website",
      value: "www.ngo.com",
      body: "ngoWebsite",
      bodyType: "ownWebsite",
    },
  ];
  return (
    <Grid className="h-fit" container>
      <Grid className="border-b-2" item xs={12}>
        <div className="flex justify-between">
          <h1 className="ml-5 text-lg font-black text-black">Bio</h1>
          <div
            onClick={() => props.setEdit(!props.editable)}
            className={
              !props.editable
                ? "mr-5 flex h-[30px] w-[45px] cursor-pointer items-center justify-center rounded-xl border-2 border-black"
                : "mr-5 flex h-[30px] w-[65px] cursor-pointer items-center justify-center rounded-xl border-2 border-black"
            }
          >
            {props.editable ? (
              "cancel"
            ) : (
              <EditIcon
                sx={{ color: "black", display: !props.editable ? "" : "none" }}
                fontSize="small"
              />
            )}
          </div>
        </div>
        <div className="my-5 flex flex-col items-center justify-center">
          <textarea
            onChange={(e) => props.editBio(e.target.value)}
            readOnly={!props.editable}
            className="w-[95%] resize-none rounded-xl border-2  border-black p-3"
            placeholder="Your text goes here..."
            cols={40}
            rows={4}
            defaultValue={props.bio}
          ></textarea>
          {props.editable && (
            <button
              onClick={props.submit}
              className="my-10 flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] p-5 font-bold text-white"
            >
              Save Changes
            </button>
          )}
        </div>
      </Grid>
      <Grid className="my-5 border-b-2" item xs={12}>
        <div className="flex justify-between">
          <h1 className="ml-5 text-lg font-black text-black">
            Contact Details
          </h1>
          <div
            onClick={() => props.setDetailsEdit(!props.detailsEdit)}
            className={
              props.detailsEdit
                ? "mr-5 flex h-[30px] w-[65px] cursor-pointer items-center justify-center rounded-xl border-2 border-black"
                : "mr-5 flex h-[30px] w-[45px] cursor-pointer items-center justify-center rounded-xl border-2 border-black"
            }
          >
            {props.detailsEdit ? (
              "Cancel"
            ) : (
              <EditIcon sx={{ color: "black" }} fontSize="small" />
            )}
          </div>
        </div>
        <Grid container item>
          {contact.map((item: contactType, index: number) => {
            const property: string = item.body;
            return (
              <Grid
                key={index}
                className="my-6 flex flex-col px-5"
                xs={12}
                md={6}
                lg={4}
                item
              >
                <h1 className="text-md font-extrabold text-[#898989]">
                  {item.label}
                </h1>
                <input
                  readOnly={!props.detailsEdit}
                  className={
                    props.detailsEdit
                      ? "text-md my-1 rounded-lg border-2 p-1 font-bold text-[#898989] focus:outline-0"
                      : "text-md p-1 font-semibold focus:outline-0"
                  }
                  defaultValue={
                    props.profileData[
                      property as keyof typeof props.profileData
                    ]?.value
                  }
                  onChange={(e: any) =>
                    props.inputChange(item.bodyType, e.target.value)
                  }
                ></input>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid className="mt-5" item xs={12}>
        <div className="flex justify-between">
          <h1 className="ml-5 text-lg font-black text-black">Address</h1>
        </div>
        <Grid container item>
          {address.map((item: contactType, index: number) => {
            const property: string = item.body;
            return (
              <Grid
                key={index}
                className="my-6 flex flex-col px-5"
                xs={12}
                md={6}
                lg={4}
                item
              >
                <h1 className="text-md font-extrabold text-[#898989]">
                  {item.label}
                </h1>
                <input
                  readOnly={!props.detailsEdit}
                  className={
                    props.detailsEdit
                      ? "text-md my-1 rounded-lg border-2 p-1 font-bold text-[#898989] focus:outline-0"
                      : "text-md p-1 font-semibold focus:outline-0"
                  }
                  defaultValue={
                    props.profileData[
                      property as keyof typeof props.profileData
                    ]?.value
                  }
                  onChange={(e: any) =>
                    props.inputChange(item.bodyType, e.target.value)
                  }
                ></input>
              </Grid>
            );
          })}
          <Grid className="my-6 flex flex-col px-5" xs={12} md={6} lg={4} item>
            <h1 className="text-md font-extrabold text-[#898989]">
              Categories
            </h1>
            {props.detailsEdit ? (
              <DropDown
                label="Categories"
                selected={props.selectedCategories}
                handleChange={props.handleDropdownChange}
                size={"sm"}
                isMulti={true}
                options={props.categories}
              />
            ) : (
              <input
                readOnly={!props.detailsEdit}
                className={
                  "my-1 w-[200px] overflow-x-scroll p-1 text-sm font-bold text-[#000] focus:outline-0"
                }
                defaultValue={props.selectedCategories.toString()}
              ></input>
            )}
          </Grid>
          <Grid className="my-6 flex flex-col px-5" xs={12} md={6} lg={4} item>
            <h1 className="text-md font-extrabold text-[#898989]">
              Sub Categories
            </h1>
            {props.detailsEdit ? (
              <DropDown
                label="Categories"
                selected={props.selectedSubCategories}
                handleChange={props.handleDropdownChangeSubCategories}
                size={"sm"}
                isMulti={true}
                options={props.subCategories}
              />
            ) : (
              <input
                readOnly={!props.detailsEdit}
                className={
                  "my-1 w-[200px] overflow-x-scroll p-1 text-sm font-bold text-[#000] focus:outline-0"
                }
                defaultValue={props.selectedSubCategories.toString()}
              ></input>
            )}
          </Grid>
        </Grid>
        <Grid container item className="flex justify-center">
          {props.detailsEdit && (
            <button
              onClick={props.onSubmit}
              className="my-10 flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] p-5 font-bold text-white"
            >
              Save Changes
            </button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
