import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

interface Props {
  open: boolean;
  handleClose?: () => void;
  title?: string;
  description?: string;
  handleYes?: () => void;
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
const ResponseModal = (props: Props) => {
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
        <div className="flex justify-center">{props.title}</div>
      </Box>
    </Modal>
  );
};

export default ResponseModal;
