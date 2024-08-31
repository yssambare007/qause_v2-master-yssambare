import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import type {
  NeedServiceData,
  ProfileData,
} from "../../../services/types/needs";
import { checkForSupport } from "../../../utils/apis/needs/Index";
import {
  getImageUrlForS3Bucket,
  getPopulatePathValueFromProfile,
} from "../../../utils/utils";
import QauseDoIt from "../../activeNeeds/QauseDoIt";
import NeedsNavbar from "../NeedsNavbar";
import NeedServiceSteps from "./NeedServiceSteps";
import NeedTotalCreditsCard from "./NeedTotalCreditsCard";

function NeedService(props: { need: NeedServiceData; profile: ProfileData }) {
  const [servicesRequested, setServicesRequested] = useState({
    [props.need.title]: props.need.creditRequired,
    "Feature My Card": 0,
  });

  const handleIsFeatureChecked = useCallback((isChecked: boolean) => {
    setServicesRequested((prev) => ({
      ...prev,
      "Feature My Card": isChecked ? 10 : 0,
    }));
  }, []);

  //generate or get init values
  const populateCurrentValues = () => {
    const currentFormData: { [key: string]: any } = {};
    props.need.questions.forEach((question) => {
      let value = null;
      if (question.type == "boolean" && question.inputType == "checkbox") {
        value = false;
      } else if (question.isPopulate && !question.isRequired) {
        value = getPopulatePathValueFromProfile(
          props.profile,
          question.populatePath
        );
      }

      if (Boolean(question.key)) {
        currentFormData[question.key] = value;
      }
      question.subQuestions.forEach((subquestion) => {
        {
          const value = subquestion.isPopulate
            ? getPopulatePathValueFromProfile(
                props.profile,
                subquestion.populatePath
              )
            : null;
          if (Boolean(subquestion.key)) {
            currentFormData[subquestion.key] = value;
          }
        }
      });
    });
    return currentFormData;
  };

  return (
    <div className="w-[100%]">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 border-r border-gray-300 sm:col-span-9">
          {/* head */}

          <NeedsNavbar
            availableCredits={props.profile.creditLeft}
            currentPage={props.need.title}
          />

          <NeedServiceSteps
            handleIsFeatureChecked={handleIsFeatureChecked}
            populatedValues={populateCurrentValues()}
            needId={props.need._id}
            profile={props.profile}
            questions={props.need.questions}
          />
          <NeedAskForSupport needId={props.need._id} />
        </div>
        <div className="col-span-12 px-4 sm:sticky sm:top-0 sm:col-span-3">
          <NeedCardPreview
            address={
              props.profile.address.state + "," + props.profile.address.country
            }
            current_logo={getImageUrlForS3Bucket(
              props.profile._id,
              props.profile.images.logo
            )}
            name={props.profile.name}
            needCategory={props.need.category}
            needTitle={props.need.title}
          />

          <NeedTotalCreditsCard services={servicesRequested} />
        </div>
      </div>
    </div>
  );
}

function NeedCardPreview(props: {
  name: string;
  address: string;
  current_logo: string;
  needTitle: string;
  needCategory: string;
}) {
  return (
    <div className="mt-12">
      <div className="mb-4 text-center text-sm font-bold text-[#1B3763]">
        Your Need Card Preview
      </div>
      <div className="rounded-xl border border-gray-600 px-3 py-4 ">
        <div className="flex items-center gap-2 ">
          <img
            className="h-10 w-10 rounded-full border border-gray-500 "
            src={props.current_logo}
          />
          <div className="text-xs text-[#1B3763]">
            <div className=" font-bold">{props.name}</div>
            <div>{props.address}</div>
          </div>
        </div>
        <img className="my-5 w-full py-2 " src={props.current_logo} />
        <div className="text-sm font-bold text-[#1B3763]">
          {props.needTitle}
        </div>
        <div className="text-xs text-[#1B3763]">{props.needCategory}</div>
      </div>
    </div>
  );
}

function NeedAskForSupport(props: { needId: string }) {
  const { data: canAskForSupport, refetch } = useQuery<boolean>(
    ["checkSupport", props.needId],
    checkForSupport
  );

  const [askSupport, setAskSupport] = useState<{
    gigId: string | null;
    open: boolean;
  }>({
    gigId: null,
    open: false,
  });

  const handleAskSupport = useCallback(() => {
    setAskSupport({
      gigId: props.needId,
      open: true,
    });
  }, [props.needId]);

  const handleClose = useCallback(() => {
    setAskSupport({
      gigId: null,
      open: false,
    });
  }, []);

  const handleSuccess = useCallback(() => {
    setAskSupport({
      gigId: null,
      open: false,
    });
    refetch();
    alert("Ticket Created successfully for support");
  }, [refetch]);

  const disable = !canAskForSupport || canAskForSupport === undefined;

  return (
    <div className="mx-4 my-2 flex flex-col items-center justify-evenly gap-6 border border-[#F79E09] p-2 sm:mx-12 sm:flex-row">
      <div className="text-center text-[#1B3763] sm:text-left">
        <div className="text-xs sm:text-sm">
          Finding it hard to fill the form?
        </div>
        <div className="text-lg font-bold sm:text-2xl">
          Let Qause do it for you!
        </div>
      </div>
      <div className="flex items-center">
        <img src="/images/needservice-bottom.svg" />
        <button
          title={
            canAskForSupport === false
              ? "Already Support Request was created"
              : undefined
          }
          disabled={disable}
          onClick={handleAskSupport}
          className="ml-6 rounded bg-[#F79E09] px-6 py-2 text-xs text-white disabled:bg-yellow-700 sm:text-base "
        >
          Ask For Support
        </button>
      </div>
      <QauseDoIt
        askSupport={true}
        gigId={askSupport.gigId || ""}
        handleClose={handleClose}
        onSuccess={handleSuccess}
        open={askSupport.open}
      />
    </div>
  );
}

export default NeedService;
