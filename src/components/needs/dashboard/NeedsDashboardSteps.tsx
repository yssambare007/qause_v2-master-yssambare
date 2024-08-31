import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StepCardProps } from "../../../services/types/needs";

function NeedsDashboardSteps(props: any) {
  const steps = [
    "Select your Need",
    "Add your requirements",
    "Connect to volunteers",
    "Get Started",
  ];
  return (
    <div className="mx-4 mt-12 flex flex-wrap border border-gray-300 bg-[#F5FAFE] md:flex-nowrap">
      {steps
        .map<React.ReactNode>((step, i) => (
          <NeedsStepCard key={step} title={step} stepNo={i + 1} />
        ))
        .reduce((previous, current, i) => [
          previous,
          <StepDivider key={"divider"} />,
          current,
        ])}
    </div>
  );
}

function NeedsStepCard(props: StepCardProps) {
  return (
    <div className="flex basis-1/2 flex-col items-center justify-center p-4 text-center first:border-b first:border-r last:border-l last:border-t sm:border-none md:basis-1/4 md:flex-row md:p-8 md:text-left">
      <div className="mr-4 text-xl font-bold text-[#F79E09] md:text-4xl">
        {props.stepNo}
      </div>
      <div className="text-sm font-bold text-[#1B3763] md:text-lg">
        {props.title}
      </div>
    </div>
  );
}

function StepDivider() {
  return (
    <div className="relative hidden basis-1 md:block">
      <div className="h-[100%] w-px bg-gray-300"></div>
      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border border-gray-300 bg-white">
        <ArrowForwardIosIcon fontSize="small" htmlColor="#BCBCBC" />
      </div>
    </div>
  );
}
export default NeedsDashboardSteps;
