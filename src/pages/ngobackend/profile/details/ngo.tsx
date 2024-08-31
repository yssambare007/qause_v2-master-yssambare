import { useCallback, useEffect, useState } from "react";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import { Checkbox, Grid, SelectChangeEvent } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useQuery } from "react-query";
import {
  getAllCategories,
  getCurrentProfile,
} from "../../../../utils/apis/profile/Index";
import {
  base_url,
  capitalizeEachFirstLetter,
  S3Bucket,
} from "../../../../utils/utils";
import NextImage from "next/image";
import {
  ngoDetailsInitial,
  type CategoryType,
  type ngoDetailsInitialType,
  type profileInfoData,
  type updateImageData,
  type updateProfileData,
} from "../../../../services/types/models";
import OutsideClickHandler from "react-outside-click-handler";
import ResponseModal from "../../../../components/common/ResponseModal";
import AutoComplete from "../../../../components/autoComplete/Autocomplete";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";
import { useRouter } from "next/router";
import { LeftPanelAbout } from "../../../../components/LeftPanelAbout";
import { RightPanelAbout } from "../../../../components/RIghtPanelAbout";

const _updateData: updateProfileData = {
  ngoWebsite: {
    label: "Ngo Website",
    value: "",
  },
  name: {
    label: "Name",
    value: "",
  },
  city: {
    label: "City",
    value: "",
  },
  ngoEmail: {
    label: "NGO Website",
    value: "",
  },
  registeredEmailId: {
    value: "",
    label: "Registered Email Id",
  },
  registeredNumber: {
    label: "Registered Mobile Number",
    value: "",
  },
  publicEmail: {
    label: "Public Email",
    value: "",
  },
  publicMobile: {
    label: "Public Mobile",
    value: "",
  },
  state: {
    label: "State",
    value: "",
  },
  country: {
    label: "Country",
    value: "",
  },
  ownWebsite: {
    label: "Your Own Webaddress",
    value: "",
  },
  category: {
    label: "Category",
    value: "",
  },
  subCategories: {
    label: "Sub Category",
    value: "",
  },
  facilities: {
    label: "Facilities",
    value: "",
  },
  facebook: {
    label: "Facebook",
    value: "",
  },
  instagram: {
    label: "Instagram",
    value: "",
  },
  twitter: {
    label: "Twitter",
    value: "",
  },
  linkedIn: {
    label: "LinkedIn",
    value: "",
  },
  address: {
    label: "Address",
    value: "",
  },
};

const _updateImageData: updateImageData = {
  aboutNgo: "",
  coverImage: "",
};

