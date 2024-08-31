import Plus from "./assets/Plus.svg";
import NGORegistrationPackage from "./assets/NGORegistrationPackage.svg";
import NonProfitSquiggly from "./assets/NonProfitSquiggly.svg";
import FundraisingProposalStrategy from "./assets/FundraisingProposalStrategy.svg";
import SocialMediaPackage from "./assets/SocialMediaPackage.svg";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Grass, Star } from "./Decorations";
import HomeSectionFrame from "./HomeSectionFrame";
import { useCallback } from "react";

function SignUpCard() {
  return (
    <div className="flex w-1/2 flex-col xs:w-full xs:items-center sm:w-full sm:items-center md:items-start">
      <div className="text-xl font-bold uppercase">Sign up & get</div>
      <div className="relative w-auto font-['GeneralSans'] text-4xl font-[600] xs:text-3xl">
        NGO Marketing KIT
        <Grass className="rotate-[35deg] fill-blue-500 xs:-right-10 xs:-top-8 xs:h-10 xs:w-10 sm:-right-10 sm:-top-6 sm:h-10 sm:w-10 md:h-14 md:w-14 lg:-right-14 lg:-top-10" />
      </div>
      <div className="text-6xl font-black uppercase xs:text-5xl">for free</div>
      <div className="my-2 w-fit rounded-2xl bg-[#b5c2ef] px-2 py-1 text-2xl font-medium xs:text-xl">
        Worth ₹17000
      </div>
      <div className="mt-2 flex w-fit gap-x-2 text-base">
        <button className="rounded-lg bg-qause-blue-gray px-6 py-5 text-white">
          Create Free Account
        </button>
        <button className="rounded-lg border border-gray-500 px-6 py-5">
          Request a call
        </button>
      </div>
      <div className="mt-3 text-sm font-normal italic text-[#414450]">
        ** KYC is needed to avail the offers
      </div>
    </div>
  );
}

