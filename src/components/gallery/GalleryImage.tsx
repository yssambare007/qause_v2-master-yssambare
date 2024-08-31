import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { base_url } from "../../utils/utils";
import DoneIcon from "@mui/icons-material/Done";
import { TOKEN } from "../../constants/constants";
import Image from "next/image";
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
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100%",
  bgcolor: "#00000091",
  boxShadow: 24,
  borderRadius: "10px",
  width: "100%",
  height: "100%",
};
type Props = {
  image: any;
  onDeleleImage?: () => void;
};
function GalleryImage(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteImage = async () => {
    setIsLoading(true);
    const deleteImage = await fetch(
      `${base_url}ngo/gallery/${props.image.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("TOKEN")}`,
        },
      }
    );
    const deleteResult = await deleteImage.json();
    console.log(deleteResult);
    if (deleteResult.success === true) {
      handleClose();
      if (props.onDeleleImage) {
        props.onDeleleImage();
      }
    }
    setIsLoading(false);
  };
  const changeTitle = async () => {
    if (value !== "" && value.length < 20) {
      const body = {
        title: value,
      };
      const editImage = await fetch(
        `${base_url}ngo/gallery/${props.image.id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: "" + localStorage.getItem(TOKEN),
          },
        }
      );
      const editResult = await editImage.json();
      if (editResult.success === true) {
        setEdit(false);
        if (props.onDeleleImage) {
          props.onDeleleImage();
        }
      }
    }
  };
  return (
    <>
      <div className="w-full rounded-md">
        {props.image.gallery.hasOwnProperty("video") ? (
          <video
            className="h-[300px]"
            controls
            src={props.image.gallery.video}
          />
        ) : (
          <Image
            width={300}
            height={300}
            src={props.image.gallery.thumbnail}
            className="h-[300px] w-full rounded-t-md  border border-gray-200 object-cover"
            alt="image"
          />
        )}
        <div className="bg-[#f2f2f2] px-4 py-2">
          <div className="flex justify-between">
            <div>
              {!edit && (
                <div className="max-w-[250px] truncate font-medium">
                  {props.image.gallery.title}
                </div>
              )}

              <div className="font-semibold">
                Status:{" "}
                <span className="font-medium">{props.image.resolution}</span>
              </div>
            </div>
            {!edit && (
              <div className="flex flex-wrap items-center">
                <EditIcon
                  sx={{ fontSize: "1.2rem", mr: "0.3rem" }}
                  className="cursor-pointer"
                  onClick={() => setEdit(true)}
                />
                <DeleteIcon
                  sx={{ fontSize: "1.2rem", color: "red", mr: "0.3rem" }}
                  className="cursor-pointer"
                  onClick={handleOpen}
                />
                <ZoomOutMapIcon
                  sx={{ fontSize: "1.2rem" }}
                  className="cursor-pointer"
                  onClick={() => setView(true)}
                />
              </div>
            )}
          </div>
          {edit && (
            <div className="mt-3 flex items-center">
              <DoneIcon
                sx={{
                  bgcolor: "lightgreen",
                  py: "5px",
                  fontSize: "1.8rem",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={changeTitle}
              />
              <input
                type="text"
                className="h-[30px] w-full bg-[#ffffff] px-2 py-[10px] focus:outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id={`input_${props.image.id}`}
              />
              <CloseIcon
                sx={{
                  bgcolor: "red",
                  py: "5px",
                  fontSize: "1.8rem",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setEdit(false)}
              />
            </div>
          )}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
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
              onClick={handleClose}
            />
            <div className="flex justify-center">
              <HighlightOffIcon
                sx={{ fontSize: "5rem", color: "red", mb: "1rem" }}
              />
            </div>
            <div className="mb-1 text-center text-[1.8rem]">Are you sure?</div>
            <div className="mb-2 text-center text-[1.2rem]">
              Confirm to proceed
            </div>
            <div className="flex justify-center">
              <button
                className="mr-4 bg-[#169316] px-[4rem] py-2 text-[14px] text-white"
                onClick={deleteImage}
              >
                Yes
              </button>
              <button
                className="bg-[#f5f5f5] px-[4rem] py-2 text-[14px]"
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={view}
          onClose={() => setView(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style1}
            className="relative flex justify-center focus-visible:outline-none"
          >
            <CloseIcon
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => setView(false)}
            />
            <img src={props.image.gallery.thumbnail} className="h-full" />
          </Box>
        </Modal>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default GalleryImage;
