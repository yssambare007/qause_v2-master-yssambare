import React, { useState } from "react";
import { EMPTY_STRING } from "../../constants/constants";
interface EditableBioProps {
  onSubmit?: (bio: string) => void;
  bio: string;
}
const EditableBio = (props: EditableBioProps) => {
  const [bio, setBio] = useState(EMPTY_STRING);
  return (
    <>
      <div className="h-full">
        <p className="my-5 font-extrabold">Bio</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder={props.bio ? props.bio : "Your bio goes here..."}
          className="h-[130px] w-full p-1"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            props.onSubmit && props.onSubmit(bio);
          }}
          className="my-5 flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] font-bold text-white"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditableBio;
