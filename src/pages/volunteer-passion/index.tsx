import { NextPage } from "next";
import VolunteerAuthLayout from "../../components/layouts/volunteerAuth/Index";
import { useRouter } from "next/router";
import VolunteerPassionCard from "../../components/common/VolunteerPassionCard";
import { useState } from "react";
import { OTPPayloadRespone, postVolunteerInfo, postVolunteerPassions, volunteerInfo } from "../../utils/apis/auth/Volunteer";
import { useMutation } from "react-query";
import { ErrorType } from "../../services/types/models";
import Loader from "../../components/Loader";

const VolunteerAuthPagePassion: NextPage = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  
  const Data: string[] = [
    "NGO Improvement",
    "Content Services",
    "Service",
    "Social Media",
    "Graphic Designer",
    "IT department",
    "Teacher"
  ];
  const addItem = (passion:string) => {
    const isSelected = selectedItem.includes(passion);

    // Create a new array to hold the updated selected divs
    let updatedselectedItem;

    if (isSelected) {
      // If the div is already selected, remove it from the selectedItem array
      updatedselectedItem = selectedItem.filter((index) => index !== passion);
    } else {
      // If the div is not selected, add it to the selectedItem array
      updatedselectedItem = [...selectedItem, passion];
    }

    // Update the state with the new selectedItem array
    setSelectedItem(updatedselectedItem);
  };

  const {
    mutate: postData,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation(postVolunteerPassions, {
    //side effects if the req is successful
    onSuccess: (data: OTPPayloadRespone) => {
      if (data.success) {
        alert(data.data);
        router.push("/volunteer-preference");
  }
    },
    //side effects if the req fails
    onError: (error: ErrorType) => {
      alert(error.error);
    },
  });

  const onClickNext = () => {
    const reqBody = {
      passions: selectedItem
    };
    postData(reqBody);
  };
  return (
    <VolunteerAuthLayout isText={true} text={`"Volunteers do not necessarily have the time; they just have the heart."`}>
      <VolunteerPassionCard
      data={Data}
      selectedItem={selectedItem}
        onSendOTP={onClickNext}
        title={`Which Skill of yours <br/> would <br/> you like to volunteer in?`}
        addItem={addItem}
      />
          <Loader isLoading={isLoading}/>

    </VolunteerAuthLayout>
  );
};

export default VolunteerAuthPagePassion;
