import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import type { ProfileDetails } from "../../types/profile/details";
import { getProfileDetails } from "../../utils/apis/details/Index";
import NeedsNavbar from "../needs/NeedsNavbar";
import NeedTabs from "../needs/NeedTabs";

function CreatedNeed(props: any) {
  const [currentTab, setCurrentTab] = useState(0);
  const router = useRouter();
  const { data: profileData } = useQuery<ProfileDetails>(
    "details",
    getProfileDetails,
    { staleTime: Infinity }
  );
  useEffect(() => {
    if (router.query.isHistory) {
      setCurrentTab(1);
    } else if (router.query.isPending) {
      setCurrentTab(2);
    }
  }, [router.query.isHistory, router.query.isPending]);
  const handleTabChange = useCallback((index: number) => {
    setCurrentTab(index);
  }, []);
  useEffect(() => {
    props.changeTab(["Active", "History", "In Progress"][currentTab]);
  }, [currentTab, props]);
  return (
    <div>
      <NeedsNavbar
        availableCredits={profileData?.data.creditLeft || 0}
        currentPage="Need"
      />
      <div className="mt-12 px-8">
        <NeedTabs
          tabs={["Active", "History", "In Progress"]}
          activeIndex={currentTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}

export default CreatedNeed;
