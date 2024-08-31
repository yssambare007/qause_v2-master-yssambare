export default function OpenTicketsCard(
  { tickets, className }: any = { tickets: [], className: "" }
) {
  const formatDate = (date: any) =>
    new Date(date).toLocaleDateString("en-IN").replaceAll("/", "-");
  return (
    <div
      className={`custom-scrollbar relative flex h-full max-h-full w-full flex-col divide-y overflow-y-auto rounded-xl bg-white ${className}`}
    >
      <div className="font bold sticky left-0 top-0 bg-white p-4 text-lg text-qause-yellow">
        Open Tickets
      </div>
      {tickets.map((ticket: any) => (
        <div
          className="h-32 min-h-[24%] px-4 py-1 text-xs text-qause-blue-dark"
          key={ticket._id}
        >
          <p className="font-light">{formatDate(ticket.createdAt)}</p>
          <p className="max-w-full font-medium">{ticket.type}</p>
        </div>
      ))}
    </div>
  );
}
