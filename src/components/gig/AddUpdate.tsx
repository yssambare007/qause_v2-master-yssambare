import React from "react";

//Icons
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface InputProps {
  remark: string;
  isPrivate: boolean;
  file: string;
}

interface AddUpdateProps {
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  input: InputProps;
  sendUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddUpdate = ({ handleInput, input, sendUpdate }: AddUpdateProps) => {
  return (
    <form onSubmit={sendUpdate} className="flex flex-col gap-4">
      <textarea
        onChange={handleInput}
        value={input.remark}
        className="rounded-lg border border-gray-500 p-4 outline-none focus:shadow-xl"
        placeholder="Add here..."
        name="remark"
        id="fundraising"
        rows={4}
      />
      <div className="flex w-full flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex w-full items-center justify-between px-3 lg:justify-start lg:gap-3 lg:px-0">
          <input
            onChange={handleInput}
            checked={input.isPrivate}
            value=""
            name="isPrivate"
            className="h-5 w-5"
            type="checkbox"
            id="isPrivate"
          />
          <label htmlFor="isPrivate">Make as a Private</label>
          <ContactSupportIcon />
        </div>

        <div className="flex w-full items-center justify-between px-3 lg:justify-end lg:gap-3 lg:px-0">
          <input
            onChange={handleInput}
            id="upload_file"
            className="hidden"
            name="upload_file"
            type="file"
          />
          <button type="button">
            <label htmlFor="upload_file">
              <AttachFileIcon />
              <span className="sr-only">Attach File</span>
            </label>
          </button>
          <button
            className={`rounded-lg bg-[#0020D1] px-8 py-2 text-lg text-white opacity-60`}
          >
            Add Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddUpdate;
