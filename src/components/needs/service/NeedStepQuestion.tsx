import {
  NeedServiceQuestion,
  NeedServiceSubQuestion,
  ProfileData,
} from "../../../services/types/needs";
import {
  getImageUrlForS3Bucket,
  getPopulatePathValueFromProfile,
} from "../../../utils/utils";
import NeedInputWrapper from "./NeedInputWrapper";

function NeedStepQuestion(props: {
  profile: ProfileData;
  question: NeedServiceQuestion;
  formData: { [key: string]: any };
  onPrompt: (message: string, severity: "success" | "error") => void;
  onFormDataChange: (key: string, value: any) => void;
}) {
  return (
    <div className="my-8 flex flex-col items-center text-center sm:my-16 sm:mb-8">
      {props.question.isPopulate &&
        props.question.populatePath.includes("images") && (
          <img
            src={getImageUrlForS3Bucket(
              props.profile._id,
              getPopulatePathValueFromProfile(
                props.profile,
                props.question.populatePath
              )
            )}
            className="h-56 w-80 border border-gray-300 object-contain"
          />
        )}
      {Boolean(props.question.title) && (
        <div className="my-10 text-2xl font-bold text-[#1B3763]">
          {props.question.title}
          {props.question.isRequired && <span className="text-red-600">*</span>}
        </div>
      )}

      {props.question.isQuestion && (
        <NeedInputWrapper
          onPrompt={props.onPrompt}
          isSubQuestion={false}
          formData={props.formData[props.question.key]}
          question={props.question}
          onChange={props.onFormDataChange}
        />
      )}

      {props.question.subQuestions.map((subquestion, i) => (
        <NeedStepSubQuestion
          onPrompt={props.onPrompt}
          key={subquestion.title}
          parentQuestionKey={props.question.key}
          formData={props.formData}
          question={subquestion}
          onChange={props.onFormDataChange}
        />
      ))}
    </div>
  );
}

function NeedStepSubQuestion(props: {
  parentQuestionKey: string;
  formData: any;
  question: NeedServiceSubQuestion;
  onPrompt: (message: string, severity: "success" | "error") => void;
  onChange: (key: string, value: any) => void;
}) {
  const isConditionMatching = (parentAnswer?: any) => {
    if (parentAnswer == null) return false;

    if (props.question.mutli) {
      return parentAnswer.includes(
        props.question.condition[props.parentQuestionKey]
      );
    } else {
      return parentAnswer === props.question.condition[props.parentQuestionKey];
    }
  };

  if (
    Object.keys(props.question.condition || {}).length != 0 &&
    !isConditionMatching(props.formData[props.parentQuestionKey])
  ) {
    return <div></div>;
  }

  return (
    <div className="my-4 mt-10 flex w-full flex-col items-center">
      <div className="mb-4 text-lg font-bold text-[#1B3763]">
        {props.question.title}
        {props.question.isRequired && <span className="text-red-600">*</span>}
      </div>
      {props.question.note && (
        <div className="mb-3 text-sm text-[#d17c08]">
          Note:- {props.question.note}
        </div>
      )}
      <NeedInputWrapper
        onPrompt={props.onPrompt}
        isSubQuestion={true}
        formData={props.formData[props.question.key]}
        question={props.question}
        onChange={props.onChange}
      />
    </div>
  );
}

/**
 * Input components
 */

export default NeedStepQuestion;
