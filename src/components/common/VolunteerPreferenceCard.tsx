import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import image1 from "../../../public/images/step-4.png";
import Image from "next/image";

interface VolunteerAuthCardProps {
  onSendOTP: any;
  title: string;
  isRadioButton?: boolean;
  setPref: (item: string) => void;
}

const VolunteerPreferenceCard = (props: VolunteerAuthCardProps) => {
  const router = useRouter();

  const backBtnClick = () => {
    if (props.isRadioButton) {
      router.push("/volunteer-passion");
    } else {
      router.push("/volunteer-location");
    }
  };

  return (
    <div className="flex min-h-full w-full flex-col items-center gap-y-8 overflow-y-auto px-[5%] pt-8 lg:w-5/12">
      <div className="flex w-full items-center justify-start">
        <ArrowBackIcon
          style={{ fontSize: "35px", cursor: "pointer" }}
          onClick={backBtnClick}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.title }}
        className="w-full text-center text-[42px] font-black"
      ></div>
      {props.isRadioButton && (
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full justify-around">
            <div>
              <input
                onChange={(e) => props.setPref("online")}
                type="radio"
                value="online"
                name="preference"
              />
              <label>Online</label>
            </div>
            <div>
              <input
                onChange={(e) => props.setPref("offline")}
                type="radio"
                value="offline"
                name="preference"
              />
              <label>Offline</label>
            </div>
            <div>
              <input
                onChange={(e) => props.setPref("both")}
                type="radio"
                value="both"
                name="preference"
              />
              <label>Both</label>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-full w-full items-center justify-center">
        <Image
          width={300}
          height={300}
          src={image1}
          alt="vector-people"
        ></Image>
      </div>
      <div className="w-[80%]">
        {props.isRadioButton && (
          <h1 className="text-center text-2xl font-extrabold">
            {'"The'} <span className="text-[#f7a212]">Greatest</span>{" "}
            {'goood is what we do for one"'}{" "}
            <span className="text-[#f7a212]">Another</span>
          </h1>
        )}
        {!props.isRadioButton && (
          <h1 className="text-center text-2xl font-extrabold">
            {`"We can't help`} <span className="text-[#f7a212]">Everyone</span>{" "}
            {"but"} <span className="text-[#f7a212]">Everyone</span> can help{" "}
            {`someone"`}
          </h1>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          className={`w-[90%] rounded-3xl ${
            6 === 6 ? "bg-[#f7a212]" : "bg-[#f8c165]"
          } my-3 py-4 text-white`}
          onClick={props.onSendOTP}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VolunteerPreferenceCard;

VolunteerPreferenceCard.defaultProps = {
  isRadioButton: false,
};
