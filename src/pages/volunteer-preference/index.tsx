import { NextPage } from "next";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import { useRouter } from "next/router";
import Signup from "../ngo-signup";
import VolunteerPreferenceCard from "../../components/common/VolunteerPreferenceCard";
import { useState } from "react";
import { EMPTY_STRING } from "../../constants/constants";

const VolunteerAuthPagePreference: NextPage = () => {
  const router = useRouter();

  const handleChange = (item:string) => {
    localStorage.setItem("pref", item);
  };

  const sendOTP = () => {
    router.push("/volunteer-location");
  };

  

  return (
    <VolunteerAuthLayout isText={true} text={`"Volunteers don't get paid, not because they're worthless, but because they're priceless."`}>
      <VolunteerPreferenceCard
        onSendOTP={sendOTP}
        title={`Do you prefer :`}
        isRadioButton={true}
        setPref={handleChange}
      />
    </VolunteerAuthLayout>
  );
};

export default VolunteerAuthPagePreference;
