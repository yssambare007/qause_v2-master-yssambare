import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DoneIcon from "@mui/icons-material/Done";
import SignupNavbar from "../signUp/SignupNavbar";
import AddIcon from "@mui/icons-material/Add";
import Cropper from "../common/imageCropper/Index";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <>Loading ...</>,
});
const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"]],
  },
};
interface Props {
  onChangeStep?: (step: number) => void;
  sendStep3Data?: (obj: any) => void;
  step3Info?: any;
}
const Step3 = (props: Props) => {
  const [data, setData] = useState({
    name: "",
    picture: "",
    journey: "",
    croppedFile: "",
  });
  useEffect(() => {
    if (props.step3Info) {
      console.log(props.step3Info);

      setData({
        ...data,
        name: props.step3Info.name,
        picture: props.step3Info.picture,
        journey: props.step3Info.journey,
        croppedFile: props.step3Info.croppedFile,
      });
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
  };

  const reg = /^[a-zA-Z\s]*$/;

  const changeHandler = (e: any) => {
    if (!document.getElementById("name_error")?.classList.contains("hidden")) {
      document.getElementById("name_error")?.classList.add("hidden");
    }

    if (e.target.value === "" || reg.test(e.target.value)) {
      setData({
        ...data,
        [e.target.id]: e.target.value,
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
  };
  const moveToStep4 = () => {
    if (
      data.name.trim() == "" &&
      document.getElementById("name_error")?.classList.contains("hidden")
    ) {
      document.getElementById("name_error")!.innerHTML =
        "Founder Name is required";
      document.getElementById("name_error")?.classList.remove("hidden");
      document.getElementById("name")?.focus();
      return false;
    }
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
    if (
      data.name !== "" &&
      data.name.length > 70 &&
      document.getElementById("name_error")?.classList.contains("hidden")
    ) {
      document.getElementById("name_error")!.innerHTML =
        "Enter a valid Founder name";
      document.getElementById("name_error")?.classList.remove("hidden");
      document.getElementById("name")?.focus();
      return false;
    }
    const numWords = data.journey.split(" ").length;
    if (
      (numWords >= 500 || numWords < 10) &&
      document.getElementById("journey_error")?.classList.contains("hidden")
    ) {
      document.getElementById("journey_error")!.innerHTML =
        "Enter journey atleast 10 words to 500 words";
      document.getElementById("journey_error")?.classList.remove("hidden");
      document.getElementById("name")?.focus();
      return false;
    }

    return true;
  };

  const changeStep = (step: number) => {
    if ((step == 4 && moveToStep4()) || step == 2) {
      if (props.onChangeStep) {
        props.onChangeStep(step);
      }
      if (props.sendStep3Data) {
        props.sendStep3Data(data);
      }
    }
  };

  return (
    <div className="relative">
      <SignupNavbar />
      <div className="mx-[20px] flex flex-col justify-between pt-[30px] sm:px-[10px] lg:mx-[75px] lg:flex-row">
        <div className="flex flex-col sm:flex-row lg:mr-[60px]">
          {/* Progress Bar */}
          <div className="mr-[80px] mt-[120px] xs:m-auto xs:mb-[-124px] xs:mt-[-121px] xs:rotate-[-90deg]">
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
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
          </div>

          <div className="sm:w-[75%]">
            {/* Public Email ID */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Founder Name*
              </p>

              <div className="relative flex h-[30px] items-center border-b border-l border-r border-t border-gray-400 px-[13px] py-[25px] lg:min-w-[440px] xl:min-w-[478px]">
                <input
                  className="w-full outline-none"
                  placeholder="Enter Founder Name"
                  value={data.name}
                  onChange={changeHandler}
                  id="name"
                  maxLength={70}
                  type="text"
                />
              </div>
              <div id="name_error" className="hidden text-[14px] text-red-500">
                Name is required
              </div>
            </div>

            {/* Public Phone no. */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Founder Picture
              </p>
              {data.picture == "" ? (
                <div className="max-w-[250px]">
                  <Cropper
                    onUploadImage={imageParse}
                    acceptType="image/*"
                    height={250}
                    width={250}
                  >
                    <div>
                      <div className="flex h-[250px] w-[250px] cursor-pointer items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7]">
                        <AddIcon sx={{ fontSize: "2rem" }} />
                      </div>
                    </div>
                  </Cropper>
                </div>
              ) : (
                <img
                  src={data.picture}
                  className="h-[250px] w-[250px] cursor-pointer rounded-xl border border-[#7b7979] bg-[#f5f6f7] object-cover"
                />
              )}

              <div
                id="picture_error"
                className="hidden text-[14px] text-red-500"
              >
                Name is required
              </div>
            </div>
            {/* //journey */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                Journey of the Founder*
              </p>
              <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Write Founder journey here..."
                className="max-w-[100%]font-[muli] w-full sm:w-[400px] xl:min-w-[478px]"
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
            <div className="mb-8 mt-12 flex justify-between">
              <img
                className="rotate-180 cursor-pointer"
                src="/images/submit-btn.png"
                onClick={() => changeStep(2)}
              />

              <img
                className="cursor-pointer"
                src="/images/submit-btn.png"
                onClick={() => changeStep(4)}
              />
            </div>

            <span className="text-xl font-normal">
              * Indicated required fields
            </span>
          </div>
        </div>

        <div className="relative top-8 h-[600px] w-full text-right">
          <Image fill alt="Step 3" src="/images/step-3.png" />
        </div>
      </div>
    </div>
  );
};

export default Step3;
