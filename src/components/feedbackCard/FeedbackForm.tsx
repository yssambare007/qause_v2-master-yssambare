import React, { useCallback, useState } from "react";
import { Delete, Image, Add as AddIcon } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import type { NgoFeedback } from "../../services/types/feedback";

function FeedbackForm(props: {
  isLoading: boolean;
  onBack: () => void;
  onSubmit: (response: NgoFeedback) => void;
  type: "singleColumn" | "twoColumn";
}) {
  const [feedback, setFeedback] = useState<NgoFeedback>({
    whatDidLike: [],
    ratting: 0,
  });

  const handleSubmit = () => {
    if (feedback.photo && feedback.whatDidLike?.length != 0) {
      props.onSubmit(feedback);
    } else {
      alert("Please fill all fields");
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const image = (target?.files && target.files[0]) || null;
    if (image != null) {
      setFeedback((prev) => ({ ...prev, photo: image }));
    }
  };

  const handleDeleteFile = useCallback(() => {
    setFeedback((prev) => ({ ...prev, photo: undefined }));
  }, []);

  const handleWhatDidLike = (e: React.ChangeEvent<HTMLInputElement>) => {
    let whatDidLike = feedback.whatDidLike || [];
    if (e.target.checked) {
      whatDidLike = [...whatDidLike, e.target.value];
    } else {
      whatDidLike = whatDidLike.filter((option) => option !== e.target.value);
    }
    setFeedback((prev) => ({
      ...prev,
      whatDidLike: whatDidLike,
    }));
  };

  const handleRating = useCallback((_: any, rating: number | null) => {
    setFeedback((prev) => ({ ...prev, ratting: rating || 0 }));
  }, []);

  return (
    <div className="px-8 py-10">
      {[
        {
          question:
            "How would you rate your work experience with the volunteer ?",
          component: (
            <div className="flex w-full justify-center">
              <Rating
                sx={{
                  fontSize: "3rem",
                }}
                name="simple-controlled"
                value={feedback.ratting}
                onChange={handleRating}
              />
            </div>
          ),
        },
        {
          question: "What did you like?",
          component: (
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Response Time",
                "Quality of work",
                "Dedication",
                "Communication Skills",
                "Behaviour",
              ].map((option) => (
                <div className="h-12" key={option}>
                  <input
                    id={option}
                    type="checkbox"
                    name="radiobtns"
                    value={option}
                    className="peer hidden"
                    onChange={handleWhatDidLike}
                    checked={feedback.whatDidLike?.includes(option)}
                    required={true}
                  />
                  <label
                    htmlFor={option}
                    className="cursor-pointer rounded-md border  border-gray-500 bg-white px-3 py-2 text-sm font-extrabold text-gray-500 peer-checked:border-none peer-checked:bg-[#f4ad00] peer-checked:text-white "
                  >
                    {option}
                  </label>
                </div>
              ))}{" "}
            </div>
          ),
        },
        {
          question: `"#dummy content" please share the photo`,
          component: (
            <div className="flex gap-1">
              {feedback.photo && (
                <div className="flex  max-w-[50%] items-center gap-1 rounded border border-gray-300 p-2 text-center text-sm text-qause-blue-dark">
                  <Image className="!text-qause-blue-dark" fontSize="small" />
                  <div className="flex flex-wrap justify-center overflow-hidden text-qause-blue-dark">
                    <div className="truncate">{feedback.photo.name}</div>
                    <div>
                      ({Math.round(feedback.photo.size / 1024)}
                      kb)
                    </div>
                  </div>
                  <IconButton onClick={handleDeleteFile}>
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              )}
              <div className="flex-grow">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="inputBox"
                />

                <label
                  htmlFor="inputBox"
                  className={`mx-auto flex cursor-pointer flex-col items-center rounded border-2 border-dashed border-gray-300 bg-[#f5f6f7] ${
                    feedback.photo
                      ? "w-full p-2 text-[8px]"
                      : "w-fit p-6 text-sm"
                  }`}
                >
                  <AddIcon
                    sx={{
                      mr: "5px",
                      fontSize: feedback.photo ? "1rem" : "3rem",
                      mt: "4px",
                    }}
                  />
                  <div className="text-center text-gray-400">
                    Drag a File here or{" "}
                    <span className="text-blue-500">browse</span> for a file to
                    upload
                  </div>
                </label>
              </div>
            </div>
          ),
        },
      ].map((field) => (
        <div
          key={field.question}
          className={`grid ${
            props.type === "twoColumn"
              ? "mb-10 grid-cols-1 sm:mb-20 sm:grid-cols-2 "
              : "mb-10 grid-cols-1 gap-8 text-center"
          } items-center`}
        >
          <div className="text-base font-extrabold text-qause-blue-dark ">
            {field.question}
          </div>
          <div>{field.component}</div>
        </div>
      ))}

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={props.onBack}
          className="bg-white px-4 py-2 text-sm font-bold "
        >
          Back
        </button>
        <button
          disabled={props.isLoading}
          className="rounded-lg bg-qause-blue px-4 py-3 text-lg font-bold text-white"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;
