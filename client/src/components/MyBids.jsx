import { Link } from "react-router-dom";
import useMyBids from "../hooks/bids/useMyBids";

function MyBids() {
  const { bids, loading, error } = useMyBids();

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-slate-600">
        Loading your bids…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-600">
        You haven’t placed any bids yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <div
          key={bid._id}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          {/* Gig title */}
          <h3 className="text-base font-semibold text-slate-900">
            {bid.gigId.title}
          </h3>

          {/* Message */}
          <p className="mt-2 text-sm text-slate-700">
            <span className="font-medium">Your message:</span>{" "}
            {bid.message}
          </p>

          {/* Footer */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Status */}
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
                bid.status === "pending"
                  ? "bg-slate-100 text-slate-700"
                  : bid.status === "hired"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {bid.status}
            </span>

            {/* View gig */}
            {/* <Link
              to={`/dashboard/gigs/${bid.gigId._id}`}
              state={{ gig: bid.gigId }}
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              View Gig
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyBids;
