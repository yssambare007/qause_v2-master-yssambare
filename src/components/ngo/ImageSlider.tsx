import { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ImageSlider = ({ slides }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex !== slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative h-full">
      <div
        className={`absolute top-[50%] translate-y-[-50%] xs:left-1 sm:left-5 lg:left-[-15px] xl:left-0 ${
          currentIndex !== 0 ? "cursor-pointer opacity-100" : "opacity-50"
        }`}
        onClick={goToPrevious}
      >
        <NavigateBeforeIcon className="text-[80px] text-[#f7a212]" />
      </div>

      <div
        className="mx-auto h-full rounded-sm bg-cover bg-center xs:w-[90%] sm:w-[70%] lg:w-[86%] xl:w-[67%]"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      ></div>

      <div
        className={`absolute top-[50%] translate-y-[-50%] xs:right-1 sm:right-5 lg:right-[-15px] xl:right-0 ${
          currentIndex !== slides.length - 1
            ? "cursor-pointer opacity-100"
            : "opacity-50"
        }`}
        onClick={goToNext}
      >
        <NavigateNextIcon className="text-[80px] text-[#f7a212]" />
      </div>
    </div>
  );
};

export default ImageSlider;
