import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

function NeedTotalCreditsCard(props: {
  isEdit?: boolean;
  services: { [key: string]: number };
}) {
  const isFeaturedCard = (name: string) => {
    return name === "Feature My Card";
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-600">
      <div className="mb-3 flex items-center justify-between border-b border-gray-400 px-3 py-4 text-sm text-[#1B3763]">
        <div>Description</div>
        <div>Credit Availed</div>
      </div>
      {Object.entries(props.services)
        .filter(([_, credits]) => credits != 0)
        .map((service, i) => (
          <div
            key={service[0]}
            className={`mb-3 px-4 py-3 ${
              props.isEdit || isFeaturedCard(service[0])
                ? "bg-[#f1f7ff] text-[#1B3763]"
                : "text-gray-400"
            }`}
          >
            <div className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-start gap-2 ">
                <input
                  className="h-5 w-5 disabled:accent-slate-500"
                  type="checkbox"
                  disabled={true}
                  checked
                />
                <div>{service[0]}</div>
              </div>
              <div>{service[1]}</div>
            </div>
            {isFeaturedCard(service[0]) && (
              <div className="mx-7">
                <div className="mb-2 mt-1 text-xs font-extrabold text-[#1B3763]">
                  Get featured with us for a quicker response!{" "}
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-qause-yellow">
                  <PanToolAltIcon fontSize="small" /> Recommended
                </div>
              </div>
            )}
          </div>
        ))}
      <div className="flex justify-between rounded-b-xl bg-[#0020D1] px-3 py-4 text-sm text-white">
        <div>Total Credit used</div>
        <div className="font-extrabold">
          {Object.values(props.services).reduce((a, credit) => a + credit, 0)}
        </div>
      </div>
    </div>
  );
}

export default NeedTotalCreditsCard;
