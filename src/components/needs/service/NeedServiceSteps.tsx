import Done from "@mui/icons-material/Done";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import type {
  NeedServiceQuestion,
  NeedServiceSubQuestion,
  ProfileData,
} from "../../../services/types/needs";
import { updateNeed } from "../../../utils/apis/needs/Index";
import NeedStepQuestion from "./NeedStepQuestion";

function NeedServiceSteps(props: {
  needId: string;
  profile: ProfileData;
  questions: NeedServiceQuestion[];
  populatedValues: { [key: string]: any };
  handleIsFeatureChecked: (isChecked: boolean) => void;
  isEdit?: boolean;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState<{
    show: boolean;
    msg: string;
    severity: "error" | "info" | "warning" | "success";
  }>({
    show: false,
    msg: "",
    severity: "info",
  });
  const [formData, setFormData] = useState<{ [key: string]: any }>(
    props.populatedValues
  );
  const router = useRouter();

  const showMessage = useCallback(
    (message: string, severity: "success" | "error") => {
      setMessage({
        show: true,
        severity: severity,
        msg: message,
      });
    },
    []
  );

  const handleMessageClose = useCallback(() => {
    setMessage((prev) => ({ ...prev, show: false }));
  }, []);

  const handleFormDataChange = useCallback(
    (key: string, value: any) => {
      if (key === "isFeatured") {
        props.handleIsFeatureChecked(value);
      }
      setFormData((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    },
    [props]
  );

  const { mutate, isLoading, isSuccess } = useMutation(
    updateNeed(props.isEdit ? "PUT" : "POST"),
    {
      onError(error) {
        showMessage(error + "", "error");
      },
      onSuccess(data) {
        showMessage(data + "", "success");
        setTimeout(() => {
          router.push({
            pathname: "/ngobackend/created-need",
            query: {
              isPending: true,
            },
          });
        }, 2000);
      },
    }
  );

  const validateField = (
    question: NeedServiceQuestion | NeedServiceSubQuestion,
    data?: any
  ): boolean => {
    if (
      question.inputType == "textarea" &&
      question.maxLength &&
      question.minLength
    ) {
      // words
      const noWords = data?.split(" ").length;
      if (noWords < question.minLength || noWords > question.maxLength) {
        return false;
      }
    }

    if (question.isRequired && question.isQuestion) {
      return data !== null && data !== "" && data !== undefined;
    }

    return true;
  };

  const currentQuestion = props.questions[currentStep - 1];
  const didGotValidResponse =
    currentQuestion &&
    validateField(currentQuestion, formData[currentQuestion.key]) &&
    currentQuestion.subQuestions.every((subquestion) =>
      validateField(subquestion, formData[subquestion.key])
    );

  const handleContinue = () => {
    setCurrentStep((prev) => (prev < props.questions.length ? prev + 1 : prev));
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const submitForm = () => {
    const payload: { [key: string]: any } = {
      ...formData,
      needId: props.needId,
      gigId: props.needId,
    };
    mutate(payload);
  };

  console.log(formData, currentQuestion);

  return (
    <div className="mt-3 px-4 py-8 sm:mt-12 sm:px-12">
      <div>
        <ol className="flex flex-wrap justify-center gap-6 border-t-0 border-gray-300 px-4 sm:flex-nowrap sm:justify-between sm:border-t sm:px-0">
          {props.questions.map((question, i) => (
            <StepTitleComponent
              visited={i + 1 < currentStep}
              active={i + 1 == currentStep}
              key={question.title}
              title={question.stepTitle}
            />
          ))}
        </ol>
      </div>
      {currentQuestion && (
        <NeedStepQuestion
          onPrompt={showMessage}
          formData={formData}
          profile={props.profile}
          question={currentQuestion}
          onFormDataChange={handleFormDataChange}
        />
      )}
      <div className="mt-8 flex justify-center gap-4 text-xs sm:text-sm">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="w-28 rounded bg-transparent  px-4  py-2 text-gray-400"
          >
            Back
          </button>
        )}
        {currentStep < props.questions.length && (
          <button
            onClick={handleContinue}
            disabled={!didGotValidResponse}
            className="w-28 rounded border border-qause-blue bg-transparent px-4 py-3 text-qause-blue disabled:border-gray-400  disabled:text-gray-400 "
          >
            Continue
          </button>
        )}
        {currentStep == props.questions.length && (
          <button
            disabled={isLoading || isSuccess || !didGotValidResponse}
            onClick={submitForm}
            className="rounded bg-[#0020D1] px-6 py-3 font-bold text-white disabled:bg-slate-500"
          >
            {props.isEdit ? "Update Need Card" : "Create My Need Card Now!"}
          </button>
        )}
      </div>
      <Snackbar
        open={message.show}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert
          onClose={handleMessageClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

function StepTitleComponent(props: {
  title: string;
  active: boolean;
  visited: boolean;
}) {
  return (
    <li>
      <div className="flex-start flex items-center justify-center pt-0 sm:block">
        <div
          className={`${props.visited && "opacity-60"} ${
            props.active || props.visited
              ? "bg-blue-800"
              : "border  border-gray-300 bg-[#f7a212] opacity-60 sm:bg-white sm:opacity-100"
          } flex h-10 w-10 items-center justify-center rounded-full sm:-mt-3 sm:h-6 sm:w-6`}
        >
          {props.active || props.visited ? (
            <Done htmlColor="#FFFFFF" fontSize="small" />
          ) : (
            <p className="block text-center text-sm sm:hidden">{props.title}</p>
          )}
        </div>
        <p
          className={`mt-2 hidden text-center text-sm sm:block ${
            props.active ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {props.title}
        </p>
      </div>
    </li>
  );
}

export default NeedServiceSteps;
