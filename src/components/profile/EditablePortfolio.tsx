import React, { useEffect, useState } from "react";
import Cross from "../../../public/images/profile/Cross.svg";
import EditableBadge from "./EditableBadge";
import AddButton from "./AddButton";
interface EditablePortfolioProps {
  languages?: string[];
  interests?: string[];
  portfolioLinks?: string[];
  onSubmit: (languages: string[], interests: string[]) => void;
}
const EditablePortfolio = (props: EditablePortfolioProps) => {
  const [langs, setLangs] = useState<string[]>(["Hindi", "English"]);
  const [language, setLanguage] = useState("");
  const [ints, setInts] = useState<string[]>(["Graphic Design", "Content"]);
  const [interest, setInterest] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  });

  if (loaded) {
    const elem = document.getElementById("langs");
    elem?.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        setLangs([...langs, language]);
      }
    });
  }

  const removeItem = (item1: string) => {
    const arr = langs.filter((item) => item !== item1);
    setLangs(arr);
  };

  if (loaded) {
    const elem = document.getElementById("ints");
    elem?.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        setInts([...ints, interest]);
      }
    });
  }

  const removeInterest = (item1: string) => {
    const arr = ints.filter((item) => item !== item1);
    setInts(arr);
  };
  return (
    <>
      <p className="mb-2 mt-3 font-extrabold">Languages Known</p>
      <div className="mt-5 flex items-center gap-1">
        {langs.map((item, index) => (
          <EditableBadge onClick={removeItem} key={index} text={item} />
        ))}
        <div className="ml-5 flex">
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-full w-full rounded-lg border-2 pl-2"
            placeholder="Add language"
            id="langs"
          />
        </div>
      </div>
      <br /> <br />
      <p className="mb-2 mt-3 font-extrabold">Interests</p>
      <div className="mt-5 flex gap-1.5">
        {ints.map((item, index) => (
          <EditableBadge text={item} key={index} onClick={removeInterest} />
        ))}
        {/* <AddButton text="Add more interest" /> */}
        <div className="ml-5 flex">
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="h-full w-full rounded-lg border-2 pl-2"
            placeholder="Add language"
            id="ints"
          />
        </div>
      </div>
      <div className=" block flex justify-center">
        <button
          onClick={() => {
            props.onSubmit && props.onSubmit(langs, ints);
          }}
          className="my-5 flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] font-bold text-white"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditablePortfolio;
