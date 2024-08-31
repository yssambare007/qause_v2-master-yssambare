import Image from "next/image";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { base_url, imageLinkBuilder, S3Bucket } from "../../utils/utils";
import YouSureModal from "../common/YouSureModal";
import { useRouter } from "next/router";

interface Props {
  Events: Array<unknown>;
  className?: string;
  redirect?: boolean;
  imageHeight?: string;
  onDataReload?: () => void;
  onClickEvent?: (event: any) => void;
  onDeleteEvent?: (id: string) => void;
  imageGridClassName?: string;
  event?: boolean;
}

export default function ViewStories(props: Props) {
  const { imageHeight = "h-28" } = props;
  const [eventsBar, setEventsBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [tempId, setTempId] = useState("");

  const router = useRouter();
  const removeEventWithKey = async (id: any) => {
    setTempId(id);
    setOpen(true);
  };
  const handleViewStory = (id: string) => {
    console.log(id);
    if (id) {
      router.push({
        pathname: "/ngobackend/story/view",
        query: { id },
      });
    }
  };
  function handleCloseOpen() {
    setOpen(false);
  }
  async function handleDelete() {
    const deleteStory = await fetch(`${base_url}ngo/story/${tempId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    const deleteResult = await deleteStory.json();
    if (deleteResult.success) {
      if (props.onDataReload) {
        props.onDataReload();
      }
      if (props.redirect) {
        router.push("/ngobackend/story/desk");
      }
      handleCloseOpen();
    }
  }

  return (
    <>
      <>
        <div
          className={`absolute bottom-0 right-[0.25px] top-0 h-[calc(100vh-80px)] overflow-hidden lg:h-full lg:w-full ${
            eventsBar
              ? "opacity-100"
              : "collapse opacity-0 lg:visible lg:opacity-100"
          } w-[295px] bg-[#f3f2f3] transition-all lg:relative ${
            props.className
          }`}
        >
          <p className="pl-[26.4px] pt-[26.4px] text-[21.432px] font-bold text-[#636363] xs:text-[17.28px]">
            Pending for Approval
          </p>
          <div className="mt-5 h-[calc(100vh-170px)] overflow-y-auto p-[26.4px] pt-2 lg:h-full">
            {props.Events && props.Events.length > 0 ? (
              <div
                className={`grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 ${props.imageGridClassName} gap-4 px-1`}
              >
                {props.Events.map((event: any) => (
                  <div key={event.id} className="relative flex flex-col">
                    <div
                      style={{ transition: "all 0.2s ease" }}
                      className="absolute -right-2 -top-1.5 z-20 flex cursor-pointer text-[34px] hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onDeleteEvent
                          ? props.onDeleteEvent?.(event.id)
                          : removeEventWithKey(event.id);
                      }}
                    >
                      <CloseIcon
                        fontSize="inherit"
                        className="z-10 rounded-full bg-black p-[0.25em] font-bold text-white"
                      />
                    </div>
                    <div
                      style={{ transition: "all 0.15s ease" }}
                      className="cursor-pointer hover:opacity-95 active:scale-[98%]"
                      onClick={() => {
                        props.onClickEvent
                          ? props.onClickEvent?.(event)
                          : handleViewStory(event.id);
                      }}
                    >
                      <div className="relative flex h-auto items-center justify-center rounded-sm border  border-gray-300 xs:w-full">
                        {event.storyDetails?.image && (
                          <div
                            className={`z-10 flex items-center xs:mx-auto ${imageHeight}`}
                          >
                            <Image
                              unoptimized
                              src={
                                props.event
                                  ? event.eventDetails.image.primary.length
                                    ? imageLinkBuilder(
                                        event.ngo,
                                        event.eventDetails.image.primary
                                      )
                                    : "/images/no-logo.jpeg"
                                  : event.storyDetails.image.primary.length
                                  ? `${S3Bucket}${event.createdBy}/story/${event.storyDetails.image.primary}`
                                  : "/images/no-logo.jpeg"
                              }
                              fill
                              alt={
                                props.event
                                  ? event.eventDetails.title
                                  : event.title
                              }
                            />
                          </div>
                        )}
                      </div>
                      <div className="w-full overflow-hidden bg-[#ebeaea] px-2 py-4">
                        <p className="max-w-full overflow-hidden truncate text-sm font-semibold text-[#636363]">
                          {!props.event ? (
                            event.storyDetails?.title
                          ) : (
                            <>
                              {event.eventDetails?.title}
                              <br />
                              {new Date(
                                event?.eventDetails?.date
                              ).toDateString()}
                              <br />
                              {event?.eventDetails?.place}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xl">
                there are no pending {props.event ? "events" : "stories"},
                please add {props.event ? "events" : "stories"}
              </p>
            )}
          </div>
        </div>
        <button
          className={`absolute block bg-blue-900 text-white transition-all lg:hidden ${
            !eventsBar ? "-right-14" : "right-[230px]"
          } fixed top-1/2 -rotate-90 px-4 py-2`}
          onClick={() => setEventsBar(!eventsBar)}
        >
          View {props.event ? "Events" : "Stories"}{" "}
          <KeyboardArrowUpIcon
            className={`${eventsBar ? "rotate-180" : ""}`}
          ></KeyboardArrowUpIcon>
        </button>
        {!props.event && (
          <YouSureModal
            open={open}
            handleClose={handleCloseOpen}
            handleYes={handleDelete}
          />
        )}
      </>
    </>
  );
}
