import { Link } from "react-router-dom";
import useGigs from "../hooks/gigs/useGigs";
import { useAuth } from "../context/AuthContext";

function MyGigs() {
  const { gigs, loading } = useGigs();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-slate-600">
        Loading your gigs…
      </div>
    );
  }

  const myGigs = gigs.filter((gig) => {
    if (typeof gig.ownerId === "string") {
      return gig.ownerId === user.id;
    }
    return gig.ownerId?._id === user.id;
  });

  if (myGigs.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-600">
        You have not posted any gigs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {myGigs.map((gig) => (
        <div
          key={gig._id}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900">
            {gig.title}
          </h3>

          {/* Footer */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Status */}
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
                gig.status === "open"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {gig.status}
            </span>

            {/* Manage */}
            <Link
              to={`/dashboard/gigs/${gig._id}`}
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              Manage Bids
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyGigs;
