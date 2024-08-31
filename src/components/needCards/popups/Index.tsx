/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Modal } from "@mui/material";
import Close from "@mui/icons-material/Close";
import FundRaising from "./Fundraising/Index";

function NeedsPopup(props: any) {
  const { visible, setVisible, data, percValue } = props;

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    overflow: "hidden",
    bgcolor: "#fff",
    outline: "none",
  };

  return (
    <>
      <Modal
        open={visible}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, width: 950, maxWidth: "90%" }}
          className="shadow-[0_0_6px_0_rgb(0 0 0 / 16%)] relative px-[26px] py-[30px]"
        >
          <div
            onClick={setVisible}
            className="absolute right-0 top-[20px] cursor-pointer rounded-bl-[3px] rounded-tl-[3px] bg-black pl-[1px] text-[1.625em] text-white"
          >
            <Close style={{ display: "flex" }} fontSize="inherit" />
          </div>

          <Grid
            container
            direction={"column"}
            justifyContent="space-between"
            className="px-[1em] py-[0.571em]"
          >
            <FundRaising data={data} percValue={percValue} />
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default NeedsPopup;
