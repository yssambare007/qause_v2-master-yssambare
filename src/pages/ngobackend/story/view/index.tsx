/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Checkbox, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SideBar from "../../../../components/dashboard/SideBar";
import AddIcon from "@mui/icons-material/Add";
import TimerIcon from "@mui/icons-material/Timer";
import EditIcon from "@mui/icons-material/Edit";
import "react-quill/dist/quill.snow.css";
import ViewStories from "../../../../components/ngoBackend/ViewStories";
import { useRouter } from "next/router";
import { base_url } from "../../../../utils/utils";
import type { storyResponse } from "../../../../services/types/models";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Cropper from "../../../../components/common/imageCropper/Index";
import dynamic from "next/dynamic";
import OutsideClickHandler from "react-outside-click-handler";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import ThankYouModalV2 from "../../../../components/thankYouPopUp/ThankYouPopupV2";
import { LoadingButton } from "@mui/lab";
import Navbar from "../../../../components/navbar/Navbar";
import { storyCharacterCount } from "../create";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <>Loading ...</>,
});

const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};

const storiesLabel = (tag?: any) => {
  if (tag?.length == 0) {
    return "Choose a tag";
  } else if (tag?.length <= 2) {
    return tag?.toString();
  } else if (tag?.length > 2) {
    return `${tag?.length} Items Selected`;
  }
  return "Choose a tag";
};

function StoryDetails({ details, modules, descriptionHandler, edit }: any) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);
  if (!details.desc) return <p>Empty Description</p>;
  else {
      return (
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="Write Ngo Story here..."
          className="h-[319px] rounded-md font-[muli] lg:min-w-[440px] xl:min-w-[478px]"
          onChange={descriptionHandler}
          value={details.desc}
          readOnly={!edit}
        />
      );
  }
}

