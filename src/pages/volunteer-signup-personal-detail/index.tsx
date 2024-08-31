import { NextPage } from "next";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import { useRouter } from "next/router";
import VolunteerPersonalDetailCard from "../../components/common/VolunteerPersonalDetailCard";
import { useEffect, useRef, useState } from "react";
import { EMPTY_STRING } from "../../constants/constants";
import { OTPPayloadRespone, SignUpVerifyResponse, postVolunteerInfo, verifySignupOTP, volunteerInfo } from "../../utils/apis/auth/Volunteer";
import { useMutation } from "react-query";
import { ErrorType } from "../../services/types/models";
import Loader from "../../components/Loader";

const VolunteerAuthPagePersonalDetail: NextPage = () => {
  const [name, setName] = useState<string>(EMPTY_STRING);
  const [langs, setLangs] = useState<string[]>([]);
  const [lang, setLang] = useState<string>(EMPTY_STRING);
  const [err, setErr] = useState<string>(EMPTY_STRING);
  const router = useRouter();

   //React Query API call for volunteer signup-verify
   const {
    mutate: postData,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation(postVolunteerInfo, {
    //side effects if the req is successful
    onSuccess: (data: OTPPayloadRespone) => {
      if (data.success) {
        alert(data.data);
        router.push("/volunteer-passion");
      }
    },
    //side effects if the req fails
    onError: (error: ErrorType) => {
      setErr(error.error);
    },
  });

  function sendOTP() {
      const reqBody: volunteerInfo = {
        name: name,
        languageKnown: langs,
      };
      postData(reqBody);
    }

  const addLang = () => {
    setLangs([...langs, lang]);
    setLang(EMPTY_STRING);
  };

  const removeItem = (item1:string) => { 
    const arr = langs.filter(item => item !== item1);
    
    setLangs(arr);
  };
  

  return (
    <VolunteerAuthLayout>
      <VolunteerPersonalDetailCard
        onSendOTP={sendOTP}
        title="Personal Detail"
        subtitle="We would like to know more about you!"
        othertext="Already have an account ?"
        otherLinkText="Sign in"
        otherLinkPath="/volunteer-login"
        setName={setName}
        setLang={setLang}
        onEnter={addLang}
        langsAdded={langs}
        removeItem={removeItem}
      />
      <Loader isLoading={isLoading}/>
    </VolunteerAuthLayout>
  );
};

export default VolunteerAuthPagePersonalDetail;