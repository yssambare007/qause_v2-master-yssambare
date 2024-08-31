import { useEffect, useState } from "react";
import TagsInputDropdown from "../signUp/TagsInputDropdown";
import OutsideClickHandler from "react-outside-click-handler";
import SignupNavbar from "../signUp/SignupNavbar";
import Cropper from "../common/imageCropper/Index";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onChangeStep?: (step: number) => void;
  sendStep1Data?: (obj: any) => void;
  step1Info?: any;
  userData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

const Step1 = (props: Props) => {
  useEffect(() => {
    if (props.step1Info) {
      if (props.step1Info.picture) {
        setData({
          picture: props.step1Info.picture,
          croppedFile: props.step1Info.croppedFile,
        });
      }

      if (props.step1Info.categories) {
        setCategoryTag(props.step1Info.categories);
      }

      if (props.step1Info.facility) {
        setFacility(props.step1Info.facility);
      }
    }
  }, []);

  const [data, setData] = useState({
    picture: "",
    croppedFile: "",
  });

  const [category, setCategory] = useState("");
  const [categoryTag, setCategoryTag] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [facility, setFacility] = useState("");
  const [facilityTag, setFacilityTag] = useState([]);
  const [isFacilityDropdownOpen, setIsFacilityDropdownOpen] = useState(false);

  const [isCategoryRequired, setIsCategoryRequired] = useState(false);

  const categories = [
    "Advocacy and Awareness",
    "Agriculture",
    "Animal Rescue",
    "Arts and Culture",
    "Business and Economic Policy",
    "Child Protection",
    "Differntly Abled",
    "Disaster Management",
    "Education",
    "Environment Protection",
    "Family Welfare",
    "Health",
    "Rural Development",
    "Sanitation",
    "Senior Citizen Welfare",
    "Social Injustice",
    "Sports",
    "Technology",
    "Wildlife Conservation",
    "Women",
    "Youth Empowerment",
  ];

  const facilities = ["Fac1", "Fac2", "Fac3"];

  useEffect(() => {
    setIsCategoryRequired(false);
  }, [categoryTag]);

  const changeStep = (step: number) => {
    if (categoryTag.length == 0) {
      setIsCategoryRequired(true);
    } else {
      const step1Data = {
        categories: categoryTag,
        facility: facility,
        picture: data.picture,
        croppedFile: data.croppedFile,
      };

      if (props.sendStep1Data) {
        props.sendStep1Data(step1Data);
        if (props.onChangeStep) {
          props.onChangeStep(step);
        }
      }
    }
  };

  const imageParse = (fileData: any) => {
    setData({
      ...data,
      picture: window.URL.createObjectURL(fileData),
      croppedFile: fileData,
    });
  };

  return (
    <div className="relative">
      <SignupNavbar />
      <div className="mx-[20px] flex flex-col justify-between pt-[30px] sm:px-[20px] lg:mx-[75px] lg:flex-row">
        <div className="flex flex-col sm:flex-row">
          {/* Progress Bar */}
          <div className="mr-[72px] mt-[79px] xs:m-auto xs:mb-[-124px] xs:mt-[-121px] xs:rotate-[-90deg]">
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
            <div className="m-auto h-[45px] w-[5px] bg-[#868686]"></div>
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-[#253dc0]">
              <div className="hidden h-[21px] w-[21px] rounded-full bg-[#253dc0]"></div>
            </div>
          </div>

          <div className="sm:w-full lg:min-w-[440px] xl:max-w-[478px]">
            <h1 className="text-[38px] font-light">
              Welcome,
              <span className="text-2xl font-normal">
                {" "}
                {props.userData?.name}
              </span>
            </h1>

            {/* Category */}
            <div>
              <p className="mb-2.5 mt-[1.5rem] text-[17.6px] font-medium">
                What Category does your NGO belong to?*
              </p>

              <div className="relative mt-[1rem] min-w-full lg:min-w-[440px] xl:min-w-[478px]">
                <OutsideClickHandler
                  onOutsideClick={() => setIsCategoryDropdownOpen(false)}
                >
                  <TagsInputDropdown
                    tags={categoryTag}
                    setTags={setCategoryTag}
                    category={category}
                    setCategory={setCategory}
                    setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
                    isCategoryDropdownOpen={isCategoryDropdownOpen}
                    categories={categories}
                  />
                </OutsideClickHandler>
              </div>

              {isCategoryRequired && (
                <div
                  className="text-[14px] text-red-500"
                  data-testid="isCategoryReq"
                >
                  Category is required
                </div>
              )}
            </div>

            {/* Facilities  */}
            <div className="mt-[1.5rem]">
              <p className="mb-2.5 text-[17.6px] font-medium">Facilities</p>
              <OutsideClickHandler
                onOutsideClick={() => setIsFacilityDropdownOpen(false)}
              >
                <TagsInputDropdown
                  tags={facilityTag}
                  setTags={setFacilityTag}
                  category={facility}
                  setCategory={setFacility}
                  setIsCategoryDropdownOpen={setIsFacilityDropdownOpen}
                  isCategoryDropdownOpen={isFacilityDropdownOpen}
                  categories={facilities}
                />
              </OutsideClickHandler>
            </div>

            {/* NGO LOGO  */}
            <div className="mt-[1.5rem]">
              <p className="mb-2.5 text-base font-medium">NGO Logo</p>

              {data.picture == "" ? (
                <div className="max-w-[250px]">
                  <Cropper
                    onUploadImage={imageParse}
                    acceptType="image/*"
                    height={250}
                    width={250}
                  >
                    <div>
                      <div className="flex h-[250px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-[#7b7979] bg-[#f5f6f7]">
                        <div>
                          <center>
                            <AddIcon sx={{ fontSize: "2rem" }} />
                            <div className="max-w-[90%]">
                              Drag a File here or browse for a file to upload
                            </div>
                          </center>
                        </div>
                      </div>
                    </div>
                  </Cropper>
                </div>
              ) : (
                <div className="relative h-[250px] w-[250px] cursor-pointer overflow-hidden rounded-xl border border-[#7b7979] bg-[#f5f6f7]">
                  <Image
                    fill
                    src={data.picture}
                    style={{
                      objectFit: "cover",
                    }}
                    alt="image"
                  />
                </div>
              )}
            </div>

            <div className="mb-8 mt-12">
              <Image
                className="ml-auto h-[70px] cursor-pointer"
                height="70"
                width="70"
                alt=""
                src="/images/submit-btn.png"
                onClick={() => changeStep(2)}
                data-testid="button"
              />
            </div>

            <span className="text-xl font-normal">
              * Indicated required fields
            </span>
          </div>
        </div>

        <div className="pt-[30px]">
          <Image
            className="h-auto w-auto"
            height="400"
            width="400"
            alt=""
            src="/images/step-1bg.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
