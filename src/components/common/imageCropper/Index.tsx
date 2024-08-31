import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Slider } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

interface Props {
  id?: string;
  onUploadImage?: (fileData: any, file: any) => void;
  style?: string;
  fileData?: any;
  children?: any;
  height?: number;
  width?: number;
  disabled?: boolean;
  acceptType?: string;
  openCropper?: boolean;
}

function Index(props: Props) {
  const [open, setOpen] = useState(props?.openCropper ?? false);
  const handleOpen = () => setOpen(true);
  const [file, setFile] = useState<any>();
  const handleClose = () => setOpen(false);

  const editorRef = useRef<AvatarEditor>(null);
  const [picture, setpicture] = useState({
    cropperOpen: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
    zoom: 1,
    croppedImg: "",
  });
  const changeHandler = (e: any) => {
    if (e.target.value.length > 0) {
      setpicture({
        ...picture,
        img: window.URL.createObjectURL(e.target.files[0]),
      });
      setFile(e.target.files[0]);
      console.log("cropper : ", props.id);
      if (e.target.files[0].type === "video/mp4") {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          const blob = dataURLtoBlob(reader.result as string);
          const fileData = new File([blob], e.target.files[0]?.name, {
            type: "video/mp4",
          });
          setpicture({
            ...picture,
            zoom: 1,
            croppedImg: e.target.files[0],
          });
          // handleClose();
          if (props.onUploadImage) {
            props.onUploadImage(e.target.files[0], fileData);
          }
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
        return;
      }
      handleOpen();
    }
  };
  const handleSlider = (e: any) => {
    setpicture({
      ...picture,
      zoom: e.target.value,
    });
  };
  function dataURLtoBlob(dataURL: any) {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  const handleSave = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      const blob = dataURLtoBlob(croppedImg);
      const fileData = new File([blob], file?.name, { type: "image/jpeg" });
      setpicture({
        ...picture,
        zoom: 1,
        croppedImg: croppedImg,
      });
      handleClose();
      if (props.onUploadImage) {
        props.onUploadImage(file, fileData);
      }
    }
  };
  return (
    <div className={props.style}>
      <>
        <input
          type="file"
          accept={`${props.acceptType ? props.acceptType : "*"}`}
          disabled={props.disabled}
          onChange={changeHandler}
          className="hidden"
          id={props.id || "inputBox"}
        />
        {props.children ? (
          <label htmlFor={props.id || "inputBox"}>{props.children}</label>
        ) : (
          <label htmlFor={props.id || "inputBox"}>
            <div className="flex h-[193px] w-full items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] xs:h-[278px] xs:w-full">
              <div className="mr-auto flex items-center pl-[1px] xs:mx-auto">
                <div className="flex cursor-pointer flex-col items-center justify-center">
                  <AddIcon />
                  <p className="px-4 text-center text-base text-[#484848]">
                    Drag a File here or browse for a file to upload
                  </p>
                </div>
              </div>
            </div>
          </label>
        )}
      </>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="focus-visible:outline-none ">
          <AvatarEditor
            ref={editorRef}
            image={picture.img}
            width={props.width || 1920}
            height={props.height || 1080}
            border={20}
            borderRadius={10}
            color={[0, 0, 0, 0.7]} // RGBA
            scale={picture.zoom}
            style={{
              width: "100%",
              height: "100%",
              margin: "0px auto",
            }}
          />
          <Slider
            aria-label="raceSlider"
            value={picture.zoom}
            min={1}
            max={5}
            step={0.1}
            onChange={handleSlider}
            sx={{ color: "#253dc0" }}
          ></Slider>
          <div className="my-4 flex items-center justify-center">
            <button
              className="mr-4 rounded-full bg-gray-400 px-[1.5rem] py-[0.5rem] text-[18px] font-bold"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              disabled={file?.size > 2000000}
              className="rounded-full bg-[#253dc0] px-[1.5rem] py-[0.5rem] text-[18px] font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          {file?.size > 2000000 && (
            <p className="bg-red-700 text-center text-white">
              File size is greater than 2MB
            </p>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Index;
