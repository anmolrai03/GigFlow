import { Link } from "react-router-dom";

import useGigs from "../hooks/gigs/useGigs";

import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const { gigs, loading } = useGigs();   
  const { user } = useAuth();

  if (loading) return <p>Loading your gigs...</p>;

  // filter gigs owned by logged-in user
  const myGigs = gigs.filter((gig) => {
    // depending on backend shape
    if (typeof gig.ownerId === "string") {
      return gig.ownerId === user.id;
    }
    return gig.ownerId?._id === user.id;
  });

  // console.log(myGigs)

  return (
    <div>
      <h1>My Gigs</h1>

      {myGigs.length === 0 && (
        <p>You have not posted any gigs yet.</p>
      )}

      {myGigs.map((gig) => (
        <div key={gig._id}>
          <h3>{gig.title}</h3>
          <p>Status: {gig.status}</p>

          <Link to={`/dashboard/gigs/${gig._id}`}>
            Manage Bids
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
