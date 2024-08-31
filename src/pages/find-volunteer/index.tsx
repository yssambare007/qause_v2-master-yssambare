import { NextPage } from "next";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import { useRouter } from "next/router";
import VolunteerPreferenceCard from "../../components/common/VolunteerPreferenceCard";

const VolunteerAuthPageFind: NextPage = () => {
  const router = useRouter();
  const sendOTP = () => {
    router.push("/profile");
  };

  return (
    <VolunteerAuthLayout
      isText={true}
      text={`"The only people with whom you should try to get even are the one who have helped you."`}
    >
      <VolunteerPreferenceCard
        onSendOTP={sendOTP}
        title={`Finding volunteer <br/> suited <br/> to your skills.`}
        setPref={() => {}}
      />
    </VolunteerAuthLayout>
  );
};

export default VolunteerAuthPageFind;
