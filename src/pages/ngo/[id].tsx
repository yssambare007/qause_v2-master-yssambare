//@typescript-eslint/consistent-type-imports
//@typescript-eslint/no-explicit-any
import { useEffect, useState } from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { base_url } from "../../utils/utils";
import ErrorPage from "next/error";
import Footer from "../../components/common/Footer";
import { GetStaticPaths } from "next";
import parse from "html-react-parser";
import NgoHeader from "../../components/ngo/NgoHeader";
import SeoHeadComponent from "../../components/common/SeoHeadComponent";
import { seoContext } from "../../utils/seo";
import { useRouter } from "next/router";

export async function getStaticProps({ params }: any) {
  const { id } = params;

  const res = await fetch(`${base_url}v1/view/ngo/${id}/profile`, {
    method: "GET",
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

const Index = (props: any) => {
  const [content, setContent] = useState("Founder");
  const router = useRouter();
  const {
    success,
    data: {
      _id,
      name,
      address,
      category,
      foundingYear,
      founder,
      publicEmail,
      publicMobile,
      images,
      story,
    },
  } = props.data;
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  if (!success) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <SeoHeadComponent {...seoContext.LivePreview} />
      <NgoHeader Headername={name} />

      <div className="relative mb-[270px] bg-[#f7a110] px-[30px] pb-[298px] xs:mb-[180px] xs:pb-[158px] md:mb-[220px]">
        <div className="flex flex-wrap pt-[65px] xs:px-0 xs:px-[10px] xs:pt-[30px] md:flex-col md:px-[15px] lg:px-[70px] xl:flex-row">
          <div className="flex flex-col px-[15px]">
            <p className="font-[muli] text-3xl font-semibold capitalize text-white xs:text-[23.04px]">
              {name}
            </p>

            <div className="mt-[20px] mb-[15px] h-[1px] bg-white md:max-w-[418px] xl:min-w-[418px]"></div>

            <div className="mb-[30px] flex xs:flex-col md:flex-row xl:flex-col">
              <div className="flex flex-row">
                <p className="mr-[30px] font-[muli] text-lg font-bold capitalize text-white xs:text-[14.4px]">
                  {address.city} {address.city && ","} {address.state}{" "}
                  {address.state && ","} {address.country}
                </p>

                <div className="mr-[30px] h-[28px] w-[1px] bg-white"></div>
              </div>

              <p className="mr-[30px] font-[muli] text-lg font-bold text-white xs:text-[14.4px]">
                Founding Year - {foundingYear}
              </p>
            </div>

            <div className="flex items-center px-[15px] xs:px-0">
              <Image
                className="mr-[13px]"
                src="/images/qause-verified-icon.png"
                width="30"
                height="30"
                alt=""
              />
              <p className="font-[muli] text-base font-semibold text-white xs:text-[14.4px]">
                Qause Verified
              </p>
              <Image
                src="/images/exclamation.png"
                className="ml-[12px] h-[20px] w-[18px]"
                width="18"
                height="20"
                alt=""
              />
            </div>

            <div className="z-10 mt-[50px] w-max cursor-pointer rounded-xl bg-white px-[24px] py-[14px]">
              <p className="z-40 font-[muli] text-lg font-bold text-[#F7A212] xs:text-[14.4px]">
                Donate to us
              </p>
            </div>
          </div>

          <div className="px-[15px] xs:my-[30px] sm:my-[30px] md:mt-[50px]">
            <div className="mb-[10px] flex items-center">
              <StarIcon style={{ color: "white", height: "18px" }} />
              <p className="ml-[10px] font-[muli] text-2xl font-bold uppercase text-white xs:text-[21.6px] xs:text-lg">
                {category.name}
              </p>
            </div>

            <div className="mb-[20px] flex items-center">
              <StarIcon style={{ color: "white", height: "18px" }} />
              <p className="ml-[10px] font-[muli] text-base font-medium capitalize text-white xs:text-[15px]">
                {category.subCategories[0]}
              </p>
            </div>
          </div>
        </div>

        <Image
          className="absolute left-[50%] h-auto w-auto max-w-full translate-x-[-50%] rounded-3xl border-2 border-white object-cover xs:bottom-[-25%] xl:bottom-[-30%]"
          src={`https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${_id}/${images.cover}`}
          alt=""
          width="804"
          height="484"
        />
      </div>

      {/* Founder NGO Contact  */}
      <div className="md:px-[8%] lg:px-[6%] xl:px-[4%] 2xl:px-[12%]">
        <div className="flex justify-center py-[50px]">
          <div
            className={`flex min-h-[52px] justify-center px-[8.8px] py-[4.4px] font-[muli] xs:min-w-[28%] xs:text-[21.6px] sm:min-w-[25%] sm:text-2xl md:min-w-[31%] ${
              content === "Founder"
                ? "border-b-[3px] border-[#f7a212] font-bold text-[#253DC0]"
                : "border-b-[2px] border-[#ddd] font-semibold text-[#565656]"
            }  cursor-pointer`}
            onClick={() => setContent("Founder")}
          >
            Founder
          </div>

          <div
            className={`flex min-h-[52px] justify-center px-[8.8px] py-[4.4px] font-[muli] font-semibold xs:min-w-[28%] xs:text-[21.6px] sm:min-w-[25%] sm:text-2xl md:min-w-[31%] ${
              content === "NGO"
                ? "border-b-[3px] border-[#f7a212] font-bold text-[#253DC0]"
                : "border-b-[2px] border-[#ddd] font-semibold text-[#565656]"
            } cursor-pointer`}
            onClick={() => setContent("NGO")}
          >
            NGO
          </div>

          <div
            className={`flex min-h-[52px] justify-center px-[8.8px] py-[4.4px] font-[muli] font-semibold xs:min-w-[28%] xs:text-[21.6px] sm:min-w-[25%] sm:text-2xl md:min-w-[31%] ${
              content === "Contact"
                ? "border-b-[3px] border-[#f7a212] font-bold text-[#253DC0]"
                : "border-b-[2px] border-[#ddd] font-semibold text-[#565656]"
            } cursor-pointer`}
            onClick={() => setContent("Contact")}
          >
            Contact
          </div>
        </div>

        {/* Founder  */}
        {content === "Founder" && (
          <div className="flex xs:mb-[65px] xs:flex-col sm:mb-[100px] sm:flex-col md:flex-row">
            <div className="px-[15px]">
              <Image
                className="mb-[13.2px] rounded-lg xs:mx-auto sm:mx-auto sm:max-h-[476px] sm:max-w-[476px] md:h-[210px] md:w-[210px] md:max-w-[210px] lg:h-[350px] lg:max-h-[350px] lg:w-[300px] lg:max-w-[300px]"
                src={`https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${_id}/${founder.image}`}
                width="500"
                height="500"
                alt=""
              />
              <p className="mb-[4.4px] text-center font-[muli] text-lg font-semibold text-[#F7A212]">
                {founder.name}
              </p>
              <p className="mb-[8.8px] text-center font-[muli] text-lg font-medium text-[#B4B4B4]">
                ( Founder & Managing Director )
              </p>
            </div>

            {founder.bio && (
              <div className="mt-[-2.6px] flex max-h-fit flex-col px-[15px] xs:mx-auto xs:max-w-[550px] sm:mx-auto sm:max-w-[550px] md:max-w-[730px]">
                {founder.bio && (
                  <h3 className="sm:-[14.4px] xs:-[14.4px] mb-[4.4px] font-[muli] font-black text-black xs:text-center sm:text-center md:text-left md:text-[23.04px] lg:text-4xl">
                    From the Founder’s Diary
                  </h3>
                )}

                <div className="mt-[26.4px] max-h-[200px] overflow-y-auto">
                  <p className="font-[muli] font-light leading-[25px] xs:text-[11.52px] sm:text-[11.52px] md:text-[12.288px] lg:text-[14.08px]">
                    {founder.bio && parse(founder.bio)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* NGO  */}
        {content === "NGO" && (
          <div className="mb-[75px] flex xs:flex-col sm:flex-col md:flex-row">
            <div className="px-[15px]">
              <Image
                className="mb-[13.2px] max-h-[250px] max-w-[250px] xs:mx-auto sm:mx-auto md:h-[210px] md:w-[210px] lg:h-[350px] lg:w-[300px]"
                src={`https://s3.ap-south-1.amazonaws.com/qause.development/ngo/${_id}/${images.logo}`}
                width="500"
                height="500"
                alt=""
              />
            </div>

            <div className="mt-[-2.6px] flex max-h-fit flex-col px-[15px] xs:mx-auto xs:max-w-[550px] sm:mx-auto sm:max-w-[550px] md:max-w-[730px]">
              <div className="mt-[26.4px] max-h-[200px] overflow-y-auto">
                <p className="font-[muli] font-light leading-[25px] xs:text-[11.52px] sm:text-[11.52px]  md:text-[12.288px] lg:text-[14.08px]">
                  {parse(story.text)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact  */}
        {content === "Contact" && (
          <div className="mb-[85px] flex xs:flex-col sm:flex-col md:flex-row">
            <div className="min-h-[150px] min-w-[380px] px-[15px] text-left xs:text-center sm:text-center">
              <p className="mb-[4.4px] font-[muli] text-xl font-semibold text-[#253DC0] xs:text-[14.4px]">
                Write us at:
              </p>
              <p className="font-[muli] text-lg font-normal text-[#1A1A1A] xs:text-[14.4px]">
                {publicEmail}
              </p>
              <p className="mt-[26.4px] mb-[4.4px] font-[muli] text-xl font-semibold text-[#253DC0] xs:text-[14.4px]">
                Call us at:
              </p>
              <p className="font-[muli] text-lg font-normal text-[#1A1A1A] xs:text-[14.4px]">
                {publicMobile}
              </p>
            </div>

            <div className="min-h-[150px] min-w-[380px] px-[15px] text-left xs:text-center sm:text-center">
              <p className="mb-[4.4px] font-[muli] text-xl font-semibold text-[#253DC0] xs:text-[14.4px]">
                Find us at:
              </p>
              <p className="mb-[8.8px] font-[muli] text-base font-normal capitalize text-[#1A1A1A] xs:text-[14.4px] xs:text-[11.52px]">
                {" "}
                {address.city} {address.city && ","} {address.state}{" "}
                {address.state && ","} {address.country}.
              </p>

              <p className="my-[26.4px] inline-block bg-[#F7A212] py-[10px] px-[30px] text-xl font-normal text-white">
                Request Details
              </p>

              <div className="mt-[26.4px] flex justify-center">
                <Image
                  className="mr-[18px] h-[40px] w-[40px]"
                  width="40"
                  height="40"
                  alt=""
                  src="/images/instagram-lock-icon.svg"
                />
                <Image
                  className="mr-[18px] h-[40px] w-[40px]"
                  width="40"
                  height="40"
                  alt=""
                  src="/images/facebook-lock-icon.svg"
                />
                <Image
                  className="mt-[-6px] h-[50px] w-[50px]"
                  width="50"
                  height="50"
                  alt=""
                  src="/images/youtube-lock-icon.svg"
                />
              </div>
            </div>

            <div></div>
          </div>
        )}
      </div>

      <div className="mb-[100px] cursor-pointer">
        <div className="flex justify-center pb-[26.4px]">
          <div className="my-auto mr-[10px] mt-[20x] h-[1px] w-full bg-[#E1E1E1]"></div>
          <h2 className="whitespace-nowrap font-[muli] text-[35.2px] font-black text-[#253DC0]">
            Similar Ngo’s
          </h2>
          <div className="my-auto ml-[10px] mt-[20x] h-[1px] w-full bg-[#E1E1E1]"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-t-[50px] bg-[#F7F7F7] xs:h-[300px] xs:w-[80%] sm:h-[280px] sm:w-[433px]">
            <Image
              className="mx-auto xs:h-[85%] xs:w-[62%]"
              src="/images/qause-nine.png"
              width="250"
              height="250"
              alt={""}
            />
          </div>

          <div className="flex h-[106px] justify-between rounded-b-[50px] bg-[#353DC0] px-2 py-4 xs:min-w-[80%] sm:w-[433px]">
            <div className="px-[30px]">
              <p className="font-[muli] text-xl text-white xs:text-[14px]">
                Qause nine
              </p>
              <hr className="my-[5px] border-white" />
              <p className="font-[muli] text-xl text-white xs:text-[14px]">
                Category - Social Injustice
              </p>
            </div>

            <div>
              <ArrowRightAltIcon sx={{ color: "#f7a212", fontSize: "60px" }} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
