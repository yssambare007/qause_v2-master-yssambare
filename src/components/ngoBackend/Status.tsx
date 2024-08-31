import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  text: string;
  textColor?: string;
  bgColor?: string;
  icon1?: string;
  icon2?: string;
  file?: any;
  setFile?: (val: any) => void;
  imageLink?: string;
  onClickImage?: (link: string) => void;
}
const Status = ({
  text,
  textColor,
  bgColor,
  icon1,
  icon2,
  file,
  setFile,
  imageLink,
  onClickImage,
}: Props) => {
  return (
    <div>
      <div className="flex xs:w-[96%] sm:w-[96%] lg:w-[46%]">
        <div
          className="flex min-h-[53px] w-[50%] items-center justify-between rounded-lg border-b border-l border-r border-t border-[#C7C7C7] xs:px-[2px] sm:px-[2px] md:px-[15px]"
          style={{ backgroundColor: text === "rejected" ? "#EDEDED" : "#fff" }}
        >
          <div className="flex w-full flex-col">
            {file && (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-medium text-[#002DC9]">
                  {file.name}
                </p>
                <p className="font-[muli] text-[11px] text-[#707070]">
                  {file.size / 1000} mb
                </p>
              </>
            )}
            {imageLink && onClickImage && (
              <p
                onClick={() => onClickImage(imageLink)}
                className="max-w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-medium text-[#002DC9]"
              >
                {imageLink.split("/")[imageLink.split("/").length - 1]}
              </p>
            )}
            {imageLink && !onClickImage && (
              <Link href={imageLink} target="_blank">
                <p className="max-w-full text-[10px] font-medium text-[#002DC9]">
                  {imageLink.split("/")[imageLink.split("/").length - 1]}
                </p>
              </Link>
            )}
          </div>

          {file && setFile && (
            <Image
              src={`/images/x-circle.png`}
              className="cursor-pointer"
              height="26"
              width="26"
              alt="x-circle"
              onClick={() => setFile(null)}
            />
          )}
          {/* {
                        imageLink && (
                            < Link href={imageLink} target='_blank'>
                                <Image
                                    src={`/images/x-circle.png`}
                                    className='cursor-pointer'
                                    height='26'
                                    width='26'
                                    alt='x-circle'
                                />
                            </Link>
                        )
                    } */}
        </div>

        {text === "resolved" && (
          <div
            className={`ml-4 flex min-h-[53px] w-fit w-fit items-center rounded-lg xs:px-[2px] sm:px-[2px] md:px-[15px]`}
            style={{ backgroundColor: "#36B9331F" }}
          >
            <Image
              src={`/images/approved-left-tick.png`}
              className={`mr-[8px] rounded-full bg-['#36B933']`}
              width="15"
              height="15"
              alt="orange icon"
            />
            <p
              className={`font-[muli] font-semibold xs:text-[11px] sm:text-[11px] md:text-xs`}
              style={{ color: "#36B933" }}
            >
              Submitted
            </p>
          </div>
        )}
        {text === "pending" && (
          <div
            className={`ml-4 flex min-h-[53px] w-fit items-center rounded-lg xs:px-[2px] sm:px-[2px] md:px-[15px]`}
            style={{ backgroundColor: "#FFB1151F" }}
          >
            <Image
              src={`/images/orange-icon.png`}
              className={`mr-[8px] rounded-full bg-[#FF8515]`}
              width="15"
              height="15"
              alt="orange icon"
            />
            <p
              className={`font-[muli] font-semibold xs:text-[11px] sm:text-[11px] md:text-xs`}
              style={{ color: "#FF8515" }}
            >
              Submitted & In Review
            </p>
          </div>
        )}

        {text === "rejected" && (
          <div className="ml-4 flex min-h-[53px] w-fit items-center rounded-lg bg-[#FEE2E2] text-[#F60D0D] xs:px-[2px]  sm:px-[2px] md:px-[15px]">
            <Image
              src="/images/error-left.png"
              height="15"
              width="15"
              alt="error"
              className={`mr-[8px] rounded-full bg-[#FF8515]`}
            />
            <p className="font-[muli] font-semibold xs:text-[11px] sm:text-[11px] md:text-xs">
              Your Document has been denied because your kyc is incompleted.
              Read more
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
