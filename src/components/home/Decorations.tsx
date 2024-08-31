import VectorGrass1 from "./assets/VectorGrass1.svg";
import VectorGrass2 from "./assets/VectorGrass2.svg";
import UnionStar from "./assets/UnionStar.svg";
import ZigZagSVG from "./assets/dec_zigzag_line_1.svg";
import ZigZagSVG2 from "./assets/dec_zigzag_line_2.svg";
import TitleBlink from "./assets/title_blink.svg";
import LeftBackGround from "./assets/left_background_image.svg";

export function Grass(props: any) {
  return (
    <div className={`absolute flex items-end text-black ${props.className}`}>
      <VectorGrass1 className="h-[60%] w-[40%]" />
      <VectorGrass2 className="h-[40%] w-[40%]" />
    </div>
  );
}

export function Star(props: any) {
  return (
    <div
      className={`absolute flex items-center justify-center ${props.className}`}
    >
      <UnionStar {...props.iconProps} />
    </div>
  );
}

export function ZigZag(props: any) {
  return (
    <div
      className={`absolute flex items-center justify-center ${props.className}`}
    >
      <ZigZagSVG />
    </div>
  );
}

export function ZigZag2(props: any) {
  return (
    <div
      className={`absolute  flex items-center justify-center ${props.className}`}
    >
      <ZigZagSVG2 />
    </div>
  );
}

export function IntroCardTitleBlink(props: any) {
  return (
    <div
      className={`absolute flex items-center justify-center ${props.className}`}
    >
      <TitleBlink />
    </div>
  );
}

export function BannerLeftImageBackground(props: any) {
  return (
    <div className={`flex items-center justify-center ${props.className}`}>
      <LeftBackGround />
    </div>
  );
}
