const SettingsPage = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <h3 className="text-2xl font-bold">Account Settings</h3>
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email">Email</label>
          <div className="flex items-center gap-4">
            <input
              id="email"
              className="w-96 rounded-md border border-gray-400 px-4 py-2 outline-none"
              type="text"
              placeholder="xyz@gmail.com"
            />
            <button className="w-fit rounded-md bg-[#f7a212] px-4 py-2 text-white">
              Verify Otp
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email">Phone Number</label>
          <div className="flex items-center gap-4">
            <input
              className="w-96 rounded-md border border-gray-400 px-4 py-2 outline-none"
              type="text"
              placeholder="xyz@gmail.com"
            />
            <button className="w-fit rounded-md bg-[#f7a212] px-4 py-2 text-white">
              Verify Otp
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Address</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <input
                className=" rounded-md border border-gray-400 px-4 py-2 outline-none"
                type="text"
                placeholder="1234 Main Street"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Street</label>
              <input
                className=" rounded-md border border-gray-400 px-4 py-2 outline-none"
                type="text"
                placeholder="1234 Main Street"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">City</label>
              <input
                className=" rounded-md border border-gray-400 px-4 py-2 outline-none"
                type="text"
                placeholder="1234 Main Street"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">State</label>
              <input
                className=" rounded-md border border-gray-400 px-4 py-2 outline-none"
                type="text"
                placeholder="1234 Main Street"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Country</label>
              <input
                className=" rounded-md border border-gray-400 px-4 py-2 outline-none"
                type="text"
                placeholder="1234 Main Street"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Zip</label>
              <input
                className=" rounded-md border border-gray-400 px-4 py-2 outline-none"
                type="number"
                placeholder="1234 Main Street"
              />
            </div>
          </div>
        </div>

        <button className="w-fit rounded-md bg-[#f7a212] px-4 py-2 text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
