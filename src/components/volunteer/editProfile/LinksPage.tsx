const LinksPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Links</h3>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h6 className="font-bold">Portfolio Links</h6>
          <button className="w-fit rounded-lg border border-[#253dc0] px-6 py-1 text-[#253dc0]">
            Add Links
          </button>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h6 className="font-bold">Portfolio Links</h6>
          <div className="flex w-full flex-col gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-3"
                key={item}
              >
                <label className="text-gray-500" htmlFor="instagram">
                  Instagram
                </label>
                <input
                  placeholder="https://www.instagram.com/"
                  type="text"
                  id="instagram"
                  className="w-full px-3 py-1 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="w-fit rounded-md bg-[#f7a212] px-4 py-2 text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default LinksPage;
