import Close from "@mui/icons-material/Close";
import { CircularProgress, Dialog, IconButton, Zoom } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import type { Feedback, NgoFeedback } from "../../services/types/feedback";
import type { VolunteerDetails } from "../../services/types/needs";
import { getVolunteers, saveFeedback } from "../../utils/apis/feedback/Index";
import MultipleVolunteerFeedback from "./MultipleVolunteerFeedback";
import SingleVolunteerFeedback from "./SingleVolunteerFeedback";

function GetFeedbackPopup(props: {
  currentGigId: string | null;
  handleClose: () => void;
}) {
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>();
  const [gotCompletionStatus, setCompletionStatus] = useState(false);

  const { data: feedbackData, status } = useQuery<Feedback | null>(
    ["volunteers", props.currentGigId],
    async () => await getVolunteers(props.currentGigId),
    {
      enabled: Boolean(props.currentGigId),
    }
  );

  const router = useRouter();

  const { mutate, isLoading: isSavingFeedback } = useMutation(saveFeedback, {
    onSuccess: () => {
      console.log("success");
      alert("successfully updated");
      router.push({
        pathname: "/ngobackend/created-need",
        query: {
          isPending: true,
        },
      });
    },
    onError(err) {
      console.log("Failed", err);
      alert(err);
    },
  });

  const handleCompletionStatus = useCallback((isCompleted: boolean) => {
    setCompletionStatus(true);
    setIsTaskCompleted(isCompleted);
  }, []);

  const handleClose = useCallback(() => {
    props.handleClose();
    setCompletionStatus(false);
  }, [props]);

  const handleBack = useCallback(() => {
    setCompletionStatus(false);
  }, []);

  const handleFeedbackSubmission = useCallback(
    (response: NgoFeedback) => {
      const data: NgoFeedback = {
        isCompleted: isTaskCompleted,
        ...response,
        gigType: feedbackData?.questionsFormat.gigType,
      };
      const payload: FormData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, value);
      });
      mutate({ gigId: props.currentGigId, data: payload });
      console.log(data);
    },
    [
      feedbackData?.questionsFormat.gigType,
      isTaskCompleted,
      mutate,
      props.currentGigId,
    ]
  );

  return (
    <Dialog
      open={Boolean(props.currentGigId)}
      PaperProps={{
        className: "!rounded-md !bg-qause-gray !max-w-6xl p-0",
      }}
      TransitionComponent={Zoom}
      keepMounted
      onClose={handleClose}
    >
      <div className="flex h-full flex-col items-center">
        <div className="flex w-full justify-end">
          <IconButton onClick={handleClose} className="!rounded-md !bg-black">
            <Close fontSize="small" htmlColor="#FFFFFF" />
          </IconButton>
        </div>
        {feedbackData && status == "success" ? (
          <div className="m-5 flex-grow">
            {!gotCompletionStatus ? (
              <VolunteerCompletionStep onResponse={handleCompletionStatus} />
            ) : (
              <RenderCompletionStepResponse
                onBack={handleBack}
                onFeedbackSubmit={handleFeedbackSubmission}
                feedbackdata={feedbackData}
                isLoading={isSavingFeedback}
                isTaskCompleted={isTaskCompleted}
              />
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-10">
            <CircularProgress />
          </div>
        )}
      </div>
    </Dialog>
  );
}

//step one - get completion status
function VolunteerCompletionStep(props: {
  onResponse: (isCompleted: boolean) => void;
}) {
  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onResponse(e.currentTarget.value === "Yes");
    },
    [props]
  );

  return (
    <div className="flex h-[80vh] flex-col-reverse items-center justify-center rounded-sm bg-white sm:flex-row">
      <img
        alt="needFeedback aside"
        src="/images/needFeedback-aside.png"
        className="hidden w-[100%] object-contain object-center sm:block sm:w-[50%]"
      />
      <div className="mx-8 w-[50%]">
        <h1 className="text-center text-xl font-extrabold text-qause-blue-dark">
          Did the volunteer complete the assigned task
        </h1>
        <div className="mt-12 flex justify-center">
          {["Yes", "No"].map((option) => (
            <div className="mx-2 cursor-pointer" key={option}>
              <input
                id={option}
                type="radio"
                name="feedbackRadiobtns"
                value={option}
                className="peer hidden"
                onChange={handleValueChange}
                required={true}
              />
              <label
                htmlFor={option}
                className=" h-14 rounded-md border border-gray-500 bg-white px-4 py-3  text-base font-extrabold text-qause-blue-dark peer-checked:border-none peer-checked:bg-[#f4ad00] peer-checked:text-white "
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//step two navigate based on response
function RenderCompletionStepResponse(props: {
  isTaskCompleted?: boolean;
  feedbackdata: Feedback;
  isLoading: boolean;
  onFeedbackSubmit: (response: NgoFeedback) => void;
  onBack: () => void;
}) {
  return !props.isTaskCompleted ? (
    <VolunteerNotCompleted data={props.feedbackdata} />
  ) : (
    <GetFeedback
      onBack={props.onBack}
      onFeedbackSubmit={props.onFeedbackSubmit}
      isLoading={props.isLoading}
      type={props.feedbackdata.type}
      volunteers={props.feedbackdata.requests}
    />
  );
}

//step 2 if yes
function GetFeedback(props: {
  type: "multipleVolunteering" | "singleVolunteering";
  volunteers: VolunteerDetails[];
  isLoading: boolean;
  onFeedbackSubmit: (response: NgoFeedback) => void;
  onBack: () => void;
}) {
  return props.type === "multipleVolunteering" ? (
    <MultipleVolunteerFeedback
      isLoading={props.isLoading}
      onBack={props.onBack}
      volunteers={props.volunteers}
      onFeedbackSubmit={props.onFeedbackSubmit}
    />
  ) : (
    <SingleVolunteerFeedback
      isLoading={props.isLoading}
      onBack={props.onBack}
      volunteer={props.volunteers[0]}
      onFeedbackSubmit={props.onFeedbackSubmit}
    />
  );
}

//step 2 if not completed
function VolunteerNotCompleted(props: { data: Feedback }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm bg-white px-12 py-6">
      <div className="flex w-full items-center justify-evenly gap-2">
        <div className="h-[1px] flex-grow bg-gray-300"></div>
        <div className="text-lg font-bold text-gray-400">
          We&#39;re sorry about that!
        </div>
        <div className="h-[1px] flex-grow bg-gray-300"></div>
      </div>
      <div className="my-4 max-w-xl  text-center text-xl font-bold text-qause-blue-dark">
        You can still renew your card and get a new volunteer
      </div>
      <div className="my-6  rounded-xl border border-gray-300 px-4 pt-4">
        <div className="rounded-xl border  border-gray-300 bg-qause-gray px-1 py-2 ">
          <div className="flex items-center gap-2 ">
            <img
              alt="profile"
              className="h-10 w-10 rounded-full border border-gray-500 p-1"
              src={props.data.ngo.logo}
            />
            <div className="text-xs text-[#1B3763]">
              <div className=" font-bold">{props.data.ngo.name}</div>
              <div>{props.data.ngo.state + ", " + props.data.ngo.country}</div>
            </div>
          </div>
          <img
            alt="need image"
            className="my-4 max-h-32 w-full p-2 "
            src={props.data.questionsFormat.logo}
          />
          <div className="ml-2 text-sm font-bold text-[#1B3763]">
            {props.data.title}
          </div>
          <div className="ml-2 text-xs text-[#1B3763]">
            {props.data.category}
          </div>
        </div>
        <div className="my-4 flex justify-between gap-4 text-xs text-gray-500">
          <div>
            Status : <span className="font-bold text-red-700">Expired</span>
          </div>
          <div>
            Required :
            <span className="font-bold text-qause-blue-dark">
              {props.data.questionsFormat.creditRequired} Credits
            </span>
          </div>
        </div>
      </div>
      <div className="my-6 text-xl font-bold text-qause-blue-dark">
        Would you like to try again?
      </div>
      <button className="rounded-sm bg-qause-yellow px-4 py-3 font-bold text-white ">
        Add Credits to proceed
      </button>
    </div>
  );
}

export default GetFeedbackPopup;
