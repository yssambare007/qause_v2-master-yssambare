const InterestPage = () => {
  return (
    <div className="flex w-full flex-col gap-7">
      <h3 className="text-2xl font-bold">Interest</h3>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          {[
            "Magician",
            "Musician",
            "Dancer",
            "Actor",
            "Singer",
            "Artist",
            "Writer",
            "Photographer",
            "Graphic Designer",
            "Animator",
            "Illustrator",
            "Other",
          ].map((interest) => (
            <span
              className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm"
              key={interest}
            >
              {interest}

              <button className="h-6 w-6 rounded-full bg-gray-400">X</button>
            </span>
          ))}
        </div>

        <button className="w-fit rounded-lg border border-[#253dc0] px-6 py-1 text-sm text-[#253dc0]">
          Add More Interest
        </button>

        <button className="w-fit rounded-md bg-[#f7a212] px-4 py-2 text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default InterestPage;
