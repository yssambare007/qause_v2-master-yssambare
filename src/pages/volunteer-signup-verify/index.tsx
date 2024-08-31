import { NextPage } from "next";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import { useRouter } from "next/router";
import VolunteerVerifyCard from "../../components/common/VolunteerVeirfyCard";
import { useMutation } from "react-query";
import {
  SignUpVerifyResponse,
  verifySignupOTP,
} from "../../utils/apis/auth/Volunteer";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { ErrorType, volunteerSignUpPayload } from "../../services/types/models";
import { EMAIL, EMPTY_STRING, HAVE_AN_ACC, MOBILE, ROUTE_SIGNUP_PERSONAL_DETAIL, ROUTE_VOLUNTEER_LOGIN, SIGNUP_VERIFY_SUBTITLE, SIGN_IN, TOKEN, WELCOME } from "../../constants/constants";

const VolunteerAuthPageVerify: NextPage = () => {
  //state for setting error
  const [err, setErr] = useState<string>("");
  const router = useRouter();

  //React Query API call for volunteer signup-verify
  const {
    mutate: registerVerify,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation(verifySignupOTP, {
    //side effects if the req is successful
    onSuccess: (data: SignUpVerifyResponse) => {
      if (data.success) {
        localStorage.setItem(TOKEN, data.data.token);
        router.push(ROUTE_SIGNUP_PERSONAL_DETAIL, undefined, {shallow:true});
      }
      localStorage.removeItem(EMAIL);
      localStorage.removeItem(MOBILE);
    },
    //side effects if the req fails
    onError: (error: ErrorType) => {
      setErr(error.error);
    },
  });

  //Function which runs on clicking verify
  function sendOTP(payload: string) {
    if( localStorage.getItem(MOBILE) !== null){
      const reqBody: volunteerSignUpPayload = {
        mobile: localStorage.getItem(MOBILE),
        otp: payload,
      };
      registerVerify(reqBody);
    }
    else{
      if(localStorage.getItem(EMAIL)  !== null){
        const reqBody: volunteerSignUpPayload = {
          email: localStorage.getItem(EMAIL),
          otp: payload,
        };
        registerVerify(reqBody);
      }
    }
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

  return (
    <>
      <VolunteerAuthLayout>
        <VolunteerVerifyCard
          error={err}
          onSendOTP={sendOTP}
          title={WELCOME}
          subtitle={SIGNUP_VERIFY_SUBTITLE}
          othertext={HAVE_AN_ACC}
          otherLinkText={SIGN_IN}
          otherLinkPath={ROUTE_VOLUNTEER_LOGIN}
        />
      </VolunteerAuthLayout>
      <Loader isLoading={isLoading}/>
    </>
  );
};

export default VolunteerAuthPageVerify;
