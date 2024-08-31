import { Fragment } from "react";
import Layout from "../../components/layouts/defaultPages/Index";
import PlanCard from "../../components/pricing/PlanCard";
import { Plan } from "../../types/general/pricing";
import FreeDigitalKit from "../../components/pricing/FreeDigitalKit.svg";
import Free from "../../components/pricing/Free.svg";
import FemalePointingFingers from "../../components/pricing/FemalePointingFingers.png";
import SmilingMale from "../../components/pricing/SmilingMale.png";
import WhatsApp from "../../components/pricing/WhatsApp.svg";
import NgoPackage from "../../components/pricing/packageCard/icons/ngoPackage.svg";
import FundraisingPackage from "../../components/pricing/packageCard/icons/fundraisingPackage.svg";
import SocialPackage from "../../components/pricing/packageCard/icons/socialPackage.svg";
import InfoIcon from "@mui/icons-material/Info";
import Image from "next/image";
import PackageCard from "../../components/pricing/packageCard/PackageCard";

function ActionBuilder({ actions }: any) {
  return (
    <>
      {actions.map((action: any) => (
        <Fragment key={action.label}>
          <button {...action?.props}>
            {action?.icon}
            {action.label}
          </button>
        </Fragment>
      ))}
    </>
  );
}

const packages = [
  {
    icon: <NgoPackage />,
    title: "NGO Startup/Registration Package",
    benefits: [
      "80G/12A- Provisional in ₹8,999.00 + tax",
      "FCRA- ₹29,000.00 + tax",
      "NSDL- ₹90,000.00 + tax",
    ],
    ctaText: "Request a call",
  },
  {
    icon: <FundraisingPackage />,
    title: "Fundraising Proposal Strategy",
    description:
      "Fundraising Proposal Strategy, Design and Writing includes the package cost of",
    benefits: ["₹25,000.00 + tax"],
    ctaText: "Request a call",
  },
  {
    icon: <SocialPackage />,
    title: "Social Media Package",
    description:
      "To run ads for NGO in the Qause network to enhance their online visibility with targeting their online goal.",
    benefits: ["Package Cost- ₹10,000.00 + tax/month"],
    ctaText: "Request a call",
  },
  
];

export default function Pricing() {
  const plans: Plan[] = [
    {
      title: "Free Digital Kit",
      subTitle: "Marketing Kit worth ₹ 17000.00",
      subTitleIcon: (
        <div className="absolute -top-3 right-4 w-16 drop-shadow-xl xs:right-0 xs:top-2 xs:w-12">
          <FreeDigitalKit />
        </div>
      ),
      perks: [
        "FREE NGO Profile",
        "Donation button activation",
        "Access to Qause community portal (View only)[One Month]",
        "Volunteer Oppertunity Listings",
        "Fundraising Page creation",
        "Social Media Starter Pack",
      ],
      actions: [
        {
          label: "Sign up",
          props: {
            className:
              "bg-qause-blue xs:w-full justify-center leading-tight text-white px-6 py-2 rounded-md hover:bg-qause-blue-dark",
          },
        },
      ],
    },
    {
      title: "Paid Plan",
      priceInfo: {
        price: 18000,
        period: "Yearly",
      },
      subTitle: "Included FREE Digital Kit",
      subTitleIcon: (
        <div className="absolute -top-3 right-6 w-16 drop-shadow-xl xs:right-1 xs:top-1 xs:w-14">
          <Free />
        </div>
      ),
      perks: [
        "Access to Qause interactive community of Volunteer(Global)",
        "One Fundraising Proposal",
        "Two Grant Proposal/year",
        "Three Partnerships/Events with NGOs creating value",
        "Google Ads Grant [$120,000]",
        "Dedicated RM support for all your content and graphic needs",
      ],
      actions: [
        {
          label: "Request a call",
          props: {
            className:
              "border-2 xs:w-full justify-center border-qause-blue text-qause-blue px-6 py-2 leading-tight rounded-md hover:bg-qause-blue-dark",
          },
        },
        {
          label: "Request a call",
          icon: <WhatsApp />,
          props: {
            className:
              "bg-qause-blue xs:w-full justify-center text-white px-6 py-2 flex items-center leading-tight gap-x-2 rounded-md hover:bg-qause-blue-dark",
          },
        },
      ],
    },
  ];

  return (
    <>
      <Layout className="flex min-h-screen w-full flex-col leading-tight lg:pb-56 xl:px-36">
        <div className="flex h-full w-full">
          <Image src={SmilingMale} className="h-100" alt="SmilingMale" />
        </div>

        <div className="flex h-full w-full items-center justify-around gap-8 p-4 xs:flex-col sm:flex-col md:flex-row lg:gap-16">
          {plans.map((plan: Plan) => (
            <Fragment key={plan.title}>
              <PlanCard
                plan={plan}
                priceInfo={
                  plan.priceInfo && (
                    <Fragment>
                      <div className="flex items-baseline justify-end">
                        <div className="text-xl font-bold text-blue-600">
                          ₹ {plan.priceInfo.price}
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          / Yearly
                        </div>
                      </div>
                    </Fragment>
                  )
                }
              >
                <div className="relative flex items-center justify-center text-lg font-bold">
                  <div className="mt-4 flex w-full flex-col gap-y-6">
                    <div className="flex w-full items-center gap-2 xs:flex-col">
                      <ActionBuilder actions={plan.actions} />
                    </div>
                    <div className="flex w-full flex-col items-start justify-center gap-y-1">
                      <div className="flex items-center gap-x-2 text-xs font-bold uppercase text-qause-blue">
                        <InfoIcon />
                        <span>kyc mandatory</span>
                      </div>
                      <div className="font-base flex text-xs">T&C applied*</div>
                    </div>
                  </div>
                  {plan.title === "Free Digital Kit" && (
                    <div className="absolute -bottom-6 -right-14 xs:hidden">
                      <Image
                        src={FemalePointingFingers}
                        alt={"FemalePointingFingers"}
                        className="w-60"
                      />
                    </div>
                  )}
                </div>
              </PlanCard>
            </Fragment>
          ))}
        </div>

        {/* Bottom Portion */}
        <div className="mt-28 mb-12">
          <div className="mx-auto flex flex-col items-center gap-8 text-center mb-14">
            <p className="text-[40px] font-bold">Everything for your NGO</p>
            <p className="max-w-[80%] text-2xl">
              Build a home online and let the{" "}
              <span className="font-semibold text-[#002DC9]">DONORS</span> find
              you. Qause has all
              <span className="font-semibold text-[#002DC9]">
                {" "}
                Digital Tools
              </span>{" "}
              you need to{" "}
              <span className="font-semibold text-[#002DC9]">
                Grow your NGO !
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 gap-6 lg:mx-4">
            {packages.map((packageItem, index) => {
              return (
                <PackageCard
                  icon={packageItem.icon}
                  key={index}
                  benefits={packageItem.benefits}
                  btnText={packageItem.ctaText}
                  heading={packageItem.title}
                  description={packageItem?.description}
                />
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
