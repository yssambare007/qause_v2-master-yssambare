/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Modal } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Router from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";

function ThankYouModalV2(props: any) {
  const { visible, content, event, create } = props;

  const [loadingRedirectBtn, setLoadingRedirectBtn] = useState(false);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "3px",
    overflow: "hidden",
    bgcolor: "rgb(250, 251, 253)",
  };

  const redirectCreateStory = () => {
    setLoadingRedirectBtn(!loadingRedirectBtn);

    Router.push({
      pathname: `/ngobackend/${event ? "event" : "story"}/${
        create ? "desk" : "create"
      }`,
    });
  };
  return (
    <>
      <Modal
        open={visible}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, width: 520, maxWidth: "90%" }}
          className="relative shadow-lg shadow-black"
        >
          <Grid
            container
            direction={"column"}
            justifyContent="column"
            alignItems={"center"}
            className="px-2 py-[0.75em] pt-[1em] lg:px-3 xl:px-3"
          >
            <Grid className="font-lighter  text-5xl">
              <span>Thank you!</span>
            </Grid>

            <Grid className="relative my-10 mb-8">
              <Image
                alt=""
                width={100}
                height={0}
                src={"/images/check-pop-icon.png"}
                className="object-contain"
              />
            </Grid>

            <Grid className="mb-2 px-14 py-0 text-center">
              <p
                className="text-[1.2rem] font-semibold text-[#333333]"
                style={{ overflowWrap: "anywhere" }}
              >
                {content}
              </p>
            </Grid>

            <Grid className="px-16 py-0 text-center ">
              <p className="text-[1rem] font-normal text-[#333333]">
                {event ? "Event" : "Story"} {create ? "Created" : "Updated"}{" "}
                Successfully
              </p>
            </Grid>

            <Grid className="my-6">
              <LoadingButton
                sx={{
                  py: "0.8rem",
                  px: "3.75em",
                  fontSize: "1.4rem",
                  textTransform: "none",
                  letterSpacing: "normal",
                  backgroundColor: "#253dc0",
                  borderRadius: "0",
                  fontFamily: "muli",
                }}
                loading={loadingRedirectBtn}
                loadingPosition="end"
                onClick={redirectCreateStory}
                variant="contained"
                className="justify-center gap-1 bg-[#253dc0] text-white hover:bg-[#1d2f96]"
              >
                Add Next <AddCircleIcon fontSize="inherit" />
              </LoadingButton>
            </Grid>
            <Grid
              container
              direction={"row"}
              justifyContent="space-between"
              alignItems={"center"}
              className="h-14 border-t-[3px] border-yellow-500 bg-[#d5d5d5] px-6 text-lg text-[#253dc1] xs:h-16"
            >
              <Grid item>
                <PhoneIcon className="mr-1" />
                +91 9119333999
              </Grid>
              <Grid item>
                <MailIcon className="mr-1" />
                support@quase.com
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default ThankYouModalV2;
