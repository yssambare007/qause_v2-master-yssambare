import { useCallback, useEffect, useState } from "react";
import NgoDashboardFrame from "../../../../components/common/NgoDashboardFrame";
import DetailsFrame from "../../../../components/ngoBackend/DetailsFrame";
import AddIcon from "@mui/icons-material/Add";
import Cropper from "../../../../components/common/imageCropper/Index";
import CommonInput from "../../../../components/common/inputFields/CommonInput";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery } from "react-query";
import type { UpdateFounder, Founder } from "../../../../types/profile/details";
import {
  getFounderDetails,
  updateFounder,
} from "../../../../utils/apis/details/Index";
import { Button, CircularProgress, Grid } from "@mui/material";
import Image from "next/image";
import { Done } from "@mui/icons-material";
import { getImageUrlForS3Bucket } from "../../../../utils/utils";
import Edit from "@mui/icons-material/Edit";
import YouSureModal from "../../../../components/common/YouSureModal";
import { useRouter } from "next/router";
import { END_POINTS } from "../../../../constants/endpoints";
import Link from "next/link";
import { NGO_ID } from "../../../../constants/constants";
import EditIcon from "@mui/icons-material/Edit";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <>Loading ...</>,
});

const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};
const Index = () => {
  const {
    data: founder,
    status: founderStatus,
    refetch,
  } = useQuery<Founder>("founder", getFounderDetails, {
    staleTime: 10000,
  });
  const {
    mutate,
    status: updateStatus,
    isLoading,
  } = useMutation(updateFounder, {
    onSuccess: () => {
      alert("Successfully updated founder details.");
      refetch();
      router.replace(END_POINTS.ABOUT_FOUNDER);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const router = useRouter();

  const [currentFounderData, setCurrentFounderdata] = useState<UpdateFounder>({
    bio: "",
  });
  const [edit, setEdit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    setEdit(router.query.isEdit ? true : false);
  }, [router.query]);
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
    if (founder) {
      setCurrentFounderdata({
        bio: founder.bio || "",
        imageUrl: founder.image
          ? getImageUrlForS3Bucket(
              "" + localStorage.getItem(NGO_ID),
              founder.image
            )
          : undefined,
        file: undefined,
      });
    }
  }, [founder]);

  const handleBioEdit = useCallback((value: string) => {
    setCurrentFounderdata((prev) => ({ ...prev, bio: value }));
  }, []);

  const handleImage = useCallback((file: File, fileData: File) => {
    const imgurl = window.URL.createObjectURL(fileData);
    setCurrentFounderdata((prev) => ({
      ...prev,
      file: fileData,
      imageUrl: imgurl,
    }));
  }, []);

  const validateForm = useCallback((): string => {
    if (currentFounderData) {
      const bioLength = currentFounderData.bio.split(" ").length;
      if (bioLength < 10 || bioLength > 500) {
        return "bio description should be between 10 to 500 words";
      }
      let updatesCount = 0;
      if (founder?.bio !== currentFounderData.bio) {
        updatesCount++;
      }
      if (currentFounderData.file) {
        updatesCount++;
      }
      if (updatesCount == 0) {
        return "No changes.";
      }
    } else {
      return "Data not fetched.";
    }
    return "";
  }, [currentFounderData, founder?.bio]);

  const toggleConfirmation = useCallback(() => {
    const errorString = validateForm();
    if (errorString.length != 0 && !showConfirmation) {
      alert(errorString);
    } else {
      setShowConfirmation((prev) => !prev);
    }
  }, [showConfirmation, validateForm]);

  const submitChanges = useCallback(() => {
    setShowConfirmation(false);
    if (currentFounderData) {
      const formData = new FormData();
      formData.append("bio", currentFounderData.bio);
      if (currentFounderData.file) {
        formData.append("image", currentFounderData.file);
      }
      mutate({
        id: "" + localStorage.getItem(NGO_ID),
        formData: formData,
      });
    }
  }, [currentFounderData, mutate]);

  const dummyData = [
    { name: "Founder Name", value: "Vaibhav Varunkar" },
    { name: "Mobile No.", value: "8975106433" },
    { name: "Email", value: "vaibhav@webknot.in" },
  ];

  return (
    <NgoDashboardFrame title="Edit Profile" subtitle="Founder">
      {/* <DetailsFrame> */}
      {founderStatus != "success" || !founder ? (
        <div className="flex h-[50vh] items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Grid container>
            <Grid className="border-r-2 border-[#f2f3f7]" xs={12} md={4}>
              <h1 className="ml-8 mt-8 text-lg font-bold text-black">
                Profile Image
              </h1>
              <div className="mt-5 flex justify-center">
                <div className="h-[200px] w-[200px]">
                  <Cropper
                    acceptType="image/*"
                    disabled={!edit}
                    onUploadImage={handleImage}
                    height={250}
                    width={400}
                  >
                    {currentFounderData?.imageUrl ? (
                      <div className="group relative h-[200px] w-[200px]">
                        <Image
                          className="h-[200px] w-[200px] rounded-[50%] border border-black object-contain"
                          width={200}
                          height={200}
                          src={currentFounderData?.imageUrl || ""}
                          alt="founder image"
                        ></Image>
                        {edit && (
                          <div className="absolute bottom-[10%] right-[5%] flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#0020d1] transition-all group-hover:opacity-100">
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
                </div>
              </div>
            </Grid>
            <Grid className="" xs={12} md={8}>
              <div className="mt-5 flex justify-between px-5 py-2">
                <h1 className="text-lg font-black">Founder Details</h1>
                <div
                  onClick={() => setEdit(!edit)}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-black px-2"
                >
                  {edit && <h1>Cancel</h1>}
                  {!edit && <EditIcon fontSize="small" />}
                </div>
              </div>
              <div className="mt-5 flex justify-around xs:flex-col xs:items-center xs:justify-between">
                {dummyData.map((item) => {
                  return (
                    <div key={item.name} className="flex flex-col ">
                      <h3 className="text-md font-bold text-[#b4b4b4]">
                        {item.name}
                      </h3>
                      <input
                        readOnly={true}
                        className={
                          "text-md height-[50px] font-bold text-black focus:outline-0"
                        }
                        defaultValue={item.value}
                      ></input>
                    </div>
                  );
                })}
              </div>
              <div className="justiy-center mt-5 flex flex-col items-start">
                <h3 className="text-md ml-5 self-start font-bold text-[#b4b4b4]">
                  Bio
                </h3>
                <textarea
                  rows={4}
                  cols={40}
                  readOnly={edit ? false : true}
                  onChange={(e) => handleBioEdit(e.target.value)}
                  className={
                    edit === true
                      ? "my-5 h-[100px] w-[93%] resize-none self-center self-center rounded-lg border border-black px-3 py-0 py-3 text-sm"
                      : "my-5 h-[100px] w-[93%] resize-none self-center rounded-lg border border-black px-3 py-0 py-3 text-sm"
                  }
                  placeholder="Your text goes here..."
                  defaultValue={currentFounderData?.bio}
                ></textarea>
                {edit === true && (
                  <button
                    onClick={toggleConfirmation}
                    className="my-10 flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] p-5 font-bold text-white"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </Grid>
          </Grid>
          <YouSureModal
            open={showConfirmation}
            handleClose={toggleConfirmation}
            handleYes={submitChanges}
          />
        </div>
      )}
      {/* </DetailsFrame> */}
    </NgoDashboardFrame>
  );
};

export default Index;
