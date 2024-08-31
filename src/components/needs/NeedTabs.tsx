import { useCallback } from "react";

function NeedTabs(props: {
  tabs: string[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}) {
  return (
    <>
      <div className="border-b border-gray-800 text-center text-sm font-medium text-[#002C57]">
        <ul className="-mb-px flex flex-wrap">
          {props.tabs.map((tab, i) => (
            <NeedTab
              key={"tab_" + tab}
              index={i}
              tabName={tab}
              isActive={i == props.activeIndex}
              onTabSelected={props.onTabChange}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function NeedTab(props: {
  index: number;
  tabName: string;
  isActive: boolean;
  onTabSelected: (index: number) => void;
}) {
  const handleTabSelected = useCallback(
    () => props.onTabSelected(props.index),
    [props.tabName]
  );

  return (
    <li className="mr-14 cursor-pointer text-base font-bold">
      <a
        onClick={handleTabSelected}
        className={
          props.isActive
            ? "active inline-block rounded-t-lg border-b-[3px] border-[#253dc0] px-4 py-2 text-[#253dc0]"
            : "inline-block rounded-t-lg border-b-[3px] border-transparent px-4 py-2"
        }
      >
        {props.tabName}
      </a>
    </li>
  );
}

export default NeedTabs;
