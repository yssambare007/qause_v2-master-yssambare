import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface VolunteerAuthCardProps {
  onSendOTP: () => void;
  title: string;
  addItem: (item: string) => void;
  data: string[];
  selectedItem: string[];
}

const VolunteerPassionCard = (props: VolunteerAuthCardProps) => {
  const router = useRouter();

  const backBtnClick = () => {
    router.push("/volunteer-signup-personal-detail");
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
      <div className="flex w-full items-center justify-center">
        <Grid
          className="w-[90%]"
          style={{ padding: "0 30px" }}
          container
          spacing={2}
          columnGap={4}
          rowGap={2}
        >
          {props.data.map((item: string, index: number) => {
            return (
              <Grid
                xs={12}
                md={5}
                item
                key={index}
                className="flex justify-between"
              >
                <div
                  style={{
                    backgroundColor:
                      props.selectedItem.includes(item) === true
                        ? "#f7a212"
                        : "#d3d3d3",
                    cursor: "pointer",
                  }}
                  onClick={() => props.addItem(item)}
                  className="flex h-[80px] w-[100%] items-center justify-center rounded-lg border text-center"
                >
                  {item}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          className={`w-[90%] rounded-3xl ${
            props.selectedItem.length > 0 ? "bg-[#f7a212]" : "bg-[#f8c165]"
          } my-4 py-4 text-white`}
          onClick={props.onSendOTP}
          disabled={props.selectedItem.length < 1 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VolunteerPassionCard;
