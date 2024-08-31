import { useState } from "react";

const BioPage = () => {
  const [bio, setBio] = useState("");
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Bio</h3>
      <form className="flex w-full flex-col gap-4">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Your bio goes here"
          className="rounded-lg border border-gray-400 bg-white px-5 py-3 outline-none"
          rows={5}
        ></textarea>
        <button className="w-fit rounded-md bg-[#f7a212] px-4 py-2 text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default BioPage;
