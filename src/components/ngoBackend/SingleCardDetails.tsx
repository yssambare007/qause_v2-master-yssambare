import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import type {
  NeedEditResponses,
  ProfileData,
} from "../../services/types/needs";
import NeedServiceSteps from "../needs/service/NeedServiceSteps";
import NeedTotalCreditsCard from "../needs/service/NeedTotalCreditsCard";

function SingleCardDetails(props: {
  isEdit: boolean;
  needResponse: NeedEditResponses;
  profile: ProfileData;
}) {
  const [servicesRequested, setServicesRequested] = useState({
    [props.needResponse.title]:
      props.needResponse.questionsFormat.creditRequired,
    "Feature My Card": props.needResponse.questionsValues["isFeatured"]
      ? 10
      : 0,
  });

  const handleIsFeatureChecked = useCallback((isChecked: boolean) => {
    setServicesRequested((prev) => ({
      ...prev,
      "Feature My Card": isChecked ? 10 : 0,
    }));
  }, []);

  return (
    <div className="w-[100%]">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 border-r border-gray-300 sm:col-span-9">
          <NeedServiceSteps
            isEdit={props.isEdit}
            handleIsFeatureChecked={handleIsFeatureChecked}
            populatedValues={props.needResponse.questionsValues}
            needId={props.needResponse._id}
            profile={props.profile}
            questions={props.needResponse.questionsFormat.questions}
          />
        </div>
        <div className="col-span-12 px-4 sm:sticky sm:top-0 sm:col-span-3">
          <NeedTotalCreditsCard
            isEdit={props.isEdit}
            services={servicesRequested}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleCardDetails;
