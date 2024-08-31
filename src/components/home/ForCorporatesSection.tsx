import { Grass } from "./Decorations";
import HomeSectionFrame from "./HomeSectionFrame";
import Image from "next/image";
import { DraggableHorizontalScrolling } from "./HorizontalScrolling";

export default function ForCorporatesSection() {
  return (
    <HomeSectionFrame
      qauseFor="Corporates"
      forBackground="bg-white"
      forForeground="text-[#eca43e]"
      background="bg-[#eca43e]"
      subTitle="Expand your corporate philanthropy impact"
    >
      <div className="flex w-full flex-col font-sans md:gap-16 md:pb-60 md:pt-16">
        <div className="mx-auto flex flex-col-reverse rounded-xl bg-white px-4 md:w-9/12 md:flex-row md:gap-10">
          <div className="flex flex-[3] flex-col gap-10 px-5 py-8">
            <div className="">
              <span className="font-medium text-qause-blue-dark">
                Many feel like it is their
              </span>{" "}
              duty to do their part in making the world a better place, and this
              burgeoning generation does not want to be associated with or
              support companies who do not take responsibility for the world and
              the people in it.
            </div>
            <button className="w-fit rounded-lg bg-[#FFB115] px-6 py-2 text-black">
              Inquire Now
            </button>
          </div>

          <div className="relative flex-[2]">
            <Image
              className="-bottom-12 left-24 md:absolute"
              src="/images/Group 226974.png"
              alt="corporate_img"
              height={100}
              width={400}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-y-4">
          <div className="relative flex p-4 pl-16 text-4xl font-bold">
            We are in the news...
            <Grass className="-top-10 left-6 h-16 w-16 -rotate-12 fill-white" />
          </div>

          {/* cards */}
          <DraggableHorizontalScrolling className="no-scrollbar z-10 flex max-w-full gap-7 overflow-x-auto rounded-3xl py-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
              <div
                className="flex flex-col gap-3 rounded-3xl bg-white xs:min-w-full"
                key={item}
              >
                <Image
                  className="min-w-[400px] rounded-t-3xl md:min-w-[500px]"
                  src="/images/Rectangle 103.png"
                  alt="corporate_img"
                  height={200}
                  width={3000}
                />

                <div className="flex flex-col gap-8 px-4 pb-8 pt-3">
                  <div className="text-xl font-extrabold text-[#172B4D] xs:text-center sm:text-center md:text-left">
                    Need For Disabled Students
                  </div>

                  <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-start">
                    <Image
                      className="!h-16 !w-16 rounded-full"
                      src="/images/ParulSharma.png"
                      alt="news_img"
                      width={3000}
                      height={200}
                    />

                    <div className="flex flex-col gap-1 xs:items-center sm:items-center md:items-start">
                      <span className="text-center text-sm text-[#172B4D]">
                        Shri Adwait Pariwar Foundation
                      </span>
                      <span className="text-center text-sm text-[#626F86]">
                        Differently Abled, India
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500">
                    does not want to be associated with or support companies who
                    do not take responsibility for the world and the people in
                    it.........
                  </p>

                  <button className="rounded bg-[#3E414E] py-2 text-white">
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </DraggableHorizontalScrolling>
        </div>
      </div>
    </HomeSectionFrame>
  );
}
