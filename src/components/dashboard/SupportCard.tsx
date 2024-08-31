import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

export default function SupportCard({ manager, className }: any) {
  const support = {
    ...manager,
    designation: "Relationship Manager",
  };
  return (
    <div
      className={`flex h-full w-full flex-col items-center divide-y rounded-xl bg-white px-2 py-4 text-qause-blue-dark ${
        className || ""
      }`}
    >
      <div className="mb-2 flex h-full flex-col items-center">
        <div className="flex h-1/3 flex-col items-center gap-y-3">
          <div className="text-lg font-bold text-qause-yellow">Support</div>
          <div className="max-w-full text-center text-xs font-normal text-gray-600">
            Getting Stuck! Your Relationship Manager is Available for you
          </div>
        </div>
        <div className="flex h-2/3 flex-col items-center gap-y-8 py-2">
          <div className="flex items-center justify-center">
            <figure className="h-14 w-14">
              <img src={support.profilePicture} alt="usericon" />
            </figure>
          </div>
          <div className="flex flex-col items-center justify-center">
            <strong>{`${support.firstName} ${support.lastName}`}</strong>
            <span className="text-xs font-light">({support.designation})</span>
          </div>
        </div>
      </div>
      <div className="flex h-2/6 w-full flex-col items-start py-2">
        <div className="flex gap-x-2">
          <CallIcon className="h-4 w-4 text-qause-yellow" />{" "}
          <div className="text-xs font-light">{support.mobile}</div>
        </div>
        <div className="flex gap-x-2">
          <EmailIcon className="h-4 w-4 text-qause-yellow" />{" "}
          <div className="text-xs font-light">{support.email}</div>
        </div>
      </div>
    </div>
  );
}
