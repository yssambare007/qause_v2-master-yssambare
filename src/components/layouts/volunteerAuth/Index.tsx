import Image from "next/image";
import ChildrenImg from "../../../../public/images/donation_image_1.png";

interface VolunteerAuthLayoutProps {
  children: React.ReactNode;
  imageUrl?: string;
  isText?: boolean;
  text?: string;
}

const VolunteerAuthLayout = (props: VolunteerAuthLayoutProps) => {
  const imgurl = props.imageUrl || "https://qause.cc/assets/images/welcome.svg";
  return (
    <>
      <div className="flex min-h-screen w-full overflow-hidden bg-[#f9fafb] xs:flex-col lg:flex-row">
        <div className="block min-h-full lg:block lg:w-7/12">
          <figure className="h-full w-full">
            {!props.isText && (
              <Image
                width={500}
                height={500}
                src={ChildrenImg}
                alt="welcome"
                className="h-full w-full object-cover"
              />
            )}
            {props.isText && (
              <div className="flex h-full w-full items-center justify-center px-2 text-center text-5xl font-black text-[#5D3FD3] xs:text-3xl">
                <h1 className="p-5">{props.text}</h1>
              </div>
            )}
          </figure>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default VolunteerAuthLayout;
VolunteerAuthLayout.defaultProps = {
  isText: false,
};
