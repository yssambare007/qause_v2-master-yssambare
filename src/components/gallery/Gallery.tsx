import ImageCropper from "../../components/common/imageCropper/Index";
import { base_url } from "../../utils/utils";
import { Grid } from "@mui/material";
import GalleryImage from "./GalleryImage";
type Props = {
  images: any;
  onImageChange?: () => void;
};

const Gallery = (props: Props) => {
  async function getUploadedImage(file: any, fileData: any) {
    const formData = new FormData();
    formData.append("file", fileData);
    console.log(file);
    formData.append("title", file.name.split(".")[0]);
    await fetch(`${base_url}ngo/gallery`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
    });
    if (props.onImageChange) {
      props.onImageChange();
    }
  }
  function deleteSingleImage() {
    if (props.onImageChange) {
      props.onImageChange();
    }
  }
  return (
    <div>
      <h1 className="mb-4 mt-[2.5rem] text-center text-[2.7rem] font-semibold text-[#253dc0]">
        Upload Files in Gallery
      </h1>
      <h2 className="mb-[2.5rem] text-center  text-[1.7rem] font-medium">
        You can upload maximum 6 files.
      </h2>
      {props.images.data.length < 6 && (
        <div className="mx-auto w-[400px]">
          <ImageCropper acceptType="image/*" onUploadImage={getUploadedImage} />
        </div>
      )}

      <div className="mt-8 px-6">
        <Grid container spacing={4}>
          {props.images.data.map((item: any) => {
            return (
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={item.id}>
                <GalleryImage image={item} onDeleleImage={deleteSingleImage} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Gallery;
