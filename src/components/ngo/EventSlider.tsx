import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import parse from "html-react-parser";

const EventSlider = ({ slides, ngoId, currentIndex, name }: any) => {
  const [currentPhotos, setCurrentPhotos] = useState("primary");
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  const goToPrevious = () => {
    if (currentPhotos !== "primary") {
      setCurrentPhotos("primary");
    }
  };

  const goToNext = () => {
    if (
      currentPhotos === "primary" &&
      slides[currentIndex].image.secondary.length !== 0
    ) {
      setCurrentPhotos("secondary");
      setSecondaryIndex(0);
    } else if (
      secondaryIndex !==
      slides[currentIndex].image.secondary.length - 1
    ) {
      setSecondaryIndex(secondaryIndex + 1);
    }
  };

  const date = new Date(slides[currentIndex].date);
  const formattedDate = date.toLocaleDateString("en-IN");

  return (
    <div className="flex h-full py-[30px] xs:ml-[30px] xs:mr-[15px] xs:flex-col sm:ml-[30px] sm:mr-[15px] sm:flex-col md:ml-[10px] md:mr-[5px] md:flex-row lg:ml-[30px] lg:mr-[15px]">
      <div className="xs:mx-[2px] sm:mx-[15px]">
        <div
          className="relative mx-auto h-[386px] rounded-sm bg-cover bg-center md:w-[310px] lg:w-[507px]"
          style={{
            backgroundImage: `url('https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${ngoId}/${name}/${
              currentPhotos === "primary"
                ? slides[currentIndex].image.primary
                : slides[currentIndex].image.secondary[secondaryIndex]
            }')`,
          }}
        >
          <ArrowBackIcon
            className={`absolute left-2 top-[50%] translate-y-[-50%] rounded-full bg-[#fff] ${
              currentPhotos === "primary"
                ? "opacity-50"
                : "cursor-pointer opacity-100"
            }`}
            onClick={goToPrevious}
          />
          <ArrowForwardIcon
            className={`absolute right-2 top-[50%] translate-y-[-50%] rounded-full bg-[#fff] ${
              slides[currentIndex].image.secondary.length === 0 ||
              (currentPhotos === "secondary" &&
                secondaryIndex ===
                  slides[currentIndex].image.secondary.length - 1)
                ? "opacity-50"
                : "cursor-pointer opacity-100"
            }`}
            onClick={goToNext}
          />
        </div>

        <div className="mt-3 flex">
          <div
            style={{
              backgroundImage: `url('https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${ngoId}/${name}/${slides[currentIndex].image.primary}')`,
            }}
            className="mr-3 cursor-pointer bg-cover xs:h-[100px] xs:w-[32%] sm:h-[100px] sm:w-[32%] md:h-[123px] md:w-[95px] lg:w-[162px]"
            onClick={() => setCurrentPhotos("primary")}
          ></div>

          {slides[currentIndex].image.secondary.map(
            (image: string, index: number) => (
              <div
                style={{
                  backgroundImage: `url('https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${ngoId}/${name}/${image}')`,
                }}
                className="mr-3 cursor-pointer bg-cover last:mr-0 xs:h-[100px] xs:w-[32%] sm:h-[100px] sm:w-[32%] md:h-[123px] md:w-[95px] lg:w-[162px]"
                onClick={() => {
                  setCurrentPhotos("secondary");
                  setSecondaryIndex(index);
                }}
                key={index}
              ></div>
            )
          )}
        </div>
      </div>

      <div className="w-full xs:mt-[50px] sm:mt-[50px] md:mx-[30px] md:mt-0">
        <p className="mb-[15px] font-[muli] font-bold text-[#253DC0] xs:text-[21.16px] sm:text-[21.16px] md:text-[24px] lg:text-[28.16px]">
          {slides[currentIndex].title}
        </p>
        <div className="my-auto mr-[10px] mt-[20x] h-[1px] w-full bg-[#E1E1E1]"></div>

        <div className="my-[30px] flex flex-wrap">
          {slides[currentIndex].tag.map((tag: string, index: number) => (
            <div className="flex items-center pr-[14px]" key={index}>
              <StarIcon className="mr-[10px] text-lg text-[#ffe213]" />
              <p className="font-semibold text-[#253DC0] xs:text-[11.52px] sm:text-[11.52px] md:text-[12.8px] lg:text-[14.08px]">
                {tag}
              </p>
            </div>
          ))}
        </div>

        {formattedDate !== "Invalid Date" && (
          <div className="mb-[10px] flex">
            <p className="mr-2 font-[muli] font-extrabold xs:text-[11.52px] sm:text-[11.52px] md:text-[12.8px] lg:text-[14.08px]">
              Event Date:{" "}
            </p>
            <p className="font-[muli] xs:text-[12.96px] sm:text-[12.96px] md:text-[12.8px] lg:text-[15.84px]">
              {formattedDate}
            </p>
          </div>
        )}

        <div className="mb-[10px] flex">
          <p className="mr-2 font-[muli] font-extrabold xs:text-[11.52px] sm:text-[11.52px] md:text-[14.4px] lg:text-[14.08px]">
            Venue:{" "}
          </p>
          <p className="font-[muli] xs:text-[12.96px] sm:text-[12.96px] md:text-[14.4px] lg:text-[15.84px]">
            {slides[currentIndex].place}
          </p>
        </div>

        <p className="overflow-y-scroll leading-7 text-[#292929] xs:max-h-[200px] xs:text-[11.52px] sm:max-h-[250px] sm:text-[11.52px] md:max-h-[290px] md:text-[12.8px] lg:text-[14.08px]">
          {parse(slides[currentIndex].desc)}
        </p>
      </div>
    </div>
  );
};

export default EventSlider;
