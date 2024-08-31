import { IconButton } from "@mui/material";
import React from "react";
import type { VolunteerDetails } from "../../services/types/needs";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import { ChatBubbleOutline } from "@mui/icons-material";
import Link from "next/link";
import FeedbackForm from "./FeedbackForm";
import type { NgoFeedback } from "../../services/types/feedback";

function SingleVolunteerFeedback(props: {
  volunteer?: VolunteerDetails;
  isLoading: boolean;
  onFeedbackSubmit: (resonse: NgoFeedback) => void;
  onBack: () => void;
}) {
  if (!props.volunteer) {
    return (
      <div className="text-center text-lg text-red-600">
        Volunteers not found
      </div>
    );
  }

  return (
    <div className="grid  h-full w-full grid-cols-12 gap-3">
      <div className="col-span-12 rounded-md border border-gray-300 bg-white sm:col-span-9">
        <div className="flex items-end gap-4 border-b border-gray-300 px-4 py-2">
          <div className="text-lg font-extrabold text-qause-blue-dark">
            Volunteer Feedback
          </div>
          <Link href="#" className="text-sm font-bold">
            View Card
          </Link>
        </div>
        <FeedbackForm
          isLoading={props.isLoading}
          type="twoColumn"
          onBack={props.onBack}
          onSubmit={props.onFeedbackSubmit}
        />
      </div>
      <div className="col-span-12 rounded-md border border-gray-300 bg-white sm:col-span-3">
        <ProfileDetails volunteer={props.volunteer} />
      </div>
    </div>
  );
}

function ProfileDetails(props: { volunteer: VolunteerDetails }) {
  const aboutFields: { [key: string]: string | string[] } = {
    Points: props.volunteer.points + "",
    Language: props.volunteer.languageKnown,
    Location: props.volunteer.address.state,
    Interest: props.volunteer.passions,
  };

  return (
    <div className="px-6 py-6 text-center">
      <div className="my-2 text-center text-lg font-bold text-gray-500">
        Volunteers matched
      </div>
      <div className="my-4 flex flex-col items-center">
        <img
          className="h-24 w-24 rounded-full border border-gray-300 object-cover p-1 "
          src={props.volunteer.volunteerAvatar}
        />
        <div className="my-2 text-xl font-extrabold capitalize text-qause-yellow">
          {props.volunteer.volunteerName}
        </div>
        <div className="text-sm text-qause-blue-dark ">
          {props.volunteer.volunteerGender}
        </div>
      </div>
      <div className="my-2">
        <div className="my-1 flex items-center gap-2">
          <CallIcon
            className="!rounded-full !border !border-qause-yellow !p-1"
            fontSize="medium"
          />
          <button className="rounded border border-gray-300 bg-qause-gray px-2 py-1 text-xs text-qause-blue-dark">
            Click to Reveal
          </button>
        </div>

        <div className="my-2 flex items-center gap-2">
          <MailIcon
            className="!rounded-full !border !border-qause-yellow !p-1"
            fontSize="medium"
          />
          {props.volunteer.volunteerEmail}
        </div>
      </div>
      <div className="my-8 text-left">
        {Object.entries(aboutFields).map(([fieldName, fieldValue]) => (
          <div className="my-3 grid grid-cols-2" key={fieldName}>
            <div className="text-sm text-qause-blue-dark">{fieldName}</div>
            <div className="text-sm font-bold text-qause-yellow">
              {typeof fieldValue == "string"
                ? fieldValue
                : fieldValue.map((value) => (
                    <div className="my-2" key={value}>
                      {value}
                    </div>
                  ))}
            </div>
          </div>
        ))}
        <div className="my-3 grid grid-cols-2 justify-items-start">
          <div className="text-sm text-qause-blue-dark">Chat</div>
          <IconButton>
            <ChatBubbleOutline />
          </IconButton>
        </div>
        <div className="my-3 grid grid-cols-2 justify-items-start">
          <div className="text-sm text-qause-blue-dark">Call</div>
          <IconButton>
            <CallIcon className="!text-qause-yellow" />
          </IconButton>
        </div>
      </div>
      <button className="rounded border border-gray-300 bg-qause-gray px-2 py-1 text-qause-blue-dark">
        View Profile
      </button>
    </div>
  );
}

export default SingleVolunteerFeedback;
