import { Link } from "react-router-dom";
import useGigs from "../hooks/gigs/useGigs";

function Home() {
  const { gigs, loading } = useGigs();

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-slate-600">
        Loading gigs…
      </div>
    );
  }

  const openGigs = gigs.filter((gig) => gig.status !== "assigned");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Open Gigs
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Browse available freelance opportunities
        </p>
      </div>

      {/* Empty state */}
      {openGigs.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
          No gigs available right now.
        </div>
      )}

      {/* Gigs list */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {openGigs.map((gig) => (
          <div
            key={gig._id}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Content */}
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {gig.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-sm text-slate-700">
                {gig.description}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Budget</p>
                <p className="text-sm font-medium text-slate-900">
                  ₹{gig.budget}
                </p>
              </div>

              <Link
                to={`/gigs/${gig._id}`}
                state={{ gig }}
                className="text-sm font-medium text-slate-900 hover:underline"
              >
                View Gig
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
