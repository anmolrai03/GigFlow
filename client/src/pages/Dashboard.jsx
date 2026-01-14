import { useState } from "react";
import MyGigs from "../components/MyGigs";
import MyBids from "../components/MyBids";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("gigs");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage your gigs and track your bids
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <button
          onClick={() => setActiveTab("gigs")}
          disabled={activeTab === "gigs"}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            activeTab === "gigs"
              ? "cursor-default bg-slate-900 text-white"
              : "border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          My Gigs
        </button>

        <button
          onClick={() => setActiveTab("bids")}
          disabled={activeTab === "bids"}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            activeTab === "bids"
              ? "cursor-default bg-slate-900 text-white"
              : "border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          My Bids
        </button>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        {activeTab === "gigs" && <MyGigs />}
        {activeTab === "bids" && <MyBids />}
      </div>
    </div>
  );
}

export default Dashboard;
