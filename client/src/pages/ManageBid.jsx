import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useGetBids from "../hooks/bids/useGetBids";
import useHireBid from "../hooks/bids/useHireBid";

function ManageBid() {
  const { gigId } = useParams();
  const navigate = useNavigate();

  const { bids, loading } = useGetBids(gigId);
  const { hireBid, error } = useHireBid();

  const [localBids, setLocalBids] = useState([]);
  const [activeBidId, setActiveBidId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // sync bids from hook once
  useEffect(() => {
    setLocalBids(bids);
  }, [bids]);

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-slate-600">
        Loading bids…
      </div>
    );
  }

  const handleHire = async (bidId) => {
    setActiveBidId(bidId);
    setSuccessMessage(null);

    try {
      const res = await hireBid(bidId);

      // ✅ backend message
      setSuccessMessage(res.message);

      // ✅ optimistic UI update
      setLocalBids((prev) =>
        prev.map((bid) => {
          if (bid._id === bidId) {
            return { ...bid, status: "hired" };
          }
          return { ...bid, status: "rejected" };
        })
      );
    } catch {
      // error handled by hook
    } finally {
      setActiveBidId(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Manage Bids
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Review proposals and hire a freelancer
        </p>
      </div>

      {/* ❌ Error */}
      {error?.message && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error.message}
        </div>
      )}

      {/* ✅ Success */}
      {successMessage && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {/* Empty */}
      {localBids.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
          No bids yet.
        </div>
      )}

      {/* Bids */}
      <div className="space-y-4">
        {localBids.map((bid) => (
          <div
            key={bid._id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {bid.freelancerId.name}
            </h3>

            <p className="mt-2 text-sm text-slate-700">
              {bid.message}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  bid.status === "pending"
                    ? "bg-slate-100 text-slate-700"
                    : bid.status === "hired"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bid.status}
              </span>

              {bid.status === "pending" && (
                <button
                  onClick={() => handleHire(bid._id)}
                  disabled={activeBidId === bid._id}
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  {activeBidId === bid._id ? "Hiring…" : "Hire"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBid;
