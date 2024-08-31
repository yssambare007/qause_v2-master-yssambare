import React, { useCallback, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import GroupsIcon from "@mui/icons-material/Groups";
import ShareIcon from "@mui/icons-material/Share";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import OutsideClickHandler from "react-outside-click-handler";
import NeedsPopup from "./popups/Index";
import CancelNeedCardModal from "./CancelNeedCardModal";
import Link from "next/link";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "green" : "#308fe8",
  },
}));
function LiveCard(props: {
  openFeedback?: (currentGigId: string) => void;
  type: string;
  value: any;
}) {
  const StatusMap: any = {
    pending: { label: "Pending", color: "#F79E09" },
    live: { label: "Live", color: "#5EA421" },
    cancelled: { label: "Cancelled", color: "#F14444" },
  };

  const [open, setOpen] = useState(false);
  const [fundRaiseDialog, setFundraisingDialog] = useState(false);
  const [showCancelCard, setShowCancelCard] = useState(false);
  const getValuePercentage = (a: number, b: number) => {
    const c = (b / a) * 100;
    return c;
  };

  const openCancelModal = React.useCallback(
    () => setShowCancelCard(true),
    [showCancelCard]
  );
  const closeCancelModal = React.useCallback(
    () => setShowCancelCard(false),
    [showCancelCard]
  );
  const handleOutSideClick = React.useCallback(() => setOpen(false), [open]);
  const handleFundRaiserDialog = React.useCallback(
    () => setFundraisingDialog(false),
    [fundRaiseDialog]
  );
  const openTheDetails = () => {
    setOpen(true);
  };

  const handlePopup = (type: string) => {
    if (type === "fundraising") {
      setFundraisingDialog(true);
    }
  };

  const handleFeedback = () => {
    if (props.openFeedback) {
      props.openFeedback(props.value._id);
    }
  };

  const getNavLinkBasedOnGigType = useCallback(() => {
    if (props.type === "pending") {
      return `/ngobackend/single-card-details?needId=${props.value._id}&isEdit=true`;
    }
    switch (props.value.type) {
      case "fundraising":
        return `/gig/fundraisingGig-details?needId=${props.value._id}`;
      case "multipleVolunteering":
        return `/gig/multipleGig-details?needId=${props.value._id}`;
      case "singleVolunteering":
        return `/gig/singleGig-details?needId=${props.value._id}`;
      default:
        return "#";
    }
  }, [props]);

  return (
    <>
      <div className="relative mx-auto h-full max-w-[350px] rounded-xl border-2 border-[#F79E09] px-[25px] py-[30px]">
        {props.type == "live" && (
          <>
            <div id="liveTag">Live</div>
            <div className="mb-2 flex">
              <ShareIcon
                sx={{
                  fontSize: "1.1rem",
                  mr: "1rem",
                  mt: "3px",
                  cursor: "pointer",
                }}
              />
              <HistoryIcon sx={{ fontSize: "1.2rem", mr: "2px", mt: "3px" }} />
              <div className="text-[14px] font-semibold">3 Days</div>
            </div>
          </>
        )}
        <Link href={getNavLinkBasedOnGigType()}>
          <div className="mb-3 flex w-full justify-center rounded-lg bg-[#F1F5FA] p-4">
            <img
              src={props.value.logo}
              className="h-[90px] w-[160px] rounded-md object-contain"
              alt="logo"
            />
          </div>
        </Link>
        <Link href={getNavLinkBasedOnGigType()}>
          <div className="mb-3 flex items-center justify-center">
            {props.value.type == "singleVolunteering" && (
              <PersonIcon
                sx={{ fontSize: "1.4rem", color: "#0020D1", mr: "5px" }}
              />
            )}
            {props.value.type == "multipleVolunteering" && (
              <GroupsIcon
                sx={{ fontSize: "1.4rem", color: "#0020D1", mr: "5px" }}
              />
            )}
            {props.value.type == "fundraising" && (
              <VolunteerActivismIcon
                sx={{ fontSize: "1.4rem", color: "#0020D1", mr: "5px" }}
              />
            )}

            <div
              onClick={(event) => {
                if (props.value.type === "fundraising") event.preventDefault();
                handlePopup(props.value.type);
              }}
              className="cursor-pointer text-[14px] font-semibold text-[#0020D1]"
            >
              {props.value.title.length > 15
                ? props.value.title.slice(0, 15) + "..."
                : props.value.title}
            </div>
          </div>
        </Link>
        {/* fundraising */}
        {props.value.type == "fundraising" && (
          <>
            <div className="mb-2 text-center text-[13px] font-medium">
              ₹
              <span className="font-extrabold">
                {props.value.donates / 100}
              </span>{" "}
              raised out of {props.value.amount / 100}
            </div>
            <BorderLinearProgress
              variant="determinate"
              value={getValuePercentage(
                props.value.amount,
                props.value.donates
              )}
            />
            <div className="mb-8 mt-2 flex items-center justify-end">
              <FavoriteIcon sx={{ fontSize: "1.2rem", color: "red" }} />
              <div className="ml-[5px] text-[13px] font-bold">
                {props.value.supporters} Supporters
              </div>
            </div>
          </>
        )}
        {props.value.type == "singleVolunteering" && (
          <>
            <div className="my-[1rem] mb-[70px] text-center text-[14px] font-bold">
              Need created on{" "}
              {new Date(props.value.createdAt)
                .toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })
                ?.slice(0, 10)}
            </div>
          </>
        )}
        {props.value.type == "multipleVolunteering" && (
          <>
            <div className="my-[1rem] mb-[70px] text-center text-[14px] font-bold">
              Volunteer Accepted&nbsp;{props.value.requests} of{" "}
              {props.value.numberOfVolunteer}
            </div>
          </>
        )}
        {props.type == "feedback" && (
          <button
            onClick={handleFeedback}
            className="w-full rounded-full bg-[#F79E09] py-[10px] text-center font-bold text-white"
          >
            Feedback
          </button>
        )}
        {(props.type == "live" || props.type == "pending") && (
          <OutsideClickHandler onOutsideClick={handleOutSideClick}>
            <div className="relative flex cursor-pointer justify-center">
              <KeyboardArrowDownRoundedIcon
                sx={{
                  position: "absolute",
                  right: "15%",
                  fontSize: "1.6rem",
                  top: "calc(50% - 0.8rem)",
                }}
              />
              <div
                id="remove-arrow"
                className="w-[80%] rounded-md border border-[#a6a6a6] bg-[#f5f5f5] px-2 py-2"
                onClick={openTheDetails}
              >
                Select Action
              </div>
              {open && (
                <div className="absolute top-[40px] z-10 w-[80%] rounded-b-lg border border-gray-400 bg-white">
                  {props.type == "live" && (
                    <Link
                      href={getNavLinkBasedOnGigType()}
                      key={"viewcarddetails"}
                      className="px-4 py-2 hover:bg-[#fafafa]"
                    >
                      View Card Details
                    </Link>
                  )}
                  {props.type == "pending" && (
                    <Link
                      href={`/ngobackend/single-card-details?needId=${props.value._id}&isEdit=true`}
                      key={"editcarddetails"}
                      className="px-4 py-2 hover:bg-[#fafafa]"
                    >
                      Edit Card Details
                    </Link>
                  )}
                  <div
                    key={"open-cancel-modal"}
                    className="w-full px-4 py-2 hover:bg-[#fafafa]"
                    onClick={openCancelModal}
                  >
                    Cancel My request
                  </div>
                </div>
              )}
            </div>
          </OutsideClickHandler>
        )}
      </div>
      <CancelNeedCardModal
        show={showCancelCard}
        status={StatusMap[props.type]}
        onClose={closeCancelModal}
        card={props.value}
      />
      {props.value.type == "fundraising" && (
        <NeedsPopup
          visible={fundRaiseDialog}
          setVisible={handleFundRaiserDialog}
          data={props.value}
          percValue={getValuePercentage(
            props.value.amount,
            props.value.donates
          )}
        />
      )}
    </>
  );
}

export default LiveCard;
