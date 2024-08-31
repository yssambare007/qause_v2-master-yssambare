import ProfileBackgroundStar from "./../../../public/images/profile/profileBackgroundStar.svg";
import LinesImage from "./../../../public/images/profile/lines.svg";
interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  return (
    <div className="relative col-span-9 rounded-r-lg bg-[#ffffff] px-6 py-9">
      <ProfileBackgroundStar
        className="absolute"
        style={{ right: "-2rem", top: "-2rem" }}
      />
      {props.children}

      <LinesImage
        className="absolute"
        style={{ right: "0", bottom: "-55px", transform: "scale(0.5)" }}
      />
    </div>
  );
}
