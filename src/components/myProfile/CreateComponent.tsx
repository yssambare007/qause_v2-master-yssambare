import dynamic from "next/dynamic";
import { type ChangeEvent, useState } from "react";
import ImageCropper from "../common/imageCropper/Index";

import OutsideClickHandler from "react-outside-click-handler";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox } from "@mui/material";
import { base_url } from "../../utils/utils";
import { TOKEN } from "../../constants/constants";
import ThankYouModalV2 from "../thankYouPopUp/ThankYouPopupV2";
import { useQuery } from "react-query";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import { fetchTagsRequest } from "../../utils/apis/event/Index";
import Image from "next/image";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};

export const eventCharacterCount = 70;

const croppedWidth = 744;
const croppedHeight = 558;

export default function EventCreate() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [image1, setImage1] = useState(null);
  const [image1url, setImage1url] = useState("");
  const [image2url, setImage2url] = useState("");
  const [image3url, setImage3url] = useState("");
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [description, setDescription] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [story, setStory] = useState("");
  const [eventTag, setEventTag]: any = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(null);

  const [thankyou, setThankYou] = useState(false);
  const handleImage1 = (fileData: any, file: any) => {
    setImage1(file);
    handlePrimaryImage(file);
    setImage1url(window.URL.createObjectURL(file));
  };
  const handlePrimaryImage = (file: any) => {
    setPrimaryImage(file);
  };
  const handleImage2 = (fileData: any, file: any) => {
    setImage2(file);
    setImage2url(window.URL.createObjectURL(file));
  };

  const handleImage3 = (fileData: any, file: any) => {
    setImage3(file);
    setImage3url(window.URL.createObjectURL(file));
  };
  const removeTags = (tag: string) => {
    const filteredArray = eventTag.filter((e: string) => e !== tag);
    setEventTag(filteredArray);
  };

  const addTags = (tag: string) => {
    if (eventTag.includes(tag)) {
      removeTags(tag);
    } else {
      setEventTag([...eventTag, tag]);
    }
  };

  const submitButtonCheck = (): boolean => {
    return (
      title.length > 0 &&
      title.length < 71 &&
      eventTag.length > 0 &&
      venue.length > 0 &&
      date.length > 0 &&
      typeof image1 !== "undefined" &&
      description.split(" ").length > 10
    );
  };

  const createEventRequest = () => {
    if (!submitButtonCheck()) {
      setShowWarning(true);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));
      const formdata = new FormData();
      if (primaryImage) {
        formdata.append("primaryImage", primaryImage);
      }

      if (image1 !== primaryImage) {
        formdata.append("images", image1);
      }

      if (image2 !== primaryImage) {
        formdata.append("images", image2);
      }

      if (image3 !== primaryImage) {
        formdata.append("images", image3);
      }
      formdata.append("title", title);
      formdata.append("desc", description);
      formdata.append("tag", eventTag);
      formdata.append("date", date);
      formdata.append("place", venue);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      fetch(base_url + "ngo/event", requestOptions)
        .then((response) => {
          console.log(response);
          setThankYou(true);
        })
        .catch((error) => console.log("error", error));
    }
    refetch();
  };

  const handleChangeImage1 = () => {
    if (image1 === primaryImage) {
      setPrimaryImage(null);
    }
    setImage1(null);
    setImage1url("");
  };

  const handleChangeImage2 = () => {
    if (image2 === primaryImage) {
      setPrimaryImage(null);
    }
    setImage2(null);
    setImage2url("");
  };

  const handleChangeImage3 = () => {
    if (image3 === primaryImage) {
      setPrimaryImage(null);
    }
    setImage3(null);
    setImage3url("");
  };

  const dateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const prevDate = date;
    const now = new Date().toISOString().split("T")[0];
    const newDate = e.target.value;

    if (newDate <= now!) {
      setDate(newDate.toString());
    } else {
      setDate(prevDate);
    }
  };

  const { data, refetch } = useQuery<string[], Error>(
    USE_QUERY_KEYS.fetchEventTags,
    fetchTagsRequest
  );
  const tags = data;

  return (
    <>
      <div className="mx-8 my-4 block">
        {/* <Link
          href={END_POINTS.EVENT_DESK}
          className="flex items-center justify-start"
        >
          <ArrowBack></ArrowBack> back
        </Link> */}
        <p className="text-3xl font-bold">Add Event</p>
        <div className="my-4">
          <label className="mt-4 block text-xl font-light">Event Title*</label>
          <div className="mt-2 flex w-full items-center rounded border-2 border-slate-300 p-4">
            <input
              type="text"
              className="flex-1 outline-0"
              value={title}
              placeholder="Enter Event Title*"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              maxLength={eventCharacterCount}
            ></input>

            <span
              className={`px-4 ${
                eventCharacterCount - title.length < 6
                  ? "text-red-600"
                  : "text-gray-400"
              } text-[0.875rem] leading-none`}
            >
              {eventCharacterCount - title.length}/{eventCharacterCount}
            </span>
          </div>
          {showWarning && (
            <span hidden={title.length < 71} className="text-xs text-red-700">
              Title Length Should be less then 70 characters
            </span>
          )}
          {showWarning && (
            <span hidden={title.length !== 0} className="text-xs text-red-700">
              Enter Title is Required
            </span>
          )}
        </div>

        <div className="block md:flex md:justify-between">
          <div className="w-full md:w-[30%]">
            <label className="mt-4 block text-xl font-light">
              Event Title Tags*
            </label>
            <div className="relative w-full">
              <OutsideClickHandler
                onOutsideClick={() => setIsDropdownOpen(false)}
              >
                <div className="relative flex w-full flex-col flex-wrap items-start justify-start">
                  <div
                    className="mb-2 mt-2 flex min-h-[57px] w-full cursor-pointer items-center justify-between rounded border-2 border-slate-300 p-2 font-semibold text-[#696969]"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {eventTag.length === 0
                      ? "Choose"
                      : eventTag.length <= 2
                      ? eventTag.toString()
                      : `${eventTag.length} Items Selected`}
                    <KeyboardArrowDownIcon className="text-3xl" />
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className={`absolute z-50 w-full  border bg-[#fff]`}>
                    <div className="relative flex h-[60px] w-full flex-row items-center py-1 pl-2">
                      <div className="flex h-[40px] w-[80%] items-center justify-between rounded-sm border-b border-l border-r border-t border-gray-400 px-2 xs:w-[90%]">
                        <input
                          className="flex w-[85%] outline-0"
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
                      {tags &&
                        tags
                          .filter(
                            (tag: string) =>
                              tag.includes(story) ||
                              tag.toLowerCase().includes(story.toLowerCase())
                          )
                          .map((tag: string, index: number) => {
                            return (
                              <div
                                className="cursor-pointer py-1 pl-2 text-[15px] font-normal hover:bg-[#eaeaea]"
                                key={index}
                                onClick={() => addTags(tag)}
                              >
                                <Checkbox
                                  checked={eventTag.includes(tag)}
                                  value={tag}
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
            {showWarning && (
              <span
                hidden={eventTag.length > 0}
                className="text-xs text-red-700"
              >
                tags required
              </span>
            )}
          </div>
          <div className="w-full md:w-[30%]">
            <label className="mt-4 block text-xl font-light">
              Date of Event*
            </label>
            <input
              className="mt-2 w-full rounded border-2 border-slate-300 bg-white p-4"
              placeholder="Date"
              onChange={dateChangeHandler}
              value={date}
              type="date"
              max={new Date().toISOString().split("T")[0]}
            ></input>
            {showWarning && (
              <span hidden={date.length > 0} className="text-xs text-red-700">
                date is Required
              </span>
            )}
          </div>
          <div className="w-full md:w-[30%]">
            <label className="mt-4 block text-xl font-light">Venue*</label>
            <input
              className="mt-2 w-full rounded border-2 border-slate-300 bg-white p-4"
              placeholder="Enter Location*"
              onChange={(e) => {
                setVenue(e.target.value);
              }}
              type="text"
            ></input>
            {showWarning && (
              <span
                hidden={venue.length !== 0}
                className="text-xs text-red-700"
              >
                Venue is Required
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="mt-4 flex items-baseline text-xl font-light">
            Upload Event Photos
            <sub className="block text-xs font-extralight">[Max 2mb]</sub>
          </label>
          {showWarning && (
            <span
              hidden={primaryImage !== null}
              className="text-xs text-red-700"
            >
              Primary Image is Required
            </span>
          )}

          <div className="my-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {image1url.length > 0 ? (
              <div
                className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                  image1 === primaryImage ? "border-4 border-orange-500" : ""
                } `}
              >
                <Image
                  height={320}
                  width={200}
                  className="h-[320px] w-full bg-white object-contain opacity-100"
                  src={image1url}
                  alt="img-1"
                />
                <div className="absolute left-0 right-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                  <ImageCropper
                    id="imageCropper1"
                    acceptType="image/*"
                    onUploadImage={handleImage1}
                    width={croppedWidth}
                    height={croppedHeight}
                  >
                    <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                      Change Photo
                    </div>
                  </ImageCropper>
                  <button
                    onClick={() => {
                      handlePrimaryImage(image1);
                    }}
                    className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                  >
                    Make Primary
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <ImageCropper
                  acceptType="image/*"
                  width={croppedWidth}
                  height={croppedHeight}
                  onUploadImage={handleImage1}
                />
              </div>
            )}
            {image2url.length > 0 ? (
              <div
                className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                  image2 === primaryImage ? "border-4 border-orange-500" : ""
                } `}
              >
                <Image
                  height={320}
                  width={200}
                  className="h-[320px] w-full bg-white object-contain opacity-100"
                  src={image2url}
                  alt="img-1"
                />
                <div className="absolute left-0 right-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                  <ImageCropper
                    id="imageCropper2"
                    acceptType="image/*"
                    onUploadImage={handleImage2}
                    width={croppedWidth}
                    height={croppedHeight}
                  >
                    <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                      Change Photo
                    </div>
                  </ImageCropper>
                  <button
                    onClick={() => {
                      handlePrimaryImage(image2);
                    }}
                    className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                  >
                    Make Primary
                  </button>
                </div>
              </div>
            ) : (
              <ImageCropper
                id="imageCropper2"
                acceptType="image/*"
                onUploadImage={handleImage2}
              />
            )}
            {image3url.length > 0 ? (
              <div
                className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                  image3 === primaryImage ? "border-4 border-orange-500" : ""
                } `}
              >
                <Image
                  height={320}
                  width={200}
                  className="h-[320px] w-full bg-white object-contain opacity-100"
                  src={image3url}
                  alt="img-1"
                />
                <div className="absolute left-0 right-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                  <ImageCropper
                    id="imageCropper3"
                    onUploadImage={handleImage3}
                    width={croppedWidth}
                    height={croppedHeight}
                  >
                    <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                      Change Photo
                    </div>
                  </ImageCropper>
                  <button
                    onClick={() => {
                      handlePrimaryImage(image3);
                    }}
                    className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                  >
                    Make Primary
                  </button>
                </div>
              </div>
            ) : (
              <ImageCropper
                id="imageCropper3"
                acceptType="image/*"
                onUploadImage={handleImage3}
                width={croppedWidth}
                height={croppedHeight}
              />
            )}
          </div>
        </div>
        <div>
          <label className="mt-4 block text-xl font-light">
            Event Description*
          </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Write Founder journey here..."
            className="font-[muli] lg:min-w-[440px] xl:min-w-[478px]"
            onChange={setDescription}
            value={description}
          />
          {showWarning && (
            <span
              hidden={description.split(" ").length > 10}
              className="text-xs text-red-700"
            >
              Description must be between 10 to 500 Words{" "}
            </span>
          )}
        </div>

        <button
          onClick={createEventRequest}
          className="my-6 rounded bg-blue-800 px-16 py-4 text-lg font-bold text-white hover:bg-orange-700 disabled:bg-gray-500"
        >
          Submit Event
        </button>
      </div>

      <ThankYouModalV2 content={title} visible={thankyou} event create />
    </>
  );
}