const Ngo = () => {
  const router = useRouter();
  const { data } = useQuery("profile", getCurrentProfile);
  const allCategories = useQuery("allCategories", getAllCategories);
  const inputChange = (name: keyof typeof ngoDetailsInitial, value: string) => {
    ngoDetailsInitial[name] = value;
  };

  console.log(data);

  const [onSubmitPopup, setOnSubmitPopup] = useState(false);

  // const imageParse = (fileData: File, file: File) => {
  //   const imgurl = window.URL.createObjectURL(fileData);
  //   setUpdatedImageData((prev) => ({
  //     ...prev,
  //     coverImage: imgurl,
  //     imgFile: file,
  //   }));
  // };

  const imageParse = useCallback((file: File, fileData: File) => {
    const imgurl = window.URL.createObjectURL(fileData);
    setUpdatedImageData((prev) => ({
      ...prev,
      coverImage: imgurl,
      imgFile: file,
    }));
  }, []);

  const EditBio = (value: string) => {
    setUpdatedImageData((prev) => ({
      ...prev,
      aboutNgo: value,
    }));
  };

  const [editDetails, setEditDetails] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState<CategoryType[]>(
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
    if (data) {
      const updatedData: updateProfileData = {
        registeredNumber: {
          label: "Registered Mobile Number",
          value: data?.mobile,
        },
        name: {
          label: "Name",
          value: data?.name,
        },
        registeredEmailId: {
          label: "Registered Email Id",
          value: data?.email,
        },
        address: {
          label: "Addresss",
          value: data?.address?.street,
        },
        city: {
          label: "City",
          value: data?.address?.city,
        },
        publicEmail: {
          label: "Public Email Id",
          value: data?.publicEmail,
        },
        publicMobile: {
          label: "Public Phone Number",
          value: data?.publicMobile,
        },
        ngoWebsite: {
          label: "Ngo Website",
          value: data?.ownWebsite,
        },
        ownWebsite: {
          value: "www.qause.com/ngo/" + data?.website,
          label: "Your Own Webaddress",
        },
        country: {
          value: data?.address?.country,
          label: "Country",
        },
        state: {
          value: data?.address?.state,
          label: "State",
        },
        category: {
          value: data.category?.name,
          label: "Category",
        },
        subCategories: {
          value: data?.category?.subCategories?.join(","),
          label: "Sub Category",
        },
        facilities: {
          value: data?.facilities?.join(","),
          label: "Facility",
        },
        facebook: {
          value: data?.social?.facebook,
          label: "Facebook",
        },
        instagram: {
          value: data?.social?.instagram,
          label: "Instagram",
        },
        twitter: {
          value: data?.social?.twitter,
          label: "Twitter",
        },
        linkedIn: {
          value: data?.social?.linkedin,
          label: "LinkedIn",
        },
        ngoEmail: {
          label: "NGO Email",
          value: data?.ngoEmail,
        },
      };

      if (allCategories) {
        setCategoriesOptions(allCategories.data);
        setSelectedCategories([data?.category?.name]);
        setSelectedSubCategories([data?.category?.subCategories]);
        // setSelectedCategories([allCategories?.data[0].name]);
        // setSelectedSubCategories([allCategories?.data[0].subCategories]);
        subcats.concat(data?.categories?.subCategories);
        // setSelectedSubCategories([...allCategories?.data[0].subCategories]);
      }

      const updatedImageData: updateImageData = {
        coverImage:
          data.images?.cover && `${S3Bucket}${data._id}/${data?.images?.cover}`,
        aboutNgo: data.story?.text && data?.story?.text,
      };

      setUpdatedData(updatedData);
      setUpdatedImageData(updatedImageData);
    }
  }, [allCategories.data, data]);

  const [updatedData, setUpdatedData] =
    useState<updateProfileData>(_updateData);

  const [updatedImageData, setUpdatedImageData] =
    useState<updateImageData>(_updateImageData);

  const SubmitProfile = async () => {
    const form: any = new FormData();
    form.append("aboutNgo", updatedImageData.aboutNgo);
    form.append("coverImage", updatedImageData.imgFile);
    const _storyDetails = await fetch(`${base_url}ngo/${data._id}/ngo`, {
      method: "PUT",
      body: form,
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    if (_storyDetails.status == 200) {
      setOnSubmitPopup(true);
    }
  };

  async function onSubmit() {
    const _profileDetails = await fetch(`${base_url}ngo/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(ngoDetailsInitial),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    if (_profileDetails.status == 200) {
      setOnSubmitPopup(true);
      setEditDetails(false);
    }
  }

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [subcats, setSubcats] = useState<string[]>([]);

  //function to show only subcategories for selected allCategories

  const selectSubCategories = (arr: string | string[]) => {
    allCategories.data.forEach((item: any) => {
      if (arr.includes(item.name)) {
        subcats.push(...item.subCategories);
      }
    });
  };

  const handleChangeDropdown = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    ngoDetailsInitial["categories"] = event.target.value.toString();

    selectSubCategories(event.target.value);
  };

  const handleChangeDropdownSubCategories = (
    event: SelectChangeEvent<typeof selectedSubCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSubCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    ngoDetailsInitial["subCategories"] = event.target.value.toString();
  };

  return (
    <NgoDashboardFrame title="Edit Profile" subtitle="About">
      <Grid className="my-10" container>
        <Grid className="border-r border-black" item xs={12} lg={4}>
          <LeftPanelAbout
            profileDataAll={updatedData}
            name={data?.name}
            uniqueWebaddress={updatedData.ownWebsite}
            profileData={updatedData}
            coverImage={
              updatedImageData.coverImage
                ? updatedImageData.coverImage
                : `${S3Bucket}${data?._id}/${data?.images?.logo}`
            }
            handleImage={imageParse}
            detailsEdit={editDetails}
            setDetailsEdit={setEditDetails}
            editable={editProfile}
            setEdit={setEditProfile}
            id={data?._id}
            inputChange={inputChange}
          />
        </Grid>
        <Grid container item xs={12} lg={8}>
          <RightPanelAbout
            onSubmit={onSubmit}
            inputChange={inputChange}
            bio={data?.story.text}
            subCategories={[...new Set(subcats)]}
            handleDropdownChangeSubCategories={
              handleChangeDropdownSubCategories
            }
            selectedSubCategories={selectedSubCategories}
            handleDropdownChange={handleChangeDropdown}
            selectedCategories={selectedCategories}
            categories={categoriesOptions}
            profileData={updatedData}
            submit={SubmitProfile}
            editBio={EditBio}
            detailsEdit={editDetails}
            setDetailsEdit={setEditDetails}
            editable={editProfile}
            setEdit={setEditProfile}
          />
        </Grid>
      </Grid>

      <ResponseModal
        open={onSubmitPopup}
        handleClose={() => setOnSubmitPopup(false)}
        title={"NGO Updated Successfully"}
      />
    </NgoDashboardFrame>
  );
};

export default Ngo;