function FreeMerchs() {
  const merchs = [
    {
      title: "NGO Presentation",
      subtitle: "Worth ₹7000",
      logo: "presentation.png",
    },
    {
      title: "1 NGO Brochure",
      subtitle: "Worth ₹3000",
      logo: "ngobrochure.png",
    },
    {
      title: "Visiting Card",
      subtitle: "Worth ₹500",
      logo: "visiting-card.png",
    },
    {
      title: "Volunteer Opportunity",
      subtitle: "Listing Worth ₹3000",
      logo: "event posterVolunteer.png",
    },
    {
      title: "1 Event Poster",
      subtitle: "Worth ₹1500",
      logo: "event poster.png",
    },
    {
      title: "Fundraising Page Creation",
      subtitle: "Worth ₹1000",
      logo: "fundraising.png",
    },
    {
      title: "1 Social Media Post",
      subtitle: "For FB/Insta worth ₹3000",
      logo: "social-media-post.png",
    },
  ];
  return (
    <div className="grid h-full w-[60%] grid-cols-2 gap-2 xs:w-full xs:grid-cols-1 sm:w-full">
      {merchs.map((merch: any) => (
        <div
          className="flex items-center gap-x-2 rounded-lg border-2 border-[#002DC9] px-5 py-4"
          key={merch.title}
        >
          <figure>
            <img src={`/images/${merch.logo}`} alt="" />
          </figure>
          <div className="flex flex-col justify-center">
            <div className="text-base font-medium text-qause-blue-dark">
              {merch.title}
            </div>
            <div className="text-sm font-normal text-qause-blue-dark">
              {merch.subtitle}
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-x-2 rounded-lg border-2 border-[#002DC9] px-5 py-4">
        <Plus />
        <div className="text-base font-medium">More options inside</div>
      </div>
    </div>
  );
}

interface ImpactCardProps {
  icon: any;
  label: string;
  desc: string;
  onRequestCallback?: string;
}

function ImpactCard(props: ImpactCardProps) {
  const ICIcon = props.icon;
  const onReqCB = useCallback(() => props.onRequestCallback, []);
  return (
    <div className="flex max-w-[330px] flex-col items-center justify-center gap-y-2">
      <div className="flex h-[144px] w-[144px] items-center justify-center rounded-full bg-[#002DC9]">
        <ICIcon />
      </div>
      <div className="mt-2 w-full text-center font-['GeneralSans'] text-2xl font-black text-qause-blue-dark">
        {props.label}
      </div>
      <div className="w-full max-w-[322px] text-center text-base font-normal">
        {props.desc}
      </div>
      <div className="mt-2 flex w-full items-center justify-center p-2">
        <button
          onClick={onReqCB}
          className="w-full rounded-xl bg-white px-6 py-5 text-[#002DC9]"
        >
          Request Callback
        </button>
      </div>
    </div>
  );
}

interface NgoCommentCardProps {
  ngoName: string;
  name: string;
  photo: string;
  comment: string;
}

function NgoCommentCard(props: NgoCommentCardProps) {
  return (
    <div className="relative w-1/3 rounded-xl bg-white p-4 px-12 text-qause-blue-gray odd:text-[#9398AF] even:bg-[#002dc9] even:text-white xs:w-full sm:w-full md:even:-translate-y-10">
      <div className="flex w-full items-center justify-center p-4">
        <FormatQuoteIcon className="rotate-180" fontSize="large" />
      </div>
      <div className="w-full pb-8 text-center">{props.comment}</div>
      <div className="relative flex justify-center">
        <div className="absolute -bottom-28 flex flex-col items-center justify-center text-qause-blue-gray">
          <figure>
            <img src={`images/${props.photo}`} alt={props.name} />
          </figure>
          <div className="text-base font-semibold">{props.name}</div>
          <div className="text-sm font-normal">{props.ngoName}</div>
        </div>
      </div>
    </div>
  );
}

export default function ForNonProfitsSection() {
  const Impacts = [
    {
      label: "NGO Registration Package",
      desc: "Lorem ipsum dolor sit amet consectetur. At tincidunt enim aliquam massacursus diam ullamcorper vel vel.",
      icon: NGORegistrationPackage,
    },
    {
      label: "Fundraising Proposal Strategy",
      desc: "Lorem ipsum dolor sit amet consectetur. At tincidunt enim aliquam massacursus diam ullamcorper vel vel.",
      icon: FundraisingProposalStrategy,
    },
    {
      label: "Social Media Package",
      desc: "Lorem ipsum dolor sit amet consectetur. At tincidunt enim aliquam massacursus diam ullamcorper vel vel.",
      icon: SocialMediaPackage,
    },
  ];

  const ngosComments = [
    {
      ngoName: "ARR NGO",
      name: "Anchal Arora",
      photo: "AnchalArora.png",
      comment:
        "I am extremely grateful for the work that NGO has done in our community. They have made a noticeable difference and their dedication to helping others is truly inspiring.",
    },
    {
      ngoName: "Bright NGO",
      name: "Parul Sharma",
      photo: "ParulSharma.png",
      comment:
        "NGO has been a valuable resource for our community, providing much-needed support and services to those in need. Their commitment to making a positive impact is evident in all that they do.",
    },
    {
      ngoName: "RSS NGO",
      name: "Kriti Saxena",
      photo: "KritiSaxena.png",
      comment:
        "I have personally witnessed the positive difference that the NGO has made in our community. Their dedication and hard work have truly made a lasting impact.",
    },
  ];

  return (
    <HomeSectionFrame
      qauseFor="Nonprofits"
      forBackground="bg-white"
      forForeground="text-[#002dc9]"
      background="bg-[#ccd5f4]"
      subTitle="Making it all simpler for Nonprofits"
    >
      <div className="h-full w-full font-sans">
        <div className="relative rounded-xl bg-white">
          <Star className="-right-[2em] -top-[3em] fill-white stroke-blue-700" />
          <Star className="-bottom-[1em] -left-[1em] h-10 w-10 fill-white stroke-blue-700" />
          <div className="flex w-full flex-col items-center justify-center text-xl font-bold">
            <div className="relative flex h-full w-full items-center justify-between gap-10 p-10 py-14 text-qause-blue-gray xs:flex-col sm:flex-col md:flex-row">
              <NonProfitSquiggly className="absolute left-0 top-0 h-full w-full" />
              <SignUpCard />
              <FreeMerchs />
            </div>
            <div className="relative flex h-full w-full flex-col justify-between rounded-b-xl bg-[#f0f2fc] p-10 text-qause-blue-dark">
              <svg
                className="absolute -top-12 left-[50%] hidden md:block"
                width="88"
                height="88"
                viewBox="0 0 88 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="44" cy="44" r="44" fill="white" />
              </svg>

              <div className="flex w-full items-center justify-center">
                <div className="w-[511px] text-center text-[40px] font-bold leading-[52px]">
                  <span className="text-[#002DC9]">Digital services</span> for
                  NGOs to scale their impact
                </div>
              </div>
              <div className="mt-4 flex w-full items-center justify-evenly py-5 xs:flex-col xs:gap-y-10 sm:flex-col sm:gap-y-10 md:flex-row">
                {Impacts.map((impact) => (
                  <ImpactCard
                    key={impact.label}
                    icon={impact.icon}
                    label={impact.label}
                    desc={impact.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 mt-8 flex w-full flex-col items-center justify-around gap-y-8 xs:mb-24 sm:mb-24">
          <div className="text-center text-4xl font-bold leading-[56px] text-qause-blue-dark">
            What other NGOs are saying
          </div>
          <div className="flex items-center justify-evenly gap-8 xs:flex-col xs:gap-y-36 sm:flex-col sm:gap-y-36 md:my-10 md:flex-row">
            {ngosComments.map((comment: NgoCommentCardProps) => (
              <NgoCommentCard {...comment} key={comment.name} />
            ))}
          </div>
        </div>
      </div>
    </HomeSectionFrame>
  );
}
