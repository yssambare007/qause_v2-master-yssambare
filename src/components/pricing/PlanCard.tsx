import { Plan } from "../../types/general/pricing";
import PerkCheckIcon from "./PerkCheckIcon.svg";
import { Fragment } from "react";

interface PlanCardProps {
  priceInfo?: JSX.Element;
  children: JSX.Element;
  plan: Plan;
}

function PerkItem(props: { perk: string }) {
  return (
    <>
      <div className="flex h-fit w-full flex-row items-start gap-x-2">
        <div className="flex h-full flex-col pt-1.5">
          <PerkCheckIcon />
        </div>
        <div className="flex h-full flex-grow flex-col">{props.perk}</div>
      </div>
    </>
  );
}

export default function PlanCard(props: PlanCardProps) {
  const { plan, priceInfo, children } = props;
  return (
    <>
      <div className="flex min-h-full w-full flex-col justify-center gap-y-4 self-stretch rounded-xl border-4 border-blue-100 bg-white px-6 py-6">
        <div className="flex justify-between">
          <div className="flex-grow text-2xl font-bold">{plan.title}</div>
          {priceInfo}
        </div>
        <div className="text-md relative flex w-full items-center rounded-xl bg-[#002dc9] p-6 font-bold text-white xs:px-2">
          {plan.subTitle}
          <div className="absolute right-0 flex h-full w-36 overflow-clip rounded-br-xl rounded-tr-xl xs:hidden">
            <div className="absolute -right-6 -top-2 h-full w-36 rotate-45 bg-[#fff6]"></div>
          </div>
          {plan.subTitleIcon}
        </div>
        <div className="flex h-full w-full flex-col gap-y-2">
          {plan.perks.map((perk: string) => (
            <Fragment key={perk}>
              <PerkItem perk={perk} />
            </Fragment>
          ))}
        </div>
        {children}
      </div>
    </>
  );
}
