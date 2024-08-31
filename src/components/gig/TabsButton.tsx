import React from "react";

interface TabsButtonProps {
  currentTab: "description" | "supporters" | "updates";
  setCurrentTab: React.Dispatch<
    React.SetStateAction<"description" | "supporters" | "updates">
  >;
  showSupporters?: boolean;
  showUpdates?: boolean;
  showDescription?: boolean;
}

const TabsButton = ({
  currentTab,
  setCurrentTab,
  showDescription,
  showSupporters,
  showUpdates,
}: TabsButtonProps) => {
  return (
    <div className="flex items-center gap-2 border-b border-gray-400 md:gap-3">
      {showDescription && (
        <button
          onClick={() => setCurrentTab("description")}
          className={`text-md rounded-t-lg px-1 pb-3 pt-2 font-semibold lg:px-4 ${
            currentTab === "description"
              ? "border border-orange-500 text-orange-500"
              : "text-gray-600"
          }`}
        >
          Description
        </button>
      )}
      {showSupporters && (
        <button
          onClick={() => setCurrentTab("supporters")}
          className={`text-md rounded-t-lg px-2 pb-3 pt-2 font-semibold lg:px-4 ${
            currentTab === "supporters"
              ? "border border-orange-500 text-orange-500"
              : "text-gray-600"
          }`}
        >
          Supporters
        </button>
      )}
      {showUpdates && (
        <button
          onClick={() => setCurrentTab("updates")}
          className={`text-md rounded-t-lg px-1 pb-3 pt-2 font-semibold lg:px-4 ${
            currentTab === "updates"
              ? "border border-orange-500 text-orange-500"
              : "text-gray-600"
          }`}
        >
          Updates
        </button>
      )}
    </div>
  );
};

export default TabsButton;
