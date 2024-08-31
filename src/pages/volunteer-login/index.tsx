import { type NextPage } from "next";
// import { useMutation } from "react-query";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import VolunteerAuthCard from "../../components/common/VolunteerAuthCard";
import { requestLoginOTP } from "../../utils/apis/auth/Volunteer";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../components/Loader";
import ResponseModal from "../../components/common/ResponseModal";
import { log } from "console";
const VolunteerAuthPage: NextPage = () => {
  const router = useRouter();
  const [response, setResponse] = useState<string>("");
  const [responseModal, setResponseModal] = useState(false);

  const { mutate: login, isLoading } = useMutation(requestLoginOTP, {
    onSuccess: (data, variables) => {
      if (data.success) {
        console.log("Routing to verify");
        router.push("volunteer-login-verify");
      } else {
        setResponse(data.error);
        setResponseModal(true);
      }
    },
  });

  const googleLogin = async (token: string) => {
    console.log("ruunnn");

    try {
      const data = await fetch(
        "https://qause.co/api/v2/volunteer/oauth/login-verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );
      const res = await data.json();

      if (res.success === true) {
        router.push("/profile");
      } else {
        throw res;
      }
    } catch (err: any) {
      alert(err.error);
    }
  };

  function sendOTP(payload: any) {
    // set mobile number or email in localStorage for verifying OTP
    if (payload.mobile) {
      localStorage.setItem("mobile", payload.mobile);
    } else {
      localStorage.setItem("email", payload.email);
    }
    login(payload);
  }

  return (
    <VolunteerAuthLayout>
      <VolunteerAuthCard
        googleLogin={googleLogin}
        onSendOTP={sendOTP}
        title="Login to Qause"
        subtitle="Create your profile on Qause as a volunteer & connect with changemakers around the world!"
        othertext="New to Qause ?"
        otherLinkText="Sign up"
        otherLinkPath="/volunteer-signup"
      />
      <Loader isLoading={isLoading} />
      <ResponseModal
        open={responseModal}
        title={response}
        handleClose={() => setResponseModal(!responseModal)}
      ></ResponseModal>
    </VolunteerAuthLayout>
  );
};

export default VolunteerAuthPage;
