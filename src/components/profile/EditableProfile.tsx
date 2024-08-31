import { Stack } from "@mui/material";
import { useState } from "react";
import TrashCan from "../../../public/images/profile/TrashCan.svg";
import UpdateButton from "../../../public/images/profile/updateButton.svg";
interface EditableProfileProps {
  onSubmit?: (name: string, description: string) => void;
  name?: string;
  description?: string;
}
const EditableProfile = (props: EditableProfileProps) => {
  const [name, setName] = useState(props.name || "John Doe");
  const [description, setDescription] = useState(
    props.description || "Loren Ipsum"
  );
  return (
    <Stack direction="row">
      <div>
        <div
          className="me-5 inline-block rounded-full bg-[#9c9b9b]"
          style={{ width: "120px", height: "120px" }}
        ></div>
        <div className="flex items-center">
          <UpdateButton />
          <div className="relative inline-block">
            <TrashCan />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="font-inter left-1 ml-[-30px] h-8 w-16 -translate-x-full transform bg-transparent text-center text-base font-medium leading-[110%] text-black outline-none focus:outline-none"
                onClick={() =>
                  props.onSubmit && props.onSubmit(name, description)
                }
              >
                {" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label htmlFor="name"></label>
        <p>
          <input
            id="name"
            placeholder={props.name || "John Doe"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 border-2"
          />
          <label htmlFor="description"></label>
        </p>
        <p>
          <input
            id="description"
            placeholder={props.description || "Loren Ipsum"}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 border-2"
          />
        </p>
      </div>
    </Stack>
  );
};

export default EditableProfile;
