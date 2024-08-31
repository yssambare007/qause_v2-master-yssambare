import { Grid } from "@mui/material";
import image1 from "../../../public/images/step-2bg.png";
import Image from "next/image";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import VerifiedIcon from "@mui/icons-material/Verified";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EMPTY_STRING } from "../../constants/constants";
import { useMutation } from "react-query";
import { OTPPayloadRespone, postVolunteerLocation, postVolunteerPassions } from "../../utils/apis/auth/Volunteer";
import { ErrorType } from "../../services/types/models";


const VolunteerLocationPage = () => {
  const router = useRouter();
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [address, setAddress] = useState<string>(EMPTY_STRING);
  
  useEffect(() => {
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
           setLat(latitude);
           setLong(longitude);
        });
    }
}, []);


const {
  mutate: postData,
  isLoading,
  isSuccess,
  isError,
  error,
  data,
} = useMutation(postVolunteerLocation, {
  //side effects if the req is successful
  onSuccess: (data: OTPPayloadRespone) => {
    if (data.success) {
      localStorage.removeItem("pref");
      alert(data.data);
      router.push("/find-volunteer");
    }
  },
  //side effects if the req fails
  onError: (error: ErrorType) => {
    alert(error.error);
  },
});

const onClickNext = () => {
  const reqBody = {
    formattedAddress: address,
    lat: lat,
    long: long,
    preferrence:localStorage.getItem("pref")
  };
  postData(reqBody);
};

  const backBtnClick = () => {
    router.push("/volunteer-preference");
  };

  const dummyData = [1, 2, 3];
  return (
    <div className="h-[100vh] lg:overflow-hidden">
      <Grid container>
        <Grid container item xs={12} lg={6}>
        <div className=" mx-5 mt-1 flex w-full items-center justify-start">
        <ArrowBackIcon style={{ fontSize: "35px", cursor:"pointer" }} onClick={backBtnClick} />
      </div>
          <Grid
            className=" flex h-[50vh] w-[100vw] justify-center"
            item
            xs={12}
          >
            <div
              style={{ borderRadius: "15px" }}
              className="my-5 h-full w-[80%] bg-[#5600e3]"
            >
              <div className="flex h-[55%] flex-col items-center">
                <Image
                  className="mt-5"
                  alt="user-profile"
                  src={image1}
                  style={{
                    height: "200px",
                    width: "150px",
                    borderRadius: "50%",
                  }}
                />
                <div className="mt-1 flex items-center">
                  <h1 className="text-lg font-bold text-white">Neha Sharma</h1>
                  <VerifiedIcon
                    className="ml-2"
                    fontSize="small"
                    color="warning"
                  />
                </div>
                <h1 className="text-[15px] font-semibold text-white opacity-90">
                  June 23 2001
                </h1>
              </div>
              <div className="mt-5 flex  h-[30%] w-[100%] items-center justify-around px-5">
                <h1 className="text-center text-lg font-extrabold text-white">
                  14
                  <br />
                  <span>Engaged</span>
                </h1>
                <div className="h-[40%] w-[2px] bg-white"></div>
                <h1 className="text-center text-lg font-extrabold text-white">
                  14
                  <br />
                  <span>Followers</span>
                </h1>
                <div className="h-[40%] w-[2px] bg-white"></div>
                <h1 className="text-center text-lg font-extrabold text-white">
                  14
                  <br />
                  <span>Following</span>
                </h1>
              </div>
            </div>
          </Grid>
          <Grid item className="flex h-[70%] flex-col items-center" xs={12}>
            <div className="relative top-[-2%] flex h-[60px] w-[45%] items-center justify-around rounded-lg border-2 border-white bg-[#ffc000] shadow-md">
              <TwitterIcon sx={{ color: "white" }} fontSize="medium" />
              <FacebookIcon sx={{ color: "white" }} fontSize="medium" />
              <InstagramIcon sx={{ color: "white" }} fontSize="medium" />
              <GoogleIcon sx={{ color: "white" }} fontSize="medium" />
            </div>
            <div className="relative top-[-5%] h-[40%] w-[80%] xs:mt-5">
              {dummyData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-[60px] items-center justify-center mt-5"
                  >
                    <DoneIcon
                      sx={{ color: "#ffc000", fontWeight: 900 }}
                      fontSize="large"
                      className="mx-5"
                    />
                    <div className="flex flex-col mx-5">
                      <h1 className="text-md font-black">
                        Hitest Joshi donated INR 2,100
                      </h1>
                      <h2 className="text-center text-sm opacity-50">
                        15 February 2023
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
            <h1 className="text-center text-xl font-extrabold text-[#ffc000] mb-10">There is something to gain when you give!</h1>
          </Grid>
        </Grid>
        <Grid container item xs={12} lg={6}>
          <Grid
            item
            xs={12}
            className="flex h-[60vh] items-center  justify-center bg-[#5600e3]"
          >
            <Image
              style={{
                height: "350px",
                width: "350px",
                borderRadius: "50%",
              }}
              alt="vector-person"
              src={image1}
            ></Image>
          </Grid>
          <Grid container item xs={12}>
            <Grid className="my-5" xs={12} item>
              <h1 className="text-center text-2xl font-black">
                Share Your <span className="text-[#5600e3]">Location</span>
              </h1>
            </Grid>
            <Grid
              xs={12}
              className="my-5 flex items-center justify-center"
              item
            >
              <input
                className=" h-[40px] w-[80%] border-2 border-blue-300 px-2"
                type="text"
                placeholder="Write address here"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <MyLocationIcon
                fontSize="large"
                className="mx-3"
                color="warning"
              />
            </Grid>
            <Grid className="w-full" item sm={12}>
              <div className="my-5 flex items-center justify-center">
                <button
                onClick={onClickNext}
                  className={`w-[40%] rounded-3xl ${
                   lat && long && address.length > 0 ? "bg-[#f7a212]" : "bg-[#f8c165]"
                  } my-8 py-4 text-white`}
                >
                  Next
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VolunteerLocationPage;
