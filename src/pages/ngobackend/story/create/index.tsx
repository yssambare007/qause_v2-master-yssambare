/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Checkbox, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SideBar from "../../../../components/dashboard/SideBar";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Cropper from "../../../../components/common/imageCropper/Index";
import "react-quill/dist/quill.snow.css";
import OutsideClickHandler from "react-outside-click-handler";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import { base_url } from "../../../../utils/utils";
import { useRouter } from "next/router";
import ThankYouModalV2 from "../../../../components/thankYouPopUp/ThankYouPopupV2";
import Navbar from "../../../../components/navbar/Navbar";
import Image from "next/image";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <>Loading ...</>,
});

const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};

export const storyCharacterCount = 70;

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

const CreateStory = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
    reloadStories();
    if (count > 5) {
      router.push("/ngobackend/story/desk");
    }
  }, [count]);
  const reloadStories = async () => {
    const res = await fetch(`${base_url}ngo/story/all`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const dataImages = await res.json();
    setCount(dataImages.data?.length);
  };
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
  const [storyTag, setStoryTag]: any = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({
    picture: "",
    croppedFile: "",
  });
  const [data1, setData1] = useState({
    picture: "",
    croppedFile: "",
  });
  const [data2, setData2] = useState({
    picture: "",
    croppedFile: "",
  });
  const [data3, setData3] = useState({
    picture: "",
    croppedFile: "",
  });
  const [primaryImage, setPrimaryImage] = useState(0);

  const [thankyou, setThankYou] = useState(false);
  const removeTags = (tag: string) => {
    const filteredArray = storyTag.filter((e: string) => e !== tag);
    setStoryTag(filteredArray);
  };

  const addTags = (tag: string) => {
    if (!document.getElementById("tag_error")?.classList.contains("hidden")) {
      document.getElementById("tag_error")?.classList.add("hidden");
    }
    if (storyTag.includes(tag)) {
      removeTags(tag);
    } else {
      setStoryTag([...storyTag, tag]);
    }
  };
  const titleHandler = (e: any) => {
    if (!document.getElementById("title_error")?.classList.contains("hidden")) {
      document.getElementById("title_error")?.classList.add("hidden");
    }
    setTitle(e.target.value);
  };
  const descriptionHandler = (value: any) => {
    if (
      !document
        .getElementById("description_error")
        ?.classList.contains("hidden")
    ) {
      document.getElementById("description_error")?.classList.add("hidden");
    }
    setDescription(value);
  };
  const imageParse = (file: any, fileData: any) => {
    if (
      !document.getElementById("picture_error")?.classList.contains("hidden")
    ) {
      document.getElementById("picture_error")?.classList.add("hidden");
    }
    setData({
      ...data,
      picture: window.URL.createObjectURL(fileData),
      croppedFile: fileData,
    });
  };
  const imageParse1 = (file: any, fileData: any) => {
    if (
      !document.getElementById("picture_error")?.classList.contains("hidden")
    ) {
      document.getElementById("picture_error")?.classList.add("hidden");
    }
    setData1({
      ...data1,
      picture: window.URL.createObjectURL(fileData),
      croppedFile: fileData,
    });
  };
  const imageParse2 = (file: any, fileData: any) => {
    if (
      !document.getElementById("picture_error")?.classList.contains("hidden")
    ) {
      document.getElementById("picture_error")?.classList.add("hidden");
    }
    setData2({
      ...data2,
      picture: window.URL.createObjectURL(fileData),
      croppedFile: fileData,
    });
  };
  const imageParse3 = (file: any, fileData: any) => {
    if (
      !document.getElementById("picture_error")?.classList.contains("hidden")
    ) {
      document.getElementById("picture_error")?.classList.add("hidden");
    }
    setData3({
      ...data3,
      picture: window.URL.createObjectURL(fileData),
      croppedFile: fileData,
    });
  };
  const showPopOver = (i: number) => {
    if (i == 1) {
      if (data.picture == "") {
        if (document.getElementById("upload1")?.classList.contains("hidden")) {
          document.getElementById("upload1")?.classList.remove("hidden");
        }
      }
    }
    if (i == 2) {
      if (data1.picture == "") {
        if (document.getElementById("upload2")?.classList.contains("hidden")) {
          document.getElementById("upload2")?.classList.remove("hidden");
        }
      }
    }
    if (i == 3) {
      if (data2.picture == "") {
        if (document.getElementById("upload3")?.classList.contains("hidden")) {
          document.getElementById("upload3")?.classList.remove("hidden");
        }
      }
    }
  };
  const removePopOver = (i: number) => {
    if (i == 1) {
      if (data.picture == "") {
        if (!document.getElementById("upload1")?.classList.contains("hidden")) {
          document.getElementById("upload1")?.classList.add("hidden");
        }
      }
    }
    if (i == 2) {
      if (data1.picture == "") {
        if (!document.getElementById("upload2")?.classList.contains("hidden")) {
          document.getElementById("upload2")?.classList.add("hidden");
        }
      }
    }
    if (i == 3) {
      if (data2.picture == "") {
        if (!document.getElementById("upload3")?.classList.contains("hidden")) {
          document.getElementById("upload3")?.classList.add("hidden");
        }
      }
    }
  };
  const createStory = async () => {
    let focusField = "";
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
    if (storyTag.length == 0) {
      if (document.getElementById("tag_error")?.classList.contains("hidden")) {
        document.getElementById("tag_error")!.innerHTML =
          "Atleast one tag is required";
        document.getElementById("tag_error")?.classList.remove("hidden");
      }
      if (focusField == "") {
        focusField = "name";
      }
    }
    
    const numWords = description.split(" ").length;
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
      formData.append("desc", description);
      formData.append("tag", storyTag);

      if (data.picture !== "") {
        formData.append(
          primaryImage === 0 ? "primaryImage" : "images",
          data.croppedFile
        );
      }

      if (data1.picture !== "") {
        formData.append(
          primaryImage === 1 ? "primaryImage" : "images",
          data1.croppedFile
        );
      }
      if (data2.picture !== "") {
        formData.append(
          primaryImage === 2 ? "primaryImage" : "images",
          data2.croppedFile
        );
      }
      if (data3.picture !== "") {
        formData.append(
          primaryImage === 3 ? "primaryImage" : "images",
          data3.croppedFile
        );
      }
      const _story = await fetch(`${base_url}ngo/story`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${localStorage.getItem("TOKEN")}`,
        },
      });
      const storyData = await _story.json();
      if (storyData.success) {
        setThankYou(true);
      }
    }
  };

  const handlePrimaryImage = (i: number) => () => {
    setPrimaryImage(i);
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <Grid container spacing={0}>
          <Grid item xl={2.5} lg={3} md={3} sm={0} xs={0}>
            <SideBar />
          </Grid>
          <Grid item xl={9.5} lg={9} md={9} sm={12} xs={12}>
            <div
              style={{ height: "calc(100vh - 78px)" }}
              className="overflow-y-auto"
            >
              {/* <Create Story /> */}
              <div className="p-[26.4px]">
                <div className="mb-[4.4px]">
                  <p className="inline-block text-[38.72px] font-semibold xs:text-[31.68px]">
                    Add a Story
                  </p>
                  <span className="block text-lg xs:text-[12.96px] md:ml-8 md:inline-block">
                    Because stories matter!
                  </span>
                </div>

                <div className="mt-6">
                  <p className="mb-[20px] font-[muli] text-[18.432px] font-medium text-[#636363] xs:text-[17.28px]">
                    Story Title ( Add something inspirational and happy )*
                  </p>

                  <div className="mb-2 flex min-h-[55px] w-full items-center border-t border-b border-r border-l border-gray-400 px-[5px] py-[4px]">
                    <input
                      type="text"
                      placeholder="Type Here *"
                      className="flex-1 pl-2 pb-1 outline-0"
                      value={title}
                      maxLength={storyCharacterCount}
                      onChange={titleHandler}
                    />

                    <span
                      className={`px-4 ${
                        storyCharacterCount - title.length < 6
                          ? "text-red-600"
                          : "text-gray-400"
                      } text-[0.875rem] leading-none`}
                    >
                      {storyCharacterCount - title.length}/{storyCharacterCount}
                    </span>
                  </div>
                  <div className="hidden text-sm text-red-500" id="title_error">
                    Story Title is Required
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row">
                  <div className="relative md:pr-[20px]">
                    <p className="mb-[20px] font-[muli] text-[21.2px] font-semibold text-[#636363] xs:text-[17.28px]">
                      Story tag <sup>*</sup>
                    </p>

                    <OutsideClickHandler
                      onOutsideClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="relative flex min-w-[340px] flex-col flex-wrap items-start justify-start xs:min-w-[200px]">
                        <div
                          className="mb-2 flex min-h-[55px] w-full cursor-pointer items-center justify-between rounded-sm border-t border-b border-r border-l border-gray-400 px-[15px] py-[4px] font-semibold text-[#696969]"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          {storiesLabel(storyTag)}
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
                            <div className="flex h-[40px] items-center justify-between rounded-sm border-t border-b border-r border-l border-gray-400 px-2">
                              <input
                                className="flex outline-0 xs:w-[60%]"
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
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
                                  tag.includes(story) ||
                                  tag
                                    .toLowerCase()
                                    .includes(story.toLowerCase())
                              )
                              .map((tag: string, index: number) => {
                                return (
                                  <div
                                    onClick={() => addTags(tag)}
                                    className="cursor-pointer py-1 pl-2 text-[15px] font-normal hover:bg-[#eaeaea]"
                                    key={tag}
                                  >
                                    <Checkbox
                                      checked={storyTag.includes(tag)}
                                      value={tag}
                                      // onClick={() => addTags(tag)}
                                    />
                                    {tag}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </OutsideClickHandler>
                  </div>

                  <div className="xs:pt-[20px] sm:pt-[20px] md:pl-[20px]">
                    <p className="mb-[20px] font-[muli] text-[20.16px] font-semibold text-[#253DC0]">
                      Why tell your story?
                    </p>

                    <p className="mt-[3.6px] text-[17.6px] text-[#636363]">
                      <CheckIcon className="text-3xl" /> Words can make a big
                      impact.
                    </p>

                    <p className="mt-[3.6px] text-[17.6px] text-[#636363]">
                      <CheckIcon className="text-3xl" /> Stories can make
                      connections stronger.
                    </p>

                    <p className="mt-[3.6px] text-[17.6px] text-[#636363]">
                      <CheckIcon className="text-3xl" /> Stories engage people
                      creatively.
                    </p>
                  </div>
                </div>

                {/* Upload Story Photos  */}
                <div className="mt-6">
                  <p className="mb-2.5 inline-block text-[21.12px] font-semibold text-[#636363]">
                    Upload Story Photos
                  </p>
                  <sub className="ml-2 inline-block text-[15.84px] text-[#636363]">
                    (Max 2mb)
                  </sub>

                  <Grid container spacing={2}>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                      {data.picture == "" ? (
                        <Cropper
                          id="image1"
                          onUploadImage={imageParse}
                          height={250}
                          width={250}
                          acceptType="image/*"
                        >
                          <div className="flex h-[193px] w-full items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] xs:h-[278px] xs:w-full">
                            <div className="mr-auto flex items-center pl-[1px] xs:mx-auto">
                              <div className="flex cursor-pointer flex-col items-center justify-center">
                                <AddIcon />
                                <p className="px-4 text-center text-base text-[#484848]">
                                  Drag a File here or browse for a file to
                                  upload
                                </p>
                              </div>
                            </div>
                          </div>
                        </Cropper>
                      ) : (
                        <div
                          className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                            0 === primaryImage
                              ? "border-4 border-orange-500"
                              : ""
                          } `}
                        >
                          <div className="h-[193px] w-full ">
                            <Image
                              alt="story image"
                              fill
                              src={data.picture}
                              className="cursor-pointer rounded-sm border border-[#7b7979] bg-[#f5f6f7] object-contain opacity-100"
                            />
                          </div>

                          <div className="absolute top-0 right-0 left-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                            <Cropper
                              acceptType="image/*"
                              id="image1"
                              onUploadImage={imageParse}
                              height={250}
                              width={250}
                            >
                              <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                                Change Photo
                              </div>
                            </Cropper>
                            <button
                              onClick={handlePrimaryImage(0)}
                              className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                            >
                              Make Primary
                            </button>
                          </div>
                        </div>
                      )}
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                      {data1.picture == "" ? (
                        <Cropper
                          acceptType="image/*"
                          id="image2"
                          onUploadImage={imageParse1}
                          height={250}
                          width={250}
                        >
                          <div
                            className="relative flex h-[193px] w-full items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] xs:h-[278px] xs:w-full"
                            onMouseOver={() => showPopOver(1)}
                            onMouseOut={() => removePopOver(1)}
                          >
                            <div
                              className="absolute top-2 hidden bg-[#253dc0] font-semibold text-white"
                              id="upload1"
                            >
                              Please upload primary image first
                            </div>
                            <div className="mr-auto flex items-center pl-[1px] xs:mx-auto">
                              <div className="flex cursor-pointer flex-col items-center justify-center">
                                <AddIcon />
                                <p className="px-4 text-center text-base text-[#484848]">
                                  Drag a File here or browse for a file to
                                  upload
                                </p>
                              </div>
                            </div>
                          </div>
                        </Cropper>
                      ) : (
                        <div
                          className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                            1 === primaryImage
                              ? "border-4 border-orange-500"
                              : ""
                          } `}
                        >
                          <div className="h-[193px] w-full ">
                            <Image
                              alt="story image"
                              fill
                              src={data1.picture}
                              className="cursor-pointer rounded-sm border border-[#7b7979] bg-[#f5f6f7] object-contain opacity-100"
                            />
                          </div>

                          <div className="absolute top-0 right-0 left-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                            <Cropper
                              acceptType="image/*"
                              id="image2"
                              onUploadImage={imageParse1}
                              height={250}
                              width={250}
                            >
                              <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                                Change Photo
                              </div>
                            </Cropper>
                            <button
                              onClick={handlePrimaryImage(1)}
                              className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                            >
                              Make Primary
                            </button>
                          </div>
                        </div>
                      )}
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                      {data2.picture == "" ? (
                        <Cropper
                          acceptType="image/*"
                          id="image3"
                          onUploadImage={imageParse2}
                          height={250}
                          width={250}
                        >
                          <div
                            className="relative flex h-[193px] w-full items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] xs:h-[278px] xs:w-full"
                            onMouseOver={() => showPopOver(2)}
                            onMouseOut={() => removePopOver(2)}
                          >
                            <div
                              className="absolute top-2 hidden bg-[#253dc0] font-semibold text-white"
                              id="upload2"
                            >
                              Please upload second image first
                            </div>
                            <div className="mr-auto flex items-center pl-[1px] xs:mx-auto">
                              <div className="flex cursor-pointer flex-col items-center justify-center">
                                <AddIcon />
                                <p className="px-4 text-center text-base text-[#484848]">
                                  Drag a File here or browse for a file to
                                  upload
                                </p>
                              </div>
                            </div>
                          </div>
                        </Cropper>
                      ) : (
                        <div
                          className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                            2 === primaryImage
                              ? "border-4 border-orange-500"
                              : ""
                          } `}
                        >
                          <div className="h-[193px] w-full ">
                            <Image
                              alt="story image"
                              fill
                              src={data2.picture}
                              className="cursor-pointer rounded-sm border border-[#7b7979] bg-[#f5f6f7] object-contain opacity-100"
                            />
                          </div>

                          <div className="absolute top-0 right-0 left-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                            <Cropper
                              acceptType="image/*"
                              id="image3"
                              onUploadImage={imageParse2}
                              height={250}
                              width={250}
                            >
                              <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                                Change Photo
                              </div>
                            </Cropper>
                            <button
                              onClick={handlePrimaryImage(2)}
                              className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                            >
                              Make Primary
                            </button>
                          </div>
                        </div>
                      )}
                    </Grid>
                    <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                      {data3.picture == "" ? (
                        <Cropper
                          acceptType="image/*"
                          id="image4"
                          onUploadImage={imageParse3}
                          height={250}
                          width={250}
                        >
                          <div
                            className="relative flex h-[193px] w-full items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] xs:h-[278px] xs:w-full"
                            onMouseOver={() => showPopOver(3)}
                            onMouseOut={() => removePopOver(3)}
                          >
                            <div
                              className="absolute top-2 hidden bg-[#253dc0] font-semibold text-white"
                              id="upload3"
                            >
                              Please upload third image first
                            </div>
                            <div className="flex cursor-pointer flex-col items-center justify-center">
                              <AddIcon />
                              <p className="px-4 text-center text-base text-[#484848]">
                                Drag a File here or browse for a file to upload
                              </p>
                            </div>
                          </div>
                        </Cropper>
                      ) : (
                        <div
                          className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                            3 === primaryImage
                              ? "border-4 border-orange-500"
                              : ""
                          } `}
                        >
                          <div className="h-[193px] w-full ">
                            <Image
                              alt="story image"
                              fill
                              src={data3.picture}
                              className="cursor-pointer rounded-sm border border-[#7b7979] bg-[#f5f6f7] object-contain opacity-100"
                            />
                          </div>

                          <div className="absolute top-0 right-0 left-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                            <Cropper
                              acceptType="image/*"
                              id="image4"
                              onUploadImage={imageParse3}
                              height={250}
                              width={250}
                            >
                              <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                                Change Photo
                              </div>
                            </Cropper>
                            <button
                              onClick={handlePrimaryImage(3)}
                              className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                            >
                              Make Primary
                            </button>
                          </div>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <div
                    className="hidden text-sm text-red-500"
                    id="picture_error"
                  >
                    Story Title is Required
                  </div>
                </div>

                {/* Story Description  */}
                <div className="mt-6">
                  <p className="mb-[20px] font-[muli] text-[21.2px] font-semibold text-[#636363]">
                    Story Description*
                  </p>

                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    placeholder="Write Ngo Story here..."
                    className="h-[319px] font-[muli] lg:min-w-[440px] xl:min-w-[478px]"
                    onChange={descriptionHandler}
                    value={description}
                  />
                </div>
                <div
                  className="hidden text-sm text-red-500"
                  id="description_error"
                >
                  Story Title is Required
                </div>

                <button
                  className="mt-[70px] block h-[67px] w-full max-w-[276px] rounded-sm bg-[#253dc0] text-xl font-medium text-white"
                  onClick={createStory}
                >
                  Submit Story
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <ThankYouModalV2 content={title} visible={thankyou} create />
    </>
  );
};

export default CreateStory;
