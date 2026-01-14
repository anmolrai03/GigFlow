import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useSubmitBid from "../hooks/bids/useSubmitBid";
import { useAuth } from "../context/AuthContext";

function GigDetails({ showBidForm = true }) {

  const location = useLocation();
  const navigate = useNavigate();

  const gig = location.state?.gig;
  const { user } = useAuth();
  const { submitBid, loading, error } = useSubmitBid();

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  // Safety: refresh / direct access
  if (!gig) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-sm text-slate-600">
          Gig data not available.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleBid = async () => {
    if (!message.trim()) return;

    setSuccessMessage(null);

    try {
      const res = await submitBid({
        gigId: gig._id,
        message,
      });

      // ✅ ONLY backend success message
      // console.log(res);
      setSuccessMessage(res.message);
      setMessage("");
    } catch {
      // ❌ do nothing
      // error already set by hook
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Gig Card */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          {gig.title}
        </h1>

        <p className="mt-4 text-sm text-slate-700">
          {gig.description}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-500">Budget</p>
            <p className="text-sm font-medium text-slate-900">
              ₹{gig.budget}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Status</p>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                gig.status === "open"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {gig.status}
            </span>
          </div>
        </div>
      </div>

      {/* Bid Form */}
      {showBidForm && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {user ? (
            <>
              <h2 className="text-base font-semibold text-slate-900">
                Submit a proposal
              </h2>

              {/* ❌ Error alert (from backend) */}
              {error?.message && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {error.message}
                </div>
              )}

              {/* ✅ Success alert (from backend) */}
              {successMessage && (
                <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
                  {successMessage}
                </div>
              )}

              <textarea
                placeholder="Write your proposal..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />

              <button
                onClick={handleBid}
                disabled={loading}
                className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit Bid"}
              </button>
            </>
          ) : (
            <p className="text-sm text-slate-600">
              Login to submit a bid.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GigDetails;
