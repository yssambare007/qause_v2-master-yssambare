import { Close } from "@mui/icons-material";
import { Dialog, IconButton, Zoom } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import { askForSupport, letQauseDoIt } from "../../utils/apis/needs/Index";

const QauseDoIt = (props: {
  gigId: string;
  open: boolean;
  askSupport: boolean;
  onSuccess: () => void;
  handleClose: () => void;
}) => {
  const { mutate: qauseDoIt } = useMutation(
    props.askSupport ? askForSupport : letQauseDoIt,
    {
      onError: (error) => {
        console.log(error);
        props.handleClose();
      },
      onSuccess: () => {
        props.onSuccess();
      },
    }
  );

  const handleQauseDoit = () => {
    qauseDoIt(props.gigId);
  };

  return (
    <Dialog
      open={props.open}
      PaperProps={{
        className: "!rounded-md !bg-qause-gray !max-w-6xl p-0",
      }}
      TransitionComponent={Zoom}
      keepMounted
      onClose={props.handleClose}
    >
      <div className="flex h-full flex-col items-center">
        <div className="flex w-full justify-end">
          <IconButton
            onClick={props.handleClose}
            className="!rounded-md !bg-black"
          >
            <Close fontSize="small" htmlColor="#FFFFFF" />
          </IconButton>
        </div>
        <div className="mx-4 mb-4 rounded-sm bg-white p-4">
          <div className="flex flex-col items-center justify-center pt-4 sm:flex-row">
            <img
              alt="needFeedback aside"
              src="/images/letqause-doit-img.svg"
              className="relative w-[100%] object-contain object-center sm:w-[50%]"
            />

            <div className="mx-8 w-full sm:w-[50%]">
              <h1 className="text-2xl font-bold text-qause-blue">
                Don’t want to wait anymore for the volunteers to apply?
              </h1>
              <div className="mt-10 text-lg text-qause-blue-dark">
                No worries! We are there with you every step of the way!
                <br />
                <br />
                From managing the volunteers to delivering the final product to
                you,
                <br />
                <br /> We will handle it all for you!
              </div>
              <div className="mt-12 text-lg font-bold text-qause-blue">
                You Expect. We Deliver.
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2 text-xs sm:mt-12  sm:pt-12 sm:text-sm">
            <button
              onClick={props.handleClose}
              className="w-28 rounded bg-transparent  px-4  py-2"
            >
              Back
            </button>

            <button
              onClick={handleQauseDoit}
              className="rounded bg-[#0020D1] px-6 py-3 font-bold text-white"
            >
              Yes, I want Qause to handle it.
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default QauseDoIt;
