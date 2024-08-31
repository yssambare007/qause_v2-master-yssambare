import {
  CalendarMonthOutlined,
  Call,
  ChatBubbleOutline,
  ContactMailOutlined,
  LocationOn,
  Mail,
} from "@mui/icons-material";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import type { NgoFeedback } from "../../services/types/feedback";
import type { VolunteerDetails } from "../../services/types/needs";
import FeedbackForm from "./FeedbackForm";

function MultipleVolunteerFeedback(props: {
  onBack: () => void;
  isLoading: boolean;
  volunteers: VolunteerDetails[];
  onFeedbackSubmit: (resonse: NgoFeedback) => void;
}) {
  const [selectedVolunteers, setSelectedVolunteers] = useState<
    { _id: string; isSelected: boolean }[]
  >([]);

  const [areVolunteersSelected, setVolunteersSelected] =
    useState<boolean>(false);

  const handleVolunteerChosen = useCallback(
    (volunteers: { _id: string; isSelected: boolean }[]) => {
      setSelectedVolunteers(volunteers);
      setVolunteersSelected(true);
    },
    []
  );

  const handleOnBack = useCallback(() => {
    setVolunteersSelected(false);
  }, []);

  const handleSubmit = useCallback(
    (response: NgoFeedback) => {
      props.onFeedbackSubmit({
        ...response,
        selectedVolunteer: selectedVolunteers,
      });
    },
    [selectedVolunteers, props]
  );

  return (
    <div className="w-[60vw] rounded-md bg-white">
      <div className="flex items-center gap-4 border-b border-gray-300 px-4 py-2">
        <div className="text-lg font-extrabold text-qause-blue-dark">
          Feedback Form
        </div>
        <Link href="#" className="text-sm font-bold">
          View Card
        </Link>
      </div>
      {areVolunteersSelected ? (
        <div className="grid grid-cols-2">
          <img className="w-full" src="/images/multiselectFeedbackAside.png" />
          <div>
            <FeedbackForm
              isLoading={props.isLoading}
              type="singleColumn"
              onBack={handleOnBack}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <ChooseVolunteers
          onBack={props.onBack}
          onVolunteersChosen={handleVolunteerChosen}
          current={selectedVolunteers}
          volunteers={props.volunteers}
        />
      )}
    </div>
  );
}

function ChooseVolunteers(props: {
  volunteers: VolunteerDetails[];
  current: { _id: string; isSelected: boolean }[];
  onBack: () => void;
  onVolunteersChosen: (
    selectedVolunteers: { _id: string; isSelected: boolean }[]
  ) => void;
}) {
  const [selectedVolunteers, setSelectedVolunteers] = useState<
    { _id: string; isSelected: boolean }[]
  >(props.current); //isselected required for api

  const handleVolunteerSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedVolunteers((current) =>
        e.target.checked
          ? [...current, { _id: e.target.value, isSelected: true }]
          : current.filter((volunteer) => volunteer._id != e.target.value)
      );
    },
    []
  );

  const handleContinue = () => {
    if (selectedVolunteers.length != 0)
      props.onVolunteersChosen(selectedVolunteers);
    else {
      alert("Select some volunteers to give feedback");
    }
  };

  return (
    <div className="p-6 text-center">
      <div className="text-2xl font-extrabold text-qause-blue">
        How many Volunteers showed up in the event?
      </div>
      <div className="my-6 text-xl font-extrabold text-qause-blue-dark">
        Selected {selectedVolunteers.length} of {props.volunteers.length}{" "}
        Volunteers
      </div>
      <div className="col-span-2 mt-14 flex flex-wrap justify-center gap-10 p-6">
        {props.volunteers.map((volunteer) => {
          const isChecked = selectedVolunteers.some(
            (selectedVolunteer) =>
              selectedVolunteer._id === volunteer.volunteerId
          );
          return (
            <div className="" key={volunteer.volunteerId}>
              <input
                id={volunteer.volunteerId}
                type="checkbox"
                name="radiobtns"
                value={volunteer.volunteerId}
                className="peer hidden"
                onChange={handleVolunteerSelect}
                checked={isChecked}
                required={true}
              />
              <label
                htmlFor={volunteer.volunteerId}
                className="cursor-pointer "
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className={`group relative rounded-full border ${
                      isChecked
                        ? "border-2 border-qause-yellow"
                        : "border-gray-300 "
                    } `}
                  >
                    <img
                      className="h-20 w-20 rounded-full"
                      src={volunteer.volunteerAvatar}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex h-full w-full items-center justify-center rounded-full bg-black bg-opacity-50 text-center text-sm text-white opacity-0 duration-300 group-hover:opacity-100">
                      Tap to {isChecked ? "unselect" : "select"}
                    </div>
                    <div className="border-gray-30 absolute left-24 top-0  rounded-md border bg-white opacity-0 duration-300 group-hover:opacity-100">
                      <div className="flex gap-6 bg-white p-4">
                        <div className="w-20 flex-grow text-center">
                          <img
                            src={volunteer.volunteerAvatar}
                            className="h-20 w-20 rounded-full"
                          />
                          <div className="my-2 text-xs text-qause-blue-dark">
                            {volunteer.volunteerGender || "Male"}
                          </div>
                        </div>
                        <div className="text-left text-sm capitalize text-qause-blue-dark">
                          <div className="mb-4 text-base font-extrabold text-qause-blue-dark">
                            {volunteer.volunteerName}
                          </div>
                          <div className="my-2 flex items-center gap-4">
                            <Mail
                              fontSize="small"
                              className="text-qause-yellow"
                            />
                            <div>{volunteer.volunteerEmail}</div>
                          </div>
                          <div className="my-2 flex items-center gap-4 capitalize">
                            <LocationOn
                              fontSize="small"
                              className="text-qause-yellow"
                            />
                            <div>{volunteer.address.state}</div>
                          </div>
                          <div className="my-2 flex items-center gap-4">
                            <Call
                              fontSize="small"
                              className="text-qause-yellow"
                            />
                            <button>Click to Reveal</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-4 bg-qause-gray px-2 py-1">
                        <button>
                          <ContactMailOutlined fontSize="small" />
                        </button>
                        <button className="p-1 text-xs">call</button>
                        <button>
                          <ChatBubbleOutline fontSize="small" />
                        </button>
                        <button>
                          <CalendarMonthOutlined fontSize="small" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-xs font-bold capitalize ${
                      isChecked
                        ? "font-extrabold text-qause-blue-dark"
                        : "text-gray-500"
                    }`}
                  >
                    {volunteer.volunteerName}
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
      <div className="my-2 text-lg font-bold text-qause-blue-dark">
        Your feedback matters!
      </div>
      <div className="text-lg text-qause-blue-dark ">
        A little motivation & appreciation is all they need!
      </div>
      <div className="mt-16 flex items-center justify-center gap-4">
        <button
          onClick={props.onBack}
          className="bg-white px-4 py-2 text-sm font-bold "
        >
          Back
        </button>
        <button
          className="rounded-lg bg-qause-blue px-6 py-2 text-base font-bold text-white"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default MultipleVolunteerFeedback;
