import React, { useState, useEffect } from "react";

//Next
import { useRouter } from "next/router";

//React query
import { useMutation, useQuery, useQueryClient } from "react-query";

//Icons
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

//Custom components
import GigFrame from "../../components/common/GigFrame";
import DescriptionTab from "../../components/gig/DescriptionTab";
import UpdatesTab from "../../components/gig/UpdatesTab";
import SupportersTab from "../../components/gig/SupportersTab";
import TabsButton from "../../components/gig/TabsButton";
import Card from "../../components/common/Card";
import AddUpdate from "../../components/gig/AddUpdate";

//APIs
import {
  getGigDesc,
  getGigSupporters,
  getGigUpdates,
  putGigUpdates,
} from "../../utils/apis/gig/Index";
import { getProfileDetails } from "../../utils/apis/details/Index";

//Types
import type {
  GigDescription,
  GigSupporters,
  GigUpdates,
} from "../../types/gig/fundraising";
import { type PutUpdateMutationTypes } from "../../types/mutation/gig";
import { type ProfileDetails } from "../../types/profile/details";

const FundraisingGig = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { needId } = router.query;
  const { data: descriptionData } = useQuery<GigDescription>(
    ["description", needId],
    getGigDesc
  );
  const { data: supportsData } = useQuery<GigSupporters>(
    ["support", needId, 1],
    getGigSupporters
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
  const [input, setInput] = useState({
    remark: "",
    isPrivate: false,
    file: "",
  });
  const [currentTab, setCurrentTab] = useState<
    "description" | "supporters" | "updates"
  >("description");

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
          file: reader.result as string,
        });
      };
      return;
    }

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const sendUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.remark.trim()) return;
    console.log(112);
    mutate({
      ...input,
      title: `NGO ${profileData?.data?.ngo?.name} has send ${
        input.isPrivate ? "private message to Volunteer" : "send a remark"
      }`,
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
      <div className="my-6 flex flex-col-reverse gap-10 lg:mx-48 lg:flex-row lg:gap-24">
        <div className="flex flex-1 flex-col gap-8 px-6">
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-semibold">Fundraising</h4>

            <AddUpdate
              handleInput={handleInput}
              input={input}
              sendUpdate={sendUpdate}
            />
          </div>

          <div className="mb-10 flex flex-col gap-16">
            <TabsButton
              showDescription
              showSupporters
              showUpdates
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />

            {currentTab === "description" && (
              <DescriptionTab data={descriptionData!} />
            )}
            {currentTab === "supporters" && (
              <SupportersTab data={supportsData!} />
            )}
            {currentTab === "updates" && <UpdatesTab data={updatesData!} />}
          </div>
        </div>

        <div className="flex h-fit flex-1 justify-center lg:sticky lg:top-48">
          <Card className="rounded-lg lg:w-[350px]">
            <div className="flex flex-col gap-16 px-4">
              {/* header and info */}
              <div className="flex flex-col gap-6">
                {/* header */}
                <h4 className="text-center text-2xl font-bold text-orange-500">
                  Donate Now
                </h4>
                {/* info */}
                <div className="flex w-full flex-col gap-1">
                  {/* top info */}
                  <div className="flex justify-between">
                    <span className="text-xs">
                      <span className="text-xl font-bold">
                        <CurrencyRupeeIcon /> 1000
                      </span>
                      raised out of
                    </span>
                    <span className="flex items-center text-xs">
                      <CurrencyRupeeIcon sx={{ fontSize: 16 }} /> 100000
                    </span>
                  </div>
                  {/* horizontal bar */}
                  <div className="h-1 w-full rounded-lg bg-gray-300" />
                  {/* bottom info */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs">1 Supporters</span>
                    <span className="text-sm font-semibold">26 days left</span>
                  </div>
                </div>
              </div>

              {/* donate buttons */}
              <div className="flex w-full flex-col items-center gap-6">
                {/* suggestion buttons */}
                <div className="flex w-full items-center justify-between">
                  <button className="font-semibold">
                    <CurrencyRupeeIcon /> 100
                  </button>
                  <button className="font-semibold">
                    <CurrencyRupeeIcon /> 100
                  </button>
                  <button className="font-semibold">Other amount</button>
                </div>
                <button
                  className={`w-fit rounded-lg bg-[#0020D1] py-2 px-8 text-lg text-white`}
                >
                  Donate Now!
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </GigFrame>
  );
};

export default FundraisingGig;
