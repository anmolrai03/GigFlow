import { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePostGig from "../hooks/gigs/usePostGig";

function PostGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const { postGig, loading, error } = usePostGig();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(null);

  const handlePost = async () => {
    setSuccessMessage(null);

    try {
      const res = await postGig({ title, description, budget });

      // ✅ backend success message
      setSuccessMessage(res.message);

      // small UX delay so user sees success
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch {
      // ❌ do nothing
      // error already handled by hook
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Post a Gig
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Describe your work and find the right freelancer
          </p>
        </div>

        {/* ❌ Error from backend */}
        {error?.message && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error.message}
          </div>
        )}

        {/* ✅ Success from backend */}
        {successMessage && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Gig title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <textarea
            placeholder="Describe the work in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Budget (₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />

          <button
            onClick={handlePost}
            disabled={loading}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Posting…" : "Post Gig"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostGig;
