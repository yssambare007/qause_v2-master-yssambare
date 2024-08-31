import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Step1 from "../../components/signUpSteps/Step1";
import Step2 from "../../components/signUpSteps/Step2";
import Step3 from "../../components/signUpSteps/Step3";
import Step4 from "../../components/signUpSteps/Step4";
import ThankYouModal from "../../components/thankYouPopUp/ThankYouPopup";
import { getCurrentProfile } from "../../utils/apis/profile/Index";
import { base_url } from "../../utils/utils";

function Index() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [thankyou, setThankYou] = useState(false);

  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    mobile: string;
  }>();

  const [step1Content, setStep1Content] = useState({
    categories: [],
    facility: [],
    picture: "",
    croppedFile: "",
  });
  const [step2Content, setStep2Content] = useState({
    email: "",
    phoneNumber: "",
    year: null,
    key: "",
    socialMedia: {
      instagram: "",
      youtube: "",
      facebook: "",
    },
  });
  const [step3Content, setStep3Content] = useState({
    name: "",
    picture: "",
    journey: "",
    croppedFile: "",
  });
  const [step4Content, setStep4Content] = useState({
    picture: "",
    croppedFile: "",
    journey: "",
  });
  const setStep1Data = (obj: any) => {
    setStep1Content(obj);
  };
  const setStep2Data = (obj: any) => {
    setStep2Content(obj);
  };
  const setStep3Data = (obj: any) => {
    setStep3Content(obj);
  };
  const setStep4Data = (obj: any) => {
    setStep4Content(obj);
  };
  useEffect(() => {
    // if (!token) router.push("/ngo-login");
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUserData({
        name: user?.name ?? "",
        email: user?.email ?? "",
        mobile: user?.phoneNo ?? "",
      });
      setStep2Content((prev) => ({
        ...prev,
        email: user?.email ?? "",
        phoneNumber: user?.phoneNo ?? "",
      }));
      setStep3Content((prev) => ({
        ...prev,
        name: user?.name ?? "",
      }));
    } else {
      getCurrentProfile().then((user) => {
        setUserData({
          name: user?.name ?? "",
          email: user?.email ?? "",
          mobile: user?.phoneNo ?? "",
        });
        setStep2Content((prev) => ({
          ...prev,
          email: user?.email ?? "",
          phoneNumber: user?.mobile ?? "",
        }));
        setStep3Content((prev) => ({
          ...prev,
          name: user?.name ?? "",
        }));
      });
    }
  }, [router]);

  const changeStep = async (s: number) => {
    if (s !== 5) {
      setStep(s);
    } else {
      setTimeout(async () => {
        const cat: any = step1Content.categories[0];

        const formData = new FormData();
        formData.append("founderBio", step3Content.journey);
        formData.append("foundingYear", step2Content.year!);
        formData.append("founderName", step3Content.name);
        formData.append("story", step4Content.journey);
        formData.append("category", cat);
        formData.append("subCategories", cat);
        formData.append("logo", step1Content.croppedFile);
        formData.append("founderImage", step3Content.croppedFile);
        formData.append("coverImage", step4Content.croppedFile);
        const data2 = await fetch(`${base_url}ngo/details`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `${localStorage.getItem("TOKEN")}`,
          },
        });
        console.log(step4Content.journey);
        const data1 = await data2.json();
        console.log(data1);
        setThankYou(true);
      }, 400);
    }
  };
  return (
    <>
      <div>
        {step === 1 && (
          <Step1
            userData={userData}
            onChangeStep={changeStep}
            sendStep1Data={setStep1Data}
            step1Info={step1Content}
          />
        )}
        {step === 2 && (
          <Step2
            onChangeStep={changeStep}
            sendStep2Data={setStep2Data}
            step2Info={step2Content}
          />
        )}
        {step === 3 && (
          <Step3
            onChangeStep={changeStep}
            sendStep3Data={setStep3Data}
            step3Info={step3Content}
          />
        )}
        {step === 4 && (
          <Step4
            onChangeStep={changeStep}
            step4Info={step4Content}
            sendStep4Data={setStep4Data}
          />
        )}
      </div>

      <ThankYouModal visible={thankyou} />
    </>
  );
}

export default Index;
