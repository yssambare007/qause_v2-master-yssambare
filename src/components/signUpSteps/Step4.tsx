import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DoneIcon from "@mui/icons-material/Done";
import SignupNavbar from "../signUp/SignupNavbar";
import Cropper from "../common/imageCropper/Index";
import AddIcon from "@mui/icons-material/Add";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};
interface Props {
  onChangeStep?: (step: number) => void;
  sendStep4Data?: (obj: any) => void;
  step4Info?: any;
}
const Step4 = (props: Props) => {
  const [data, setData] = useState({
    picture: "",
    croppedFile: "",
    journey: "",
  });
  useEffect(() => {
    if (props.step4Info && props.step4Info.picture) {
      setData(props.step4Info);
    }
  }, []);
  const imageParse = (file: any, fileData: any) => {
    if (
      !document.getElementById("picture_error")?.classList.contains("hidden")
    ) {
      document.getElementById("picture_error")?.classList.add("hidden");
    }
    setData({
      ...data,
      picture: window.URL.createObjectURL(fileData),
      croppedFile: fileData,
    });
    if (props.sendStep4Data) {
      props.sendStep4Data({
        ...data,
        picture: window.URL.createObjectURL(fileData),
        croppedFile: fileData,
      });
    }
  };
  const changeHandler1 = (value: any) => {
    if (
      !document.getElementById("journey_error")?.classList.contains("hidden")
    ) {
      document.getElementById("journey_error")?.classList.add("hidden");
    }
    setData({
      ...data,
      journey: value,
    });
    if (props.sendStep4Data) {
      props.sendStep4Data({
        ...data,
        journey: value,
      });
    }
  };
  const changeStep = (step: number) => {
    if (step == 5) {
      if (
        data.journey.trim() == "" &&
        document.getElementById("journey_error")?.classList.contains("hidden")
      ) {
        document.getElementById("journey_error")!.innerHTML =
          "Journey is required";
        document.getElementById("journey_error")?.classList.remove("hidden");
        document.getElementById("name")?.focus();
        return false;
      }
      const numWords = data.journey.split(" ").length;
      if (
        numWords >= 500 ||
        (numWords < 10 &&
          document
            .getElementById("journey_error")
            ?.classList.contains("hidden"))
      ) {
        document.getElementById("journey_error")!.innerHTML =
          "Enter journey atleast 10 words to 500 words";
        document.getElementById("journey_error")?.classList.remove("hidden");
        document.getElementById("name")?.focus();
        return false;
      }
      if (props.sendStep4Data) {
        props.sendStep4Data(data);
      }
    }
    if (props.onChangeStep) {
      props.onChangeStep(step);
    }
  };
  return (
    <div className="relative">
      <SignupNavbar />
      <div className="mx-[20px] flex flex-col justify-between pt-[30px] sm:px-[10px] lg:mx-[75px] lg:flex-row">
        <div className="flex flex-col sm:flex-row lg:mr-[60px]">
          {/* Progress Bar */}
          <div className="mr-[72px] mt-[79px] xs:m-auto xs:mb-[-124px] xs:mt-[-121px] xs:rotate-[-90deg]">
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#1c6102]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
              <DoneIcon sx={{ color: "#1c6102" }} className="xs:rotate-90" />
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#1c6102]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
              <DoneIcon sx={{ color: "#1c6102" }} className="xs:rotate-90" />
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#1c6102]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
              <DoneIcon sx={{ color: "#1c6102" }} className="xs:rotate-90" />
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
          </div>

          <div className="sm:w-[75%]">
            <h2 className="pb-[1] text-[27px] font-normal lg:max-w-[440px] xl:max-w-[478px]">
              Add the Finishing touches{" "}
            </h2>

            {/* //journey */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Your NGO Story*
              </p>
              <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Write Ngo Story here..."
                className="w-[400px] max-w-[100%] font-[muli] lg:min-w-[440px] xl:min-w-[478px]"
                onChange={changeHandler1}
                value={data.journey}
              />
              <div
                id="journey_error"
                className="hidden text-[14px] text-red-500"
              >
                Name is required
              </div>
            </div>

            {/* Public Phone no. */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Select a Cover Photo
              </p>

              {data.picture == "" ? (
                <Cropper
                  onUploadImage={imageParse}
                  acceptType="image/*"
                  height={250}
                  width={400}
                >
                  <div className="flex h-[250px] cursor-pointer items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7] lg:min-w-[440px] xl:min-w-[478px]">
                    <div className="text-center">
                      <AddIcon
                        sx={{
                          fontSize: "2rem",
                          textAlign: "center",
                          mb: "5px",
                        }}
                      />
                      <div
                        className="
text-[#484848]"
                      >
                        Drag a file here or browse for a file to upload
                      </div>
                    </div>
                  </div>
                </Cropper>
              ) : (
                <img
                  src={data.picture}
                  className="h-[250px] cursor-pointer rounded-md border border-[#7b7979] bg-[#f5f6f7] object-cover lg:min-w-[440px] xl:min-w-[478px]"
                />
              )}
              <div
                id="picture_error"
                className="hidden text-[14px] text-red-500"
              >
                Name is required
              </div>
            </div>

            <div className="mb-8 mt-12 flex justify-between">
              <img
                className="rotate-180 cursor-pointer"
                src="/images/submit-btn.png"
                onClick={() => changeStep(3)}
              />

              <button
                className="bg-[#253dc0] px-[1rem] text-[1.3rem] text-white lg:mx-[-2rem] lg:px-[2rem] xl:mx-[-2rem] xl:px-[2rem]"
                onClick={() => changeStep(5)}
              >
                Submit for Approval
              </button>
            </div>

            <span className="text-xl font-normal">
              * Indicated required fields
            </span>
          </div>
        </div>

        <div className="pt-[30px] text-right">
          <img className="h-auto w-auto" src="/images/step-4.png" />
        </div>
      </div>
    </div>
  );
};

export default Step4;
