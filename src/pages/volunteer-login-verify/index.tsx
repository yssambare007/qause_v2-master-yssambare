import React, { useState } from 'react';
import VolunteerVerifyCard from '../../components/common/VolunteerVeirfyCard';
import VolunteerAuthLayout from '../../components/layouts/volunteerAuth/Index';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { PayloadWithOTP, verifyLoginOTP } from "../../utils/apis/auth/Volunteer";
import VolunteerVeirfyCard from '../../components/common/VolunteerVeirfyCard';
import { EMPTY_STRING } from '../../constants/constants';
const VolunteerLoginVerify: NextPage = () => {
  const [err, setErr] = useState<string>(EMPTY_STRING);
    const router = useRouter();
    const { mutate: verify } = useMutation(verifyLoginOTP, {
        onSuccess: (data: any, variables: any) => {
          console.log("data", data);
          console.log("variables", variables);
          if(data.success === true) {
            localStorage.setItem('TOKEN', data.data.token);
            localStorage.setItem("USER", data?.data?.user?.username)
            router.push('/profile');
          } else{
            // alert(data.data);
            setErr(data.data);
          }
        },
    });
    const verifyOTP = (payload: any) => {
      setErr(EMPTY_STRING);
        let verifyOTPPayload: PayloadWithOTP | null = null;
        if(localStorage.getItem('mobile') !== null) {
          console.log('Found mobile in localStorage, with value', localStorage.getItem('mobile'));
          verifyOTPPayload = {
            mobile: localStorage.getItem('mobile'),
            otp: payload,
          };
        } else if(localStorage.getItem('email') !== undefined) {
          verifyOTPPayload = {
            email: localStorage.getItem('email'),
            otp: payload,
          };
        }
        if(verifyOTPPayload){
          console.log("Verify OTP Payload is", verifyOTPPayload);
          verify(verifyOTPPayload);
        } else {
          console.error('Invalid payload, Neither email nor mobile found');
        }
    };
    return (
        <VolunteerAuthLayout>
          <VolunteerVeirfyCard
            onSendOTP={verifyOTP}
            title="Welcome to Qause"
            subtitle="Let your passion serve the cause"
            othertext="Already have an account ?"
            otherLinkText="Sign in"
            otherLinkPath="/volunteer-login"
            error={err}
          />
        </VolunteerAuthLayout>
      );
};

export default VolunteerLoginVerify;