import Image from "next/image";

const InfoPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Personal Settings</h3>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-5">
          <Image
            src="https://qauseuat.s3.ap-south-1.amazonaws.com/templates/E012/woman-verified.png"
            alt="avatar"
            width={100}
            height={100}
          />

          <button className="rounded-md bg-[#253dc0] px-6 py-1 text-white">
            Select Image
          </button>
          <button className="rounded-md bg-[#253dc0] px-6 py-1 text-white">
            Upload
          </button>
          <button className="rounded-md bg-[#253dc0] px-6 py-1 text-white">
            Delete
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="rounded-md border border-gray-400 px-4 py-2 outline-none"
              type="text"
              placeholder="John Doe"
              id="name"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name">Name</label>
            <select
              className="rounded-md border border-gray-400 px-4 py-2 outline-none"
              id="name"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="rounded-md border border-gray-400 px-4 py-2 outline-none"
              type="date"
              placeholder="John Doe"
              id="name"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <h6>Languages</h6>
          <div className="flex flex-col gap-3">
            <input
              className="w-96 rounded-md border border-gray-400 px-4 py-2 outline-none"
              type="text"
              placeholder="Add language"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
