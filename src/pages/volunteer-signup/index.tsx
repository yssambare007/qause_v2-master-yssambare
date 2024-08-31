import { NextPage } from "next";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import VolunteerAuthCard from "../../components/common/VolunteerAuthCard";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  EMAIL,
  EMPTY_STRING,
  HAVE_AN_ACC,
  MOBILE,
  ROUTE_VOLUNTEER_LOGIN,
  ROUTE_VOLUNTEER_SIGNUP_VERIFY,
  SIGN_IN,
  SIGN_UP_QUASE,
} from "../../constants/constants";
import {
  ErrorType,
  signUpResponse,
  volunteerSignUpPayload,
} from "../../services/types/models";
import { requestSignupOTP } from "../../utils/apis/auth/Volunteer";

const VolunteerAuthPage: NextPage = () => {
  const router = useRouter();
  //State for setting error
  const [err, setErr] = useState<string>("");

  //React Query API call for register user.
  const {
    mutate: register,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation(requestSignupOTP, {
    //side effects if the req is successful
    onSuccess: (data: signUpResponse) => {
      if (data.success && !isLoading) {
        router.push(ROUTE_VOLUNTEER_SIGNUP_VERIFY, undefined, {
          shallow: true,
        });
      }
    },
    //side effects if the req fails
    onError: (error: ErrorType) => {
      setErr(error.error);
    },
  });

  //function which runs on clicking get otp which has payload with email or mobile.
  function sendOTP(payload: volunteerSignUpPayload) {
    if (payload.mobile) {
      localStorage.setItem(MOBILE, payload.mobile);
    } else if (payload.email) {
      localStorage.setItem(EMAIL, payload.email);
    }
    //API call using react query for registering user with email and otp.
    register(payload);
  }

  //function to auto close the error.
  const onClose = () => {
    setErr(EMPTY_STRING);
  };

  //only runs for the first time and when the isLoading changes.
  useEffect(() => {
    const alert = setTimeout(onClose, 5000);
    return () => {
      clearTimeout(alert);
    };
  }, [isLoading]);

  const googleLogin = async (token: string) => {
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

  return (
    <>
      <VolunteerAuthLayout>
        <VolunteerAuthCard
          googleLogin={googleLogin}
          error={err}
          onSendOTP={sendOTP}
          title={SIGN_UP_QUASE}
          othertext={HAVE_AN_ACC}
          otherLinkText={SIGN_IN}
          otherLinkPath={ROUTE_VOLUNTEER_LOGIN}
        />
      </VolunteerAuthLayout>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default VolunteerAuthPage;
// function requestSignupOTP(variables: void): Promise<signUpResponse> {
//   throw new Error("Function not implemented.");
// }
