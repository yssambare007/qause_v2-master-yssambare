import EditableContainer from "./EditableContainer";
import LocationIcon from "./../../../public/images/profile/location.svg";
import FacebookIcon from "./../../../public/images/profile/facebookIcon.svg";
import InstagramIcon from "./../../../public/images/profile/instagramIcon.svg";
import TwitterIcon from "./../../../public/images/profile/twitterIcon.svg";
import Linkdin from "./../../../public/images/profile/linkedinIcon.svg";
import { useCallback, useEffect, useState } from "react";
import EditableProfile from "./EditableProfile";
import EditablePersonalInfo from "./EditablePersonalInfo";
import AddIcon from "@mui/icons-material/Add";
import EditableLocation from "./EditableLocation";
import EditableBio from "./EditableBio";
import EditablePortfolio from "./EditablePortfolio";
import Edit from "@mui/icons-material/Edit";
import EditableSocials from "./EditableSocials";
import Cropper from "../../components/common/imageCropper/Index";
import Image from "next/image";
import { AlertColor, Button } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { base_url } from "../../utils/utils";
import { EMPTY_STRING } from "../../constants/constants";
import moment from "moment";
import AlertComp from "../Alert";
import Loader from "../Loader";
import defaultImg from "../../../public/images/woman-verified.png"
function MyProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonalinfo, setIsEditingPersonalInfo] = useState(false);
  const [profileName, setProfileName] = useState("Viswanath M");
  const [personalInfoName, setPersonalInfoName] = useState("Viswanath");
  const [description, setDescription] = useState("Lorem Ipsum | 24-04-2023");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("www.xyz@gmail.com");
  const [phone, setPhone] = useState("8928878973");
  const [gender, setGender] = useState("Male");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [facility, setFacility] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState("Your bio goes here..");
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [FbLink, setFbLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [lat, setLat] = useState<string | number>(EMPTY_STRING);
  const [long, setLong] = useState<string | number>(EMPTY_STRING);
  const [errorMsg, setErrorMsg] = useState<string>(EMPTY_STRING);
  const [severity, setSeverity] = useState<AlertColor>("success")
  const [loading, setLoading] = useState(false)

  //GET USER PROFILE
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  function onClose(){
    setErrorMsg(EMPTY_STRING)
  }

  function setEmpty(){
    setTimeout(()=>{
      setErrorMsg(EMPTY_STRING)
    },3000)
  }

  async function fetchUser() {
    setLoading(true)
    const username = localStorage.getItem("USER");
    if (username) {
      try {
        const data = await fetch(`${base_url}v2/volunteer/profile/${username}`);
        return data.json();
      } catch (err) {
        setErrorMsg("Something went wrong");
        setSeverity("error")
        setEmpty()
      } finally{
        setLoading(false);
      }
    } else {
      setErrorMsg("Something went wrong");
      setSeverity("error")
      setEmpty()
      setLoading(false);
    }
  }

  const [imageVol, setImageVol] = useState<{
    file: File | null;
    imageUrl: string;
  }>({ file: null, imageUrl: EMPTY_STRING });

  const onSubmitPersonalInfo = (
    name: string,
    DOB: string,
    email: string,
    gender: string,
    phone: string
  ): void => {
    updatePersonalDetails(name, DOB, email, gender, phone);
  };
  const onSubmitBio = async (bio: string) => {
    setLoading(true);
    const body = {
      bio: bio,
    };
    const result = await fetch(`${base_url}v2/volunteer/bio`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setErrorMsg(error);
      setSeverity("error")
      setIsEditingBio(false);
      setEmpty()
      setLoading(false);
      return;
    }
    setErrorMsg("Bio updated successfully.");
    setSeverity("success")
    setEmpty()
    setIsEditingBio(false);
    setLoading(false);
    return;
  };
  const onSubmitLocationInfo = async (
    address: string,
    state: string,
    city: string,
    country: string,
    subCategory: string,
    category: string,
    facility: string
  ) => {
    const body = {
      street: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      long: long,
    };
    setLoading(true);
    const result = await fetch(`${base_url}v2/volunteer/account`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setErrorMsg(error);
      setSeverity("error")
      setEmpty()
      setLoading(false);
      return;
    }
    setErrorMsg("Data updated successfully.");
    setIsEditingLocation(false);
    setSeverity("success")
    setEmpty()
    setLoading(false);
    return;
  };

  const onSubmitInts = async (ints: string[]) => {
    setLoading(true);
    const body = {
      passions: ints,
    };
    const result = await fetch(`${base_url}v2/volunteer/passions`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setErrorMsg(error);
      setSeverity("error")
      setEmpty()
      setIsEditingPortfolio(false);
      setLoading(false);
      return;
    }
    setErrorMsg("Data updated successfully.");
    setSeverity("success")
    setIsEditingPortfolio(false);
    setEmpty()
    setLoading(false);
    return;
  };

  const onSubmitLangs = async (langs: string[], ints: string[]) => {
    setLoading(true);
    const body = {
      languageKnown: langs,
    };
    const result = await fetch(`${base_url}v2/volunteer/personal`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setErrorMsg(error);
      setIsEditingSocial(false);
      setSeverity("error")
      setEmpty()
      setLoading(false);
      return;
    }
    setErrorMsg("Data updated successfully.");
    setSeverity("success")
    setIsEditingSocial(false);
    setEmpty()
    onSubmitInts(ints);
    setLoading(false);
    return;
  };
  const onSubmitSocialInfo = async (
    fblink: string,
    instaLink: string,
    twitterLink: string,
    linkedinLink: string,
    portfolioLink: any
  ) => {
    setLoading(true);
    const body = {
      facebook: fblink,
      instagram: instaLink,
      linkedin: twitterLink,
      twitter: linkedinLink,
      portfolio: portfolioLink,
    };
    const result = await fetch(`${base_url}v2/volunteer/links`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setErrorMsg(error);
      setIsEditingSocial(false);
      setSeverity("error")
      setLoading(false);
      return;
    }
    setErrorMsg("Data updated successfully.");
    setSeverity("success")
    setIsEditingSocial(false);
    setEmpty()
    setLoading(false);
    return;
  };
  const handleImage = useCallback((file: File, fileData: File) => {
    const imgurl = window.URL.createObjectURL(fileData);
    setImageVol((prev) => ({
      ...prev,
      file: fileData,
      imageUrl: imgurl,
    }));
  }, []);

  const updatePersonalDetails = async (
    name: string,
    email: string,
    gender: string,
    DOB: string,
    phone: string
  ) => {
    setLoading(true);
    const body = {
      name: name,
      birth: DOB,
      gender: gender,
      phone: phone,
      email: email,
    };
    const result = await fetch(`${base_url}v2/volunteer/personal`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setErrorMsg(error);
      setSeverity("error")
      setEmpty()
      setLoading(false);
      return;
    }
    setErrorMsg("Data updated successfully.");
    setEmpty()
    setSeverity("success")
    setIsEditingPersonalInfo(false);
    setLoading(false);
    return;
  };

  const updateProfilePic = async (formData: FormData) => {
    setLoading(true);
    const result = await fetch(`${base_url}v2/volunteer/picture`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setLoading(false);
      throw new Error(error);
    }
    setLoading(false);
    return success;
  };

  const {
    mutate,
    status: updateStatus,
    isLoading:load,
  } = useMutation(updateProfilePic, {
    onSuccess: () => {
      setErrorMsg("Successfully updated volunteer details.");
      setEmpty()
      setSeverity("success")
      setIsEditingProfile(false);
      setLoading(false);
      fetchUser()
    },
    onError: (error) => {
      setErrorMsg("Something went wrong!");
      setSeverity("error")
      setEmpty()
      setLoading(false);
    },
  });

  const submitChanges = useCallback(() => {
    if (imageVol.file) {
      const formData = new FormData();
      if (imageVol.file) {
        formData.append("image", imageVol.file);
      }
      mutate(formData);
    }
  }, [imageVol, mutate]);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLat(latitude);
        setLong(longitude);
      });
    }
  };

  const verifyEmail = async(email:string) => {
    const body = {
      email:email
    }
    setLoading(true);
    const result = await fetch(`${base_url}v2/volunteer/${data?.data?._id}/eom`, {
      method: "POST",
      body:JSON.stringify(body),
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const { success, error } = await result.json();
    if (!success) {
      setLoading(false);
      throw new Error(error);
    }
    setLoading(false);
    return success;
  }

  


  return (
    <div>
      <Loader isLoading={loading} />
      <div className="absolute top-[1%] left-[30%]">
        {
          errorMsg.length > 0 && <AlertComp onClose={onClose} error={errorMsg} type={severity} />
        }
      </div>
      <div className="px-8 pb-3 font-extrabold">My Profile</div>
      <EditableContainer
        onEdit={() => setIsEditingProfile((prevEditing) => !prevEditing)}
        editing={isEditingProfile}
      >
        <>
          <div className="flex items-center">
            <div className="flex h-[200px] w-[400px] items-center">
              <Cropper
                acceptType="image/*"
                disabled={!isEditingProfile}
                onUploadImage={handleImage}
                height={250}
                width={300}
              >
                {imageVol ? (
                  <div
                    className="me-5 inline-block rounded-full bg-[#9c9b9b]"
                    style={{ width: "120.526px", height: "120.526px" }}
                  >
                    <Image
                      className="h-[120px] w-[120px] rounded-[50%] border border-black object-contain"
                      width={200}
                      height={200}
                      src={ imageVol.imageUrl.length > 0 ? imageVol.imageUrl : data?.data?.profilePicture ?? defaultImg }
                      alt=""
                    ></Image>
                    {isEditingProfile && (
                      <div className="absolute bottom-[30%] left-[5%] flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#0020d1] transition-all group-hover:opacity-100">
                        <Edit
                          sx={{
                            borderRadius: "8px",
                            fontSize: "1rem",
                            color: "#fff",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    )}
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
              <div className="">
                <p>{data?.data?.name}</p>
                <p>
                  {data?.data?.username} |{" "}
                  {moment(data?.data?.birth).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
        </>
        {isEditingProfile && (
          <div className="flex justify-center">
            <button
              onClick={submitChanges}
              className="flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] font-bold text-white"
            >
              Save Changes
            </button>
          </div>
        )}
      </EditableContainer>

      <EditableContainer
        onEdit={() => setIsEditingPersonalInfo((prevEditing) => !prevEditing)}
        editing={isEditingPersonalinfo}
        className="mt-3"
      >
        <p className="font-extrabold">Personal Information</p>
        <>
          {!isEditingPersonalinfo ? (
            <div className="grid grid-cols-2">
              <div className="my-3">
                <p className="text-[#767D89]">Name</p>
                <p>{data?.data?.name}</p>
              </div>
              <div className="my-3">
                <p className="text-[#767D89]">Date of Birth</p>
                <p>{moment(data?.data?.birth).format("DD-MM-YYYY")}</p>
              </div>
              <div className="my-3">
                <p className="text-[#767D89]">Email Id</p>
                <p>{data?.data?.email}</p>
              </div>
              <div className="my-3">
                <p className="text-[#767D89]">Gender</p>
                <p>{data?.data?.gender}</p>
              </div>

              <div className="my-3">
                <p className="text-[#767D89]">Mobile Number</p>
                <p>{data?.data?.mobile}</p>
              </div>
            </div>
          ) : (
            <>
              <EditablePersonalInfo
                name={data?.data?.name}
                gender={data?.data?.gender}
                email={data?.data?.email}
                phone={data?.data?.mobile}
                DOB={data?.data?.birth}
                onSubmit={onSubmitPersonalInfo}
                emailVerify={verifyEmail}
              />
            </>
          )}
        </>
      </EditableContainer>

      <EditableContainer
        className="mt-3"
        onEdit={() => setIsEditingLocation((prevEditing) => !prevEditing)}
        editing={isEditingLocation}
      >
        <p className="font-extrabold">Address</p>
        {!isEditingLocation ? (
          <>
            <div
              onClick={getLocation}
              className=" mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#253DC0] px-6 py-2"
            >
              <LocationIcon />
              <div className="pb -1 ms-3 cursor-pointer text-white">
                Use My Location
              </div>
            </div>
            {lat !== EMPTY_STRING && long !== EMPTY_STRING && (
              <div className="my-2 block text-black">
                <span className="font-black">Lat:</span> {lat}{" "}
                <span className="font-black">Long:</span>
                {long}
              </div>
            )}
            <div className="ms-3">
              <p>or</p>
              <p>Enter Location Manually</p>
            </div>
          </>
        ) : (
          <>
            <EditableLocation
              address={address}
              state={state}
              city={city}
              country={country}
              subCategory={subCategory}
              facility={facility}
              category={category}
              onSubmit={onSubmitLocationInfo}
            />
          </>
        )}
      </EditableContainer>

      <EditableContainer
        className="mt-3"
        onEdit={() => setIsEditingBio((prevEditing) => !prevEditing)}
        editing={isEditingBio}
      >
        <>
          {!isEditingBio ? (
            <>
              <p className="font-extrabold">Bio</p>
              <p className="mt-3">{data?.data?.bio}</p>
            </>
          ) : (
            <>
              <EditableBio bio={data?.data?.bio} onSubmit={onSubmitBio} />
              <br />
            </>
          )}
        </>
      </EditableContainer>

      <EditableContainer
        className="mt-3"
        onEdit={() => setIsEditingPortfolio((prevEditing) => !prevEditing)}
        editing={isEditingPortfolio}
      >
        <>
          {!isEditingPortfolio ? (
            <>
              <p className="mb-2 mt-3 font-extrabold">Languages Known</p>
              <div className="mt-1 flex">
                {data?.data?.languageKnown.map((lan: string) => (
                  <div
                    key={lan}
                    className="me-2 rounded-full border border-[#000000] px-2 pb-1"
                  >
                    {lan}
                  </div>
                ))}
              </div>

              <p className="mb-2 mt-3 font-extrabold">Interests</p>
              <div className="mt-1 flex">
                {data?.data?.passions.map((passion: string) => (
                  <div
                    key={passion}
                    className="me-2 rounded-full border border-[#000000] px-2 pb-1"
                  >
                    {passion}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <EditablePortfolio onSubmit={onSubmitLangs} />
            </>
          )}
        </>
      </EditableContainer>

      <EditableContainer
        className="mt-3"
        onEdit={() => setIsEditingSocial((prevEditing) => !prevEditing)}
        editing={isEditingSocial}
      >
        {!isEditingSocial ? (
          <>
            <div className="align-center flex flex-col justify-center">
              <p className="mb-2 mt-3 font-extrabold">Portfolio</p>
              <div className="flex gap-10">
                <div className="flex h-[30px] w-[250px] items-center justify-between rounded-lg border-2 px-2 py-2">
                  {data?.data?.portfolio[0].link}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="mb-2 mt-3 font-extrabold">Social Media Accounts</p>

              <div className="flex gap-10">
                <div className="flex w-[300px] items-center justify-between rounded-lg border-2 px-2 py-2">
                  {data?.data?.social?.facebook}
                  <FacebookIcon />
                </div>
                <div className="flex w-[300px] items-center justify-between rounded-lg border-2 px-2 py-2">
                  {data?.data?.social?.instagram}
                  <InstagramIcon />
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex w-[300px] items-center justify-between rounded-lg border-2 px-2 py-2">
                  {data?.data?.social?.twitter}
                  <TwitterIcon />
                </div>
                <div className="flex w-[300px] items-center justify-between rounded-lg border-2 px-2 py-2">
                  {data?.data?.social?.linkedin}
                  <Linkdin />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <EditableSocials
              facebookLink={data?.data?.social?.facebook}
              instagramLink={data?.data?.social?.instagram}
              twitterLink={data?.data?.social?.twitter}
              linkedinLink={data?.data?.social?.linkedin}
              portfolioLink={portfolioLink}
              onSubmit={onSubmitSocialInfo}
            />
            <br />
          </>
        )}
      </EditableContainer>
    </div>
  );
}

export default MyProfile;
