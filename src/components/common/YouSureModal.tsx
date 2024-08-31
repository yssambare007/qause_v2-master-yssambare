import React from "react";
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleYes: () => void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "100%",
  bgcolor: "#ffffff",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
const YouSureModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="relative focus-visible:outline-none">
        <CloseIcon
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer",
          }}
          onClick={props.handleClose}
        />
        <div className="flex justify-center">
          <HighlightOffIcon
            sx={{ fontSize: "5rem", color: "red", mb: "1rem" }}
          />
        </div>
        <div className="mb-1 text-center text-[1.8rem]">Are you sure?</div>
        <div className="mb-2 text-center text-[1.2rem]">Confirm to proceed</div>
        <div className="flex justify-center">
          <button
            className="mr-4 bg-[#169316] px-[4rem] py-2 text-[14px] text-white"
            onClick={props.handleYes}
          >
            Yes
          </button>
          <button
            className="bg-[#f5f5f5] px-[4rem] py-2 text-[14px]"
            onClick={props.handleClose}
          >
            No
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default YouSureModal;
