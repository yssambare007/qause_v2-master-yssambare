import React, { useState } from "react";
import FacebookIcon from "./../../../public/images/profile/facebookIcon.svg";
import InstagramIcon from "./../../../public/images/profile/instagramIcon.svg";
import TwitterIcon from "./../../../public/images/profile/twitterIcon.svg";
import Linkdin from "./../../../public/images/profile/linkedinIcon.svg";
import { link } from "fs";
import AddButton from "./AddButton";
interface EditableSocialsProps {
  onSubmit?: (
    fbLink: string,
    instaLink: string,
    twitterLink: string,
    linkedinLink: string,
    portfolioLink: any
  ) => void;
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
  linkedinLink: string;
  portfolioLink: any;
}
const EditableSocials = (props: EditableSocialsProps) => {
  const [portfolioLink, setPortfolioLink] = useState<any>({});

  const [FbLink, setFbLink] = useState(props.facebookLink || "Facebook");
  const [instaLink, setInstaLink] = useState(
    props.instagramLink || "Instagram"
  );
  const [twitterLink, setTwitterLink] = useState(
    props.twitterLink || "Twitter"
  );
  const [linkedinLink, setLinkedinLink] = useState(
    props.linkedinLink || "Linkedin"
  );
  return (
    <>
      <div>
        <p className="mb-2 mt-3 font-extrabold">Portfolio</p>
        <div className="my-5 flex items-center gap-1">
          <input
            type="text"
            // value={portfolio}
            onChange={(e) => setPortfolioLink(e.target.value)}
            placeholder="abctoxyz.com"
            className="w-142.998 h-32.091 mb-2 flex-shrink-0 self-start rounded-lg border-2 pl-1"
          />
          {/* <div className="w-142.998 h-40.091 relative flex-shrink-0 mt-0.5">
            <AddButton text="Add link" width="142.998px" />
            <p className="font-inter text-center text-xs font-medium leading-[140.8%] text-black ml-5 mt-2">
                *Duplicate links will be removed in portfolio link
            </p>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="mb-2 mt-3 font-extrabold">Social Accounts</p>
        <div className="flex gap-10">
          <div className="flex w-[250px] items-center justify-between rounded-lg border-2 px-2 py-1">
            <input
              type="text"
              className="focus:outline-none"
              placeholder={FbLink}
              value={FbLink}
              onChange={(e) => setFbLink(e.target.value)}
            />
            <FacebookIcon />
          </div>
          <div className="flex w-[250px] items-center justify-between rounded-lg border-2 px-2 py-1">
            <input
              type="text"
              className="focus:outline-none"
              placeholder={instaLink}
              value={instaLink}
              onChange={(e) => setInstaLink(e.target.value)}
            />
            <InstagramIcon />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex w-[250px] items-center justify-between rounded-lg border-2 px-2 py-1">
            <input
              type="text"
              className="focus:outline-none"
              placeholder={twitterLink}
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
            />
            <TwitterIcon />
          </div>
          <div className="flex w-[250px] items-center justify-between rounded-lg border-2 px-2 py-1">
            <input
              type="text"
              className="focus:outline-none"
              placeholder={linkedinLink}
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
            />
            <Linkdin />
          </div>
        </div>
      </div>
      <div className=" block flex justify-center">
        <button
          onClick={() => {
            props.onSubmit &&
              props.onSubmit(
                FbLink,
                instaLink,
                twitterLink,
                linkedinLink,
                portfolioLink
              );
          }}
          className="my-5 flex h-[40px] w-[200px] items-center justify-center self-center rounded-xl bg-[#f7a212] font-bold text-white"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditableSocials;