const ViewStory = () => {
  const router = useRouter();

  const { id } = router.query;

  const _storyData: storyResponse = {
    id: "",
    resolution: "",
    storyDetails: {
      desc: "",
      title: "",
      image: {
        secondary: [],
        primary: "",
      },
      ngoID: "",
      tag: [],
    },
  };

  const [data, setData] = useState<storyResponse>(_storyData);
  const [primaryImage, setPrimaryImage] = useState(0);
  const [currentImages, setCurrentImages] = useState<
    { url: string; croppedFile: any; id: string; changed: boolean }[]
  >([]);

  const [pendingData, setPendingData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const [thankyou, setThankYou] = useState(false);
  const [submitStoryLoading, setSubmitStoryLoading] = useState(false);
  const [imagesKey, setImagesKey] = useState([
    "test_two.jpg",
    "test_three.jpg",
    "test_four.jpg",
  ]);
  useEffect(() => {
    reloadStories();
  }, []);
  const reloadStories = async () => {
    const res = await fetch(`${base_url}ngo/story/all`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const dataImages = await res.json();
    if (dataImages.data) setPendingData(dataImages.data);
  };

  useEffect(() => {
    if (id) {
      const fetchStory = async (storyId: any) => {
        const res = await fetch(`${base_url}ngo/ticket/${storyId}`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("TOKEN")}`,
          },
        });
        const dataImages = await res.json();
        if (dataImages.data) {
          setData(dataImages.data[0]);
          const image = dataImages.data[0].storyDetails.image;
          const ngoId = dataImages.data[0].storyDetails.ngoID;
          setPrimaryImage(image.primary);
          setCurrentImages([
            {
              url: image.primary.length ? `https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${ngoId}/story/${image.primary}` : '/images/no-logo.jpeg',
              croppedFile: "",
              id: image.primary,
              changed: false,
            },
            ...image.secondary.map((imageId: string) => ({
              url: `https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${ngoId}/story/${imageId}`,
              croppedFile: "",
              id: imageId,
              changed: false,
            })),
            ...Array.from(
              { length: 4 - (image.secondary.length + 1) },
              (_, i) => ({
                url: "",
                croppedFile: "",
                id: "id" + i,
              })
            ),
          ]);
        }
      };

      fetchStory(id);
    }
  }, [id]);

  const tags: string[] = [
    "Agriculture",
    "Education",
    "Financial Independence",
    "Healthcare",
    "Human Right",
    "Inspirational",
    "Pandemic",
    "Rescue",
    "Women Empowerment",
  ];

  const storyTitleHandler = (e: any) => {
    setData((prev) => ({
      ...prev,
      storyDetails: {
        ...storyDetails,
        title: e.target.value,
      },
    }));
  };

  const descriptionHandler = (value: any) => {
    setData((prev) => ({
      ...prev,
      storyDetails: {
        ...storyDetails,
        desc: value,
      },
    }));
  };

  const { storyDetails } = data;

  const removeTags = (tag: string) => {
    const filteredArray = storyDetails.tag.filter((e: string) => e !== tag);
    setData((prev) => ({
      ...prev,
      storyDetails: {
        ...storyDetails,
        tag: filteredArray,
      },
    }));
  };

  const addTags = (newTag: string) => {
    if (!document.getElementById("tag_error")?.classList.contains("hidden")) {
      document.getElementById("tag_error")?.classList.add("hidden");
    }
    if (storyDetails.tag.includes(newTag)) {
      removeTags(newTag);
    } else {
      setData((prev) => ({
        ...prev,
        storyDetails: {
          ...storyDetails,
          tag: [...storyDetails.tag, newTag],
        },
      }));
    }
  };

  const handleChangeImage = (id: string, index: string) => {
    return (file: any, fileData: any) => {
      setCurrentImages((prev) =>
        prev.map((data, i) =>
          data.id === index
            ? {
                url: window.URL.createObjectURL(fileData),
                id: id,
                croppedFile: fileData,
                changed: true,
              }
            : data
        )
      );
    };
  };
  
  const renderImages = () => {
    return (
      <>
        {currentImages
          .filter((imageData) => imageData.url !== "")
          .map((imageData) => (
            <div
              key={imageData.url}
              className="relative flex h-[160px] items-center justify-center overflow-hidden rounded-md xs:w-full"
            >
              <Image unoptimized src={imageData.url} fill alt={imageData.id} />
            </div>
          ))}
      </>
    );
  };

  const updateStory = async () => {
    setSubmitStoryLoading(true);
    let focusField = "";
    const { title, desc, tag } = storyDetails;
    if (title == "") {
      if (
        document.getElementById("title_error")?.classList.contains("hidden")
      ) {
        document.getElementById("title_error")!.innerHTML = "Title is required";
        document.getElementById("title_error")?.classList.remove("hidden");
      }
      if (focusField == "") {
        focusField = "name";
      }
    }
    if (tag.length == 0) {
      if (document.getElementById("tag_error")?.classList.contains("hidden")) {
        document.getElementById("tag_error")!.innerHTML =
          "Atleast one tag is required";
        document.getElementById("tag_error")?.classList.remove("hidden");
      }
      if (focusField == "") {
        focusField = "name";
      }
    }

    const numWords = desc.split(" ").length;
    if (numWords >= 500 || numWords < 10) {
      if (
        document
          .getElementById("description_error")
          ?.classList.contains("hidden")
      ) {
        document.getElementById("description_error")!.innerHTML =
          "Enter description atleast 10 words to 500 words";
        document
          .getElementById("description_error")
          ?.classList.remove("hidden");
      }
      if (focusField == "") {
        focusField = "name";
      }
    }
    if (focusField !== "") {
      if (focusField == "title") {
        document.getElementById("title")?.focus();
      }
    } else {
      //post the data
      const formData = new FormData();

      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("tag", tag.join(","));

      currentImages.forEach((img, index) => {
        if (Boolean(img.croppedFile) && img.changed) {
          formData.append(
            img.id === "" + primaryImage ? "primaryImage" : "images",
            img.croppedFile,
            `image-${index + 1}.${img.croppedFile.name.split(".")[1]}`
          );
          switch (index) {
            case 1: {
              const arr = imagesKey;
              arr[0] = img.id;
              setImagesKey(arr);
              break;
            }
            case 2: {
              const arr = imagesKey;
              arr[1] = img.id;
              setImagesKey(arr);
              break;
            }
            case 3: {
              const arr = imagesKey;
              arr[2] = img.id;
              setImagesKey(arr);
              break;
            }
          }
        }
      });

      formData.append("isUpdate", "true");
      formData.append("ticketId", `${id}`);
      formData.append("imageKeys", imagesKey.join(","));

      const _story = await fetch(`${base_url}ngo/story`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${localStorage.getItem("TOKEN")}`,
        },
      });
      if (_story.status == 200) {
        setThankYou(true);
        setSubmitStoryLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <Grid container spacing={0}>
          <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
            <SideBar />
          </Grid>
          {data && (
            <Grid
              style={{ height: "calc(100vh - 80px)" }}
              className="overflow-y-auto"
              xl={9.5}
              lg={9}
              md={9}
              sm={12}
              xs={12}
              container
              item
              spacing={0}
            >
              <Grid item xl={8.2} lg={8} md={12} sm={12} xs={12}>
                <div className="p-[26.4px]">
                  <div className="mb-[4.4px] flex items-center">
                    <div className="flex gap-2 text-[38.72px] font-semibold xs:text-[31.68px]">
                      <p
                        style={{
                          WebkitLineClamp: 1,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "anywhere",
                        }}
                        className=" overflow-hidden "
                      >
                        {storyDetails.title}
                      </p>
                      <span>|</span>
                    </div>

                    <span className="block flex-none text-lg font-bold text-[#b8b8b8] xs:text-[12.96px] md:ml-1 md:inline-block">
                      (Total number of Story 6)
                    </span>
                  </div>
                  {data.resolution == "pending" && (
                    <div className="mt-4 border bg-[#fef3f3] px-3 py-2">
                      <p className="flex items-center gap-2 text-[24.72px] font-bold text-red-600 xs:text-[17px] lg:gap-4">
                        <span>
                          <TimerIcon fontSize="large" />
                        </span>{" "}
                        Your Story Pending For Approve
                      </p>
                    </div>
                  )}

                  <div style={{ transition: "all 0.1s ease" }} className="mt-6">
                    <div
                      onClick={() => setEdit(!edit)}
                      className="flex w-fit cursor-pointer items-center gap-1 text-[#1f1f1f]"
                    >
                      {edit ? "Cancel" : "Edit"}
                      <span>
                        {edit ? (
                          <CloseIcon color="error" fontSize="medium" />
                        ) : (
                          <EditIcon fontSize="inherit" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div style={{ transition: "all 0.1s ease" }} className="mt-4">
                    <p className="mb-[14px] text-[21.432px] font-bold text-[#636363] xs:text-[17.28px]">
                      Story Title*
                    </p>

                    <div
                      className={`flex min-h-[55px] w-full items-center rounded-md border border-gray-400 py-[4px]`}
                      style={{ transition: "all 0.2s ease" }}
                    >
                      <input
                        type="text"
                        value={storyDetails.title}
                        onChange={storyTitleHandler}
                        placeholder="Press enter story title"
                        style={{ transition: "all 0.15s ease" }}
                        className={`flex-1 pl-2 pb-1 outline-0 placeholder:text-[18px] disabled:cursor-not-allowed ${
                          !edit && "text-[18px] font-semibold text-gray-600"
                        } placeholder:font-semibold placeholder:text-gray-400`}
                        disabled={!edit}
                        maxLength={70}
                      />
                      {edit && (
                        <span
                          className={`px-4 ${
                            storyCharacterCount - storyDetails.title.length < 6
                              ? "text-red-600"
                              : "text-gray-400"
                          } text-[0.875rem] leading-none`}
                        >
                          {storyCharacterCount - storyDetails.title.length}/
                          {storyCharacterCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{ transition: "all 0.25s ease" }}
                    className={`${
                      edit ? "mt-6" : "mt-3"
                    } flex flex-col md:flex-row`}
                  >
                    <div className="relative md:pr-[20px]">
                      <p className="mb-[20px] font-[muli] text-[21.2px] font-semibold text-[#636363] xs:text-[17.28px]">
                        Story tag
                      </p>

                      <div
                        className={`flex flex-wrap items-center gap-4 p-2 ${
                          edit ? "px-0" : "px-2"
                        } xs:grid-cols-3 xs:p-0`}
                      >
                        {!edit ? (
                          storyDetails.tag
                            .filter((tag: string) => tag.toLowerCase())
                            .map((tag: string) => (
                              <div
                                key={tag}
                                className="relative flex-none items-center justify-center border border-gray-200 bg-gray-100 py-2 px-1 text-sm text-gray-500"
                              >
                                <span>{tag}</span>
                              </div>
                            ))
                        ) : (
                          <OutsideClickHandler
                            onOutsideClick={() => setIsDropdownOpen(false)}
                          >
                            <div className="relative flex min-w-[340px] flex-col flex-wrap items-start justify-start xs:min-w-[200px]">
                              <div
                                className="mb-2 flex min-h-[55px] w-full cursor-pointer items-center justify-between rounded-md border-t border-b border-r border-l border-gray-400 px-[15px] py-[4px] font-semibold text-[#696969]"
                                onClick={() =>
                                  setIsDropdownOpen(!isDropdownOpen)
                                }
                              >
                                {storiesLabel(storyDetails.tag)}
                                <KeyboardArrowDownIcon className="text-3xl" />
                              </div>
                              <div
                                className="hidden text-sm text-red-500"
                                id="tag_error"
                              >
                                Story Title is Required
                              </div>
                            </div>

                            {isDropdownOpen && (
                              <div
                                className={`absolute z-50 w-[100%] min-w-[340px] border bg-[#fff] xs:min-w-[200px] md:w-[95%]`}
                              >
                                <div className="flex h-[60px] flex-row items-center py-1 pl-2">
                                  {/* <Checkbox /> */}

                                  <div className="flex h-[40px] items-center justify-between rounded-sm border-t border-b border-r border-l border-gray-400 px-2">
                                    <input
                                      className="flex outline-0 xs:w-[60%]"
                                      value={tagInput}
                                      onChange={(e) =>
                                        setTagInput(e.target.value)
                                      }
                                    />
                                    <SearchIcon />
                                  </div>

                                  <CloseIcon
                                    className="ml-auto mr-2 cursor-pointer"
                                    onClick={() => setIsDropdownOpen(false)}
                                  />
                                </div>

                                <div className="max-h-[340px] w-full overflow-scroll overflow-x-hidden xs:min-w-[200px]">
                                  {tags
                                    .filter(
                                      (tag: string) =>
                                        tag.includes(tagInput) ||
                                        tag
                                          .toLowerCase()
                                          .includes(tagInput.toLowerCase())
                                    )
                                    .map((tag: string, index: number) => {
                                      return (
                                        <div
                                          className="cursor-pointer py-1 pl-2 text-[15px] font-normal hover:bg-[#eaeaea]"
                                          key={tag}
                                        >
                                          <Checkbox
                                            checked={storyDetails.tag.includes(
                                              tag
                                            )}
                                            value={tag}
                                            onClick={() => addTags(tag)}
                                          />
                                          {tag}
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            )}
                          </OutsideClickHandler>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="mb-2.5 inline-block text-[21.12px] font-semibold text-[#636363]">
                      Upload Photo
                    </p>
                    <p className="ml-2 inline-block text-[15.84px] text-[#636363]">
                      (Max 2mb)
                    </p>

                    <div className="mt-3 grid grid-flow-row grid-cols-4 gap-8 xs:grid-cols-1">
                      <>
                        {!edit
                          ? renderImages()
                          : currentImages.map((imageData, i) =>
                              imageData.url == "" ? (
                                <Cropper
                                  key={imageData.id}
                                  id={imageData.id}
                                  onUploadImage={handleChangeImage(
                                    imageData.id,
                                    imageData.id
                                  )}
                                  height={250}
                                  width={250}
                                  acceptType="image/*"
                                >
                                  <div className="flex h-[193px] w-full items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] xs:h-[278px] xs:w-full">
                                    <div className="mr-auto flex items-center pl-[1px] xs:mx-auto">
                                      <div className="flex cursor-pointer flex-col items-center justify-center">
                                        <AddIcon />
                                        <p className="px-4 text-center text-base text-[#484848]">
                                          Drag a File here or browse for a file
                                          to upload
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Cropper>
                              ) : (
                                <div
                                  key={imageData.id}
                                  className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                                    i === primaryImage
                                      ? "border-4 border-orange-500"
                                      : ""
                                  } `}
                                >
                                  <div className="h-[160px] w-full ">
                                    <Image
                                      alt="story image"
                                      fill
                                      src={imageData.url}
                                      className="cursor-pointer rounded-sm border border-[#7b7979] bg-[#f5f6f7] opacity-100"
                                    />
                                  </div>

                                  <div className="absolute top-0 right-0 left-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                                    <div>
                                      <Cropper
                                        acceptType="image/*"
                                        id={imageData.id}
                                        onUploadImage={handleChangeImage(
                                          imageData.id,
                                          imageData.id
                                        )}
                                        height={250}
                                        width={250}
                                      >
                                        <div className="m-1 cursor-pointer rounded border-2 border-white px-4 py-2 text-xs font-extrabold text-white">
                                          Change Photo
                                        </div>
                                      </Cropper>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                      </>
                    </div>
                  </div>

                  {/* Story Description  */}
                  <div className="mt-6">
                    <p className="mb-[20px] font-[muli] text-[21.2px] font-semibold text-[#636363]">
                      Story Description*
                    </p>
                    <StoryDetails
                      details={storyDetails}
                      modules={modules}
                      descriptionHandler={descriptionHandler}
                      edit={edit}
                    />
                  </div>
                  {edit ? (
                    <LoadingButton
                      loadingPosition="end"
                      sx={{
                        mt: "70px",
                        py: "20px",
                        backgroundColor: "#253dc0",
                        textTransform: "none",
                        fontSize: "1.2rem",
                        letterSpacing: "none",
                        borderRadius: "2px",
                        fontFamily: "muli",
                      }}
                      loading={submitStoryLoading}
                      variant="contained"
                      onClick={updateStory}
                      className="flex w-full max-w-[276px] items-center bg-[#253dc0] text-white"
                    >
                      Update Story
                    </LoadingButton>
                  ) : (
                    <div className="py-2" />
                  )}
                </div>
              </Grid>
              <Grid
                className="border-l-2 border-gray-100"
                item
                xl={3.8}
                lg={4}
                md={0}
                sm={12}
                xs={12}
              >
                <ViewStories
                  Events={pendingData}
                  redirect
                  onDataReload={reloadStories}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>

      <ThankYouModalV2 content={storyDetails.title} visible={thankyou} />
    </>
  );
};

export default ViewStory;
