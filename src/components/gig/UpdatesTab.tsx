import React from "react";

//Next
import { useRouter } from "next/router";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

//Apis
import { deleteGigUpdates } from "../../utils/apis/gig/Index";

//React query
import { useMutation, useQueryClient } from "react-query";

//Types
import type { DeleteUpdateMutationTypes } from "../../types/mutation/gig";
import type { GigUpdates } from "../../types/gig/fundraising";

//Utils
import { monthNames } from "../../utils/monthNames";
import Image from "next/image";

interface UpdatesTabProps {
  data: GigUpdates;
}

const UpdatesTab = ({ data }: UpdatesTabProps) => {
  const needId = useRouter().query.needId as string;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload: DeleteUpdateMutationTypes) =>
      deleteGigUpdates(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["updates", needId]);
    },
  });
  return (
    <div className="flex w-full flex-col">
      {data?.success &&
        data?.data[0]?.updates.map((item, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-xs">
              {`${new Date(item.createdAt).getDate()} ${
                monthNames[new Date(item.createdAt).getMonth()]
              }, ${new Date(item.createdAt)
                .getFullYear()
                .toString()
                .slice(-2)}`}
            </span>
            <div className="flex flex-1 flex-col gap-6 border-b border-l px-3 pb-7">
              <span>
                {item.title}{" "}
                <button
                  onClick={() =>
                    mutate({
                      volunteerId: needId,
                      updateId: item._id,
                    })
                  }
                >
                  <DeleteIcon />
                  <span className="sr-only">delete update</span>
                </button>
              </span>
              <span className="text-gray-400">{item.remark}</span>
              <div className="flex max-w-[200px] gap-4 overflow-x-auto md:max-w-[500px]">
                {item.files.length > 0 && (
                  <div className="flex gap-4">
                    {item.files.map((file, i) => (
                      <button
                        key={i}
                        className="group relative flex h-48 w-48 items-center justify-center rounded-lg px-3 duration-300 hover:bg-[#999999]"
                      >
                        <DownloadIcon
                          sx={{ fontSize: "2.5rem" }}
                          className="absolute mx-auto hidden text-white group-hover:block"
                        />
                        <span className="sr-only">download file</span>
                        <Image
                          className="object-contain"
                          src="/images/signup-logo.png"
                          height={150}
                          width={180}
                          alt="logo"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UpdatesTab;
