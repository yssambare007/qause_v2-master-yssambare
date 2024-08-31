/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Grid, Modal } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

function ThankYouModal(props: any) {
  const { visible } = props;

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    overflow: "hidden",
    bgcolor: "rgb(250, 251, 253)",
  };

  const redirectToProfile = () => {
    Router.push("/ngobackend/profile");
  };
  return (
    <>
      <Modal
        hideBackdrop
        open={visible}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, width: 600, maxWidth: "80%" }}
          className="relative"
        >
          <Grid
            container
            direction={"column"}
            justifyContent="column"
            alignItems={"center"}
            className="px-2 py-[1.8em] lg:px-14 xl:px-14"
          >
            <Grid className="mt-3 text-4xl font-light">
              <span>Thank you!</span>
            </Grid>

            <Grid className="relative -left-6 mt-4 p-2">
              <Image
                alt=""
                width={135}
                height={0}
                src={"/images/email-logo.png"}
                className="object-contain"
              />
            </Grid>

            <Grid className="mt-3.5 px-8 py-0 text-center sm:px-14">
              <p className="line-height-2 text-base text-[#333333] sm:text-[1.2rem]">
                Your profile has been sent to the Quase Team for review
              </p>
            </Grid>

            <Grid className="mt-5 px-8 py-0 text-center sm:px-16 ">
              <p className="mb-2 text-sm text-[#333333] sm:text-[1.1rem]">
                While you're waiting for the approval, let's work on making your
                profile to create a better impact.
              </p>
            </Grid>

            <Grid className="mt-2">
              <Button
                onClick={redirectToProfile}
                variant="contained"
                className="rounded-none bg-[#253dc1] px-[2em] py-[0.6rem] text-base normal-case tracking-normal text-white hover:bg-[#1d2f96] sm:text-[1.5rem]"
              >
                Enhance your Profile
              </Button>
            </Grid>

            <Grid className="mt-4 p-0 text-center">
              <p className="italic text-[#253dc1]">
                By adding stories, events and some pictures!
              </p>
            </Grid>

            <Grid className="mt-[2.2em]">
              <Link
                className="flex items-center justify-between gap-x-[2px] text-[0.85em]"
                href="/"
              >
                <NavigateBeforeIcon className="text-[1.5em] leading-[unset]" />
                <span>Back to Home</span>
              </Link>
            </Grid>
          </Grid>

          <Grid
            container
            direction={"row"}
            justifyContent={{ xl: "space-between", xs: "center" }}
            alignItems={"center"}
            columnGap={{ xs: 2 }}
            className="h-16 bg-[#e8e8e8] px-12 py-0 font-semibold text-[#253dc1] xs:px-2"
          >
            <Grid
              item
              className="flex items-center gap-x-2.5 xs:gap-x-1 xs:text-[0.8rem]"
            >
              <PhoneIcon />
              +91 9119333999
            </Grid>
            <Grid
              item
              className="flex items-center gap-x-2.5 xs:gap-x-1 xs:text-[0.8rem]"
            >
              <MailIcon />
              support@quase.com
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default ThankYouModal;
