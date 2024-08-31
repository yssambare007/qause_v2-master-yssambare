import React, { useEffect, useState } from "react";

//Next
import { useRouter } from "next/router";
import Link from "next/link";

//React Query
import { useMutation, useQuery, useQueryClient } from "react-query";

//Material UI
import { Breadcrumbs } from "@mui/material";

//Material UI Icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

//Custom components
import GigFrame from "../../components/common/GigFrame";
import AddUpdate from "../../components/gig/AddUpdate";
import TabsButton from "../../components/gig/TabsButton";
import DescriptionTab from "../../components/gig/DescriptionTab";
import UpdatesTab from "../../components/gig/UpdatesTab";
import CreatedOnCard from "../../components/gig/cards/CreatedOnCard";
import NgoDescCard from "../../components/gig/cards/NgoDescCard";
import DescriptionCard from "../../components/gig/cards/DescriptionCard";

//APIs
import {
  getGigDesc,
  getGigUpdates,
  putGigUpdates,
} from "../../utils/apis/gig/Index";
import { getProfileDetails } from "../../utils/apis/details/Index";
import { getNeedCard } from "../../utils/apis/needs/Index";

//Types
import type { CardType } from "../../types/need/card";
import type { GigDescription, GigUpdates } from "../../types/gig/fundraising";
import type { ProfileDetails } from "../../types/profile/details";
import type { PutUpdateMutationTypes } from "../../types/mutation/gig";

const breadcrumbs = [
  {
    label: "Home",
    href: "#",
  },
  {
    label: "Listing",
    href: "#",
  },
  {
    label: "Details",
    href: "#",
  },
];

const SingleGig = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<
    "description" | "supporters" | "updates"
  >("description");
  const [input, setInput] = useState({
    remark: "",
    isPrivate: false,
    file: "",
  });
  const queryClient = useQueryClient();
  const { needId } = router.query;
  const { data: cardData } = useQuery<CardType>(["card", needId], getNeedCard);
  const { data: descriptionData } = useQuery<GigDescription>(
    ["description", needId],
    getGigDesc
  );
  const { data: updatesData } = useQuery<GigUpdates>({
    queryKey: ["updates", needId, 1],
    queryFn: getGigUpdates,
  });
  const { data: profileData } = useQuery<ProfileDetails>(
    "details",
    getProfileDetails
  );
  const { mutate } = useMutation({
    mutationFn: (payload: PutUpdateMutationTypes) => putGigUpdates(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["updates", needId, 1]);
    },
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    if (name === "isPrivate") {
      setInput((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    if (name === "upload_file") {
      const reader = new FileReader();
      reader.readAsDataURL(
        ((e.target as HTMLInputElement).files as FileList)[0] as File
      );
      reader.onload = () => {
        setInput({
          ...input,
          file: (reader.result as string).split(",")[1] as string,
        });
      };
      return;
    }

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const sendUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.remark.trim()) return;
    const title = input.file
      ? `NGO ${profileData?.data?.ngo?.name} has ${
          input.isPrivate
            ? "sent private message to Volunteer"
            : "uploaded file"
        }`
      : `NGO ${profileData?.data?.ngo?.name} has send ${
          input.isPrivate ? "private message to Volunteer" : "send a remark"
        }`;

    mutate({
      ...input,
      title,
      id: needId as string,
    });
    setInput({
      remark: "",
      isPrivate: false,
      file: "",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) router.push("/ngo-login");
  }, []);

  return (
    <GigFrame>
      <div className="my-6 flex flex-col items-center gap-5 md:mx-48 md:flex-row md:items-start">
        {/* left arena */}
        <div className="flex w-[300px] flex-col items-center gap-6 md:w-[500px]">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((breadcrumb) => (
              <Link href={breadcrumb.href} key={breadcrumb.label}>
                {breadcrumb.label}
              </Link>
            ))}
          </Breadcrumbs>

          {/* created by card */}
          <CreatedOnCard cardData={cardData!} />

          {/* ngo card */}
          <NgoDescCard cardData={cardData!} />

          {/* description card */}
          <DescriptionCard cardData={cardData!} />
        </div>

        {/* right arena */}
        <div className="flex w-full flex-col gap-10 px-4 md:pl-10">
          {/* heading */}
          <div className="flex w-full flex-col gap-6">
            <h1 className="text-4xl font-bold">{cardData?.data.title}</h1>
            <span className="w-fit rounded-full border border-green-600 px-8 py-2 text-2xl font-semibold text-green-600">
              Ongoing
            </span>
          </div>

          {/* update box */}
          <AddUpdate
            handleInput={handleInput}
            input={input}
            sendUpdate={sendUpdate}
          />

          {/* tabs */}
          <div className="mb-10 flex flex-col gap-16">
            <TabsButton
              showDescription
              showUpdates
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />

            {currentTab === "description" && (
              <DescriptionTab data={descriptionData!} />
            )}
            {currentTab === "updates" && <UpdatesTab data={updatesData!} />}
          </div>
        </div>
      </div>
    </GigFrame>
  );
};

export default SingleGig;
