import { Grass } from "./Decorations";

interface Props {
  qauseFor?: string;
  background: string;
  forBackground?: string;
  forForeground?: string;
  subTitle?: string;
  grassFillColor?: string;
  children: JSX.Element;
  subSection?: JSX.Element;
  padding?: string;
}

export default function HomeSectionFrame(props: Props) {
  return (
    <>
      <div
        className={`flex w-full flex-col items-center gap-y-4 p-8 xl:${
          props.padding || "px-20"
        } ${props.background}`}
      >
        {props.qauseFor && (
          <div className="mt-4 flex w-full items-center justify-center gap-x-1 font-[GeneralSans-Bold] text-[54px] xs:flex-col xs:gap-y-4">
            <span>Qause for</span>
            <span
              className={`relative rounded-full ${props.forBackground} px-2 pb-1 text-center ${props.forForeground}`}
            >
              {props.qauseFor}
              <Grass
                className={`${
                  props.grassFillColor || "fill-white"
                } -right-10 -top-10 h-12 w-12`}
              />
            </span>
          </div>
        )}
        {props.subTitle && (
          <div className="flex w-full items-center justify-center font-light">
            {props.subTitle}
          </div>
        )}
        <div className="mt-4 h-full w-full">{props.children}</div>
      </div>
      {props.subSection && (
        <div className="h-full w-full">{props.subSection}</div>
      )}
    </>
  );
}
