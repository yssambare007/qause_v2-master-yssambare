import React from "react";

//HTML string to HTML parser
import parse from "html-react-parser";

//Types
import { type GigDescription } from "../../types/gig/fundraising";

interface DescriptionTabProps {
  data: GigDescription;
}

const DescriptionTab = ({ data }: DescriptionTabProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      {data?.success &&
        data?.data.map(
          (item, i) =>
            item.value && (
              <div key={i} className="flex w-full flex-col gap-1">
                <h5 className="text-md font-medium">{item.title}</h5>
                {item.title === "website" ? (
                  <a
                    href={item.value.toString()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold leading-6 text-blue-900"
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-sm leading-6 text-gray-400">
                    {parse(item.value.toString())}
                  </div>
                )}
              </div>
            )
        )}
    </div>
  );
};

export default DescriptionTab;
