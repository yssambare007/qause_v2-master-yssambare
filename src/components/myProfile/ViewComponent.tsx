import { ChangeEvent, useEffect, useState } from "react";
import TimerIcon from "@mui/icons-material/Timer";
import EditIcon from "@mui/icons-material/Edit";
import ExistingEvents from "./ExistingEventComponent";
import ImageCropper from "../common/imageCropper/Index";
import Cropper from "../common/imageCropper/Index";
import { useRouter } from "next/router";
import { END_POINTS } from "../../constants/endpoints";
import { base_url, imageLinkBuilder } from "../../utils/utils";
import OutsideClickHandler from "react-outside-click-handler";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, Grid } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { TOKEN } from "../../constants/constants";
import "react-quill/dist/quill.snow.css";
import ThankYouModalV2 from "../thankYouPopUp/ThankYouPopupV2";
import { UseQueryResult, useQueries } from "react-query";
import {
  fetchEventRequest,
  fetchTagsRequest,
} from "../../utils/apis/event/Index";
import { USE_QUERY_KEYS } from "../../constants/useQueryKeys";
import { eventCharacterCount } from "./CreateComponent";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};
export default function ViewEvent(props: any) {
  const [selectedEventData, setSelectedEventData] = useState<any>();
  // const [events, setEvents] = useState([]);
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [image1, setImage1] = useState<any>();
  const [image1url, setImage1url] = useState("");
  const [image2url, setImage2url] = useState("");
  const [image3url, setImage3url] = useState("");
  const [image2, setImage2] = useState<any>();
  const [image3, setImage3] = useState<any>();
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  // const [tags, setTags] = useState([]);
  const [story, setStory] = useState("");
  const [eventTag, setEventTag]: any = useState([]);
  const [reload, setReload] = useState(false);
  const [thankyou, setThankYou] = useState(false);

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
  const handleImage2Remove = () => {
    setImage2(undefined);
    setImage2url("");
  };

  const handleImage3Remove = () => {
    setImage3(undefined);
    setImage3url("");
  };
  const handleImage1 = (fileData: any, file: any) => {
    setImage1(file);
    setImage1url(window.URL.createObjectURL(file));
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

  const onSelectEvent = async (selectedEvent: any) => {
    setSelectedEventData(selectedEvent);
    setEventId(selectedEvent?.id ?? "");
    setTitle(selectedEvent?.eventDetails?.title ?? "");
    setEventTag(selectedEvent?.eventDetails?.tag ?? "");
    setVenue(selectedEvent?.eventDetails?.place ?? "");
    setDescription(selectedEvent?.eventDetails?.desc ?? "");
    setDate(selectedEvent?.eventDetails?.date ?? "");
    const primaryImage = imageLinkBuilder(
      selectedEvent?.ngo ?? "",
      selectedEvent?.eventDetails?.image?.primary ?? ""
    );
    setImage1url(
      selectedEvent.eventDetails.image.primary.length
        ? primaryImage
        : "/images/no-logo.jpeg"
    );
    setImage2url(
      selectedEvent?.eventDetails?.image?.secondary[0]
        ? imageLinkBuilder(
            selectedEvent?.ngo,
            selectedEvent?.eventDetails?.image?.secondary[0]
          )
        : ""
    );
    setImage3url(
      selectedEvent?.eventDetails?.image?.secondary[1]
        ? imageLinkBuilder(
            selectedEvent?.ngo,
            selectedEvent?.eventDetails?.image?.secondary[1]
          )
        : ""
    );
  };

  const eventUpdateRequest = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "" + localStorage.getItem(TOKEN));

    const formdata = new FormData();
    let removeImage2 = "test_two.jpg";
    let removeImage3 = "test_three.jpg";
    if (
      selectedEventData?.eventDetails?.image?.secondary[0] &&
      image2url.split("/")[image2url.split("/").length - 1] !==
        selectedEventData?.eventDetails?.image?.secondary[0]
    ) {
      removeImage2 = selectedEventData?.eventDetails?.image?.secondary[0];
    }
    if (
      selectedEventData?.eventDetails?.image?.secondary[1] &&
      image3url.split("/")[image3url.split("/").length - 1] !==
        selectedEventData?.eventDetails?.image?.secondary[1]
    ) {
      removeImage3 = selectedEventData?.eventDetails?.image?.secondary[1];
    }
    if (
      image2url !== selectedEventData?.eventDetails?.image?.secondary[0] ||
      image3url !== selectedEventData?.eventDetails?.image?.secondary[1]
    ) {
      formdata.append("imageKeys", removeImage2 + "," + removeImage3);
    }

    if (image1) {
      formdata.append("primaryImage", image1);
    }
    if (image2) {
      formdata.append("images", image2);
    }
    if (image3) {
      formdata.append("images", image3);
    }

    formdata.append("title", title);
    formdata.append("desc", description);
    formdata.append("tag", eventTag);
    formdata.append("date", date);
    formdata.append("place", venue);
    formdata.append("ticketId", eventId);
    formdata.append("isUpdate", "true");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch(base_url + "ngo/event", requestOptions)
      .then((response) => response.text())
      .then(() => {
        setThankYou(true);
      })
      .catch((error) => console.log("error", error));
  };

  const results = useQueries<[UseQueryResult<any>, UseQueryResult<any>]>([
    {
      queryKey: USE_QUERY_KEYS.fetchEvent,
      queryFn: fetchEventRequest,
    },
    {
      queryKey: USE_QUERY_KEYS.fetchEventTags,
      queryFn: fetchTagsRequest,
    },
  ]);

  const events = results[0].data ?? [];
  const tags = results[1].data ?? [];

  const func = async () => {
    if (router?.query?.event) {
      const selectedEvent = JSON.parse("" + router.query.event);
      await onSelectEvent(selectedEvent);
    } else {
      await onSelectEvent(events[0]);
    }
  };
  useEffect(() => {
    func();
  }, [router.query]);
  return (
    <>
      <Grid item xl={8.2} lg={8} md={12} sm={12} xs={12}>
        <div className="my-4 ml-4 mr-4 block">
          {/* <Link
            href={END_POINTS.EVENT_DESK}
            className="flex items-center justify-start"
          >
            <ArrowBack></ArrowBack> back
          </Link> */}
          <div className="flex items-center">
            <p className="border-r border-black pr-1 text-xl font-bold md:text-3xl">
              Event #0
              {events.findIndex((event: any) => event.id === eventId) + 1}
            </p>
            <div className="mx-2">
              (Total Number of Event {6 - events.length})
            </div>
          </div>

          <div className="my-2 flex w-full items-center rounded bg-red-100 p-4 align-middle text-base text-red-700 md:text-xl">
            {/* Status of event */}
            <TimerIcon></TimerIcon>
            <p className="mx-2">Your Event Pending For Approval</p>
          </div>
          <button className="my-2 text-sm" onClick={() => setEdit(!edit)}>
            {!edit ? (
              <>
                Edit
                <EditIcon className="text-sm" />
              </>
            ) : (
              <>
                Cancel
                <CancelOutlined />
              </>
            )}{" "}
          </button>

          <div className="my-4">
            <label className="mt-4 block text-xl font-light">
              Event Title*
            </label>
            <div className="mt-2 flex h-[60px] w-full items-center rounded border-2 border-slate-300">
              <input
                disabled={!edit}
                type="text"
                className="h-full flex-1 px-4 outline-0 disabled:cursor-not-allowed"
                value={title}
                placeholder="Enter Event Title*"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                maxLength={eventCharacterCount}
              ></input>
              {edit && (
                <span
                  className={`px-4 ${
                    eventCharacterCount - title.length < 6
                      ? "text-red-600"
                      : "text-gray-400"
                  } text-[0.875rem] leading-none`}
                >
                  {eventCharacterCount - title.length}/{eventCharacterCount}
                </span>
              )}
            </div>

            <span hidden={title.length !== 0} className="text-xs text-red-700">
              Enter Title is Required
            </span>
          </div>

          <div className="w-full">
            <label className="mt-4 block text-xl font-light">
              Event Title Tags*
            </label>
            {edit ? (
              <div className="w-full">
                <OutsideClickHandler
                  onOutsideClick={() => setIsDropdownOpen(false)}
                >
                  <div className="relative flex flex-col flex-wrap items-start justify-start">
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

                  {isDropdownOpen && edit && (
                    <div className={`z-50 w-full border bg-[#fff] md:w-[100%]`}>
                      <div className="flex h-[60px] w-full flex-row items-center py-1 pl-2">
                        {/* <Checkbox /> */}

                        <div className="flex h-[40px] items-center justify-between rounded-sm border-b border-l border-r border-t border-gray-400 px-2">
                          <input
                            className="flex w-full outline-0"
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
                        {typeof tags !== "undefined" &&
                          tags
                            ?.filter(
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
            ) : (
              <div className="flex">
                {eventTag &&
                  eventTag.map((tag: string) => {
                    return (
                      <div
                        className="my-2 mr-2 rounded border bg-red-100 px-4 py-2"
                        key={tag}
                      >
                        {tag}
                      </div>
                    );
                  })}
              </div>
            )}
            <span hidden={eventTag.length > 0} className="text-xs text-red-700">
              Tags required
            </span>
          </div>
          <div className="flex justify-between">
            <div className="w-[48%]">
              <label className="mt-4 block text-xl font-light">
                Date of Event*
              </label>
              <input
                disabled={!edit}
                className="mt-2 w-full rounded border-2 border-slate-300 bg-white p-4 disabled:cursor-not-allowed"
                placeholder="Date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                value={date}
                type="date"
                max={new Date().toISOString().split("T")[0]}
              ></input>
              <span hidden={date.length > 0} className="text-xs text-red-700">
                Date is Required
              </span>
            </div>
            <div className="w-[48%]">
              <label className="mt-4 block text-xl font-light">Venue*</label>
              <input
                disabled={!edit}
                className="mt-2 w-full rounded border-2 border-slate-300 bg-white p-4 disabled:cursor-not-allowed"
                placeholder="Enter Location*"
                value={venue}
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
                type="text"
              ></input>
              <span
                hidden={venue.length !== 0}
                className="text-xs text-red-700"
              >
                Venue is Required
              </span>
            </div>
          </div>

          <div>
            <label className="mt-4 block text-xl font-light">
              upload Event Photos
            </label>
            <span className="block font-extralight">[Max 2mb]</span>
            <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
              {image1url.length > 0 ? (
                <div
                  className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                    image1 === primaryImage ? "border-4 border-orange-500" : ""
                  } `}
                >
                  <img
                    className="h-[320px] w-full bg-white object-contain opacity-100"
                    src={image1url}
                    alt="primary_img"
                  />
                  {edit && (
                    <div className="absolute left-0 right-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                      <Cropper
                        acceptType="image/*"
                        id="imageCropper1"
                        onUploadImage={handleImage1}
                        width={1920}
                        height={1080}
                      >
                        <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                          Change Photo
                        </div>
                      </Cropper>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {edit && (
                    <ImageCropper
                      acceptType="image/*"
                      id="imageCropper1"
                      width={1920}
                      height={1080}
                      onUploadImage={handleImage1}
                    />
                  )}
                </div>
              )}
              {image2url.length > 0 ? (
                <div
                  className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                    image2 === primaryImage ? "border-4 border-orange-500" : ""
                  } `}
                >
                  <img
                    className="h-[320px] w-full bg-white object-contain opacity-100"
                    src={image2url}
                  ></img>
                  {edit && (
                    <div className="absolute left-0 right-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                      <Cropper
                        acceptType="image/*"
                        id="imageCropper2"
                        onUploadImage={handleImage2}
                        width={1920}
                        height={1080}
                      >
                        <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white">
                          Change Image
                        </div>
                      </Cropper>
                      <div
                        onClick={handleChangeImage2}
                        className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white"
                      >
                        Delete Image
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {edit && (
                    <ImageCropper
                      id="imageCropper2"
                      width={1920}
                      height={1080}
                      onUploadImage={handleImage2}
                    />
                  )}
                </div>
              )}
              {image3url.length > 0 ? (
                <div
                  className={`group relative m-1 flex flex-col items-center justify-center rounded-lg border ${
                    image3 === primaryImage ? "border-4 border-orange-500" : ""
                  } `}
                >
                  <img
                    className="h-[320px] w-full bg-white object-contain opacity-100"
                    src={image3url}
                  ></img>
                  {edit && (
                    <div className="absolute left-0 right-0 top-0 hidden h-full w-full flex-col items-center justify-center bg-gray-500 align-middle opacity-70 group-hover:flex">
                      <Cropper
                        acceptType="image/*"
                        id="imageCropper3"
                        onUploadImage={handleImage3}
                        width={1920}
                        height={1080}
                      >
                        <div className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white  ">
                          Change Image
                        </div>
                      </Cropper>
                      <div
                        onClick={handleChangeImage3}
                        className="m-1 cursor-pointer rounded border-2 border-white px-8 py-4 font-extrabold text-white "
                      >
                        Delete Image
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {edit && (
                    <ImageCropper
                      acceptType="image/*"
                      id="imageCropper3"
                      width={1920}
                      height={1080}
                      onUploadImage={handleImage3}
                    />
                  )}
                </div>
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
              readOnly={!edit}
            />
            <span
              hidden={description.split(" ").length > 10}
              className="text-xs text-red-700"
            >
              Description must be between 10 to 500 Words{" "}
            </span>
          </div>

          {edit && (
            <button
              onClick={eventUpdateRequest}
              className="my-6 rounded bg-blue-800 px-16 py-4 text-lg font-bold text-white hover:bg-orange-700 disabled:bg-gray-500"
            >
              Update
            </button>
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
        <ExistingEvents
          onClickEvent={onSelectEvent}
          redirectTo={END_POINTS.EVENT_DESK}
          reload={reload}
        />
      </Grid>

      <ThankYouModalV2 content={title} visible={thankyou} event />
    </>
  );
}
