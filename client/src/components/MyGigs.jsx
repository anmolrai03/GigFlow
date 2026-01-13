import { Link } from "react-router-dom";

import useGigs from "../hooks/gigs/useGigs"
import {useAuth} from "../context/AuthContext"

function MyGigs() {
  
  const { gigs, loading } = useGigs();
  const { user } = useAuth();

  if (loading) return <p>Loading your gigs...</p>;

  const myGigs = gigs.filter((gig) => {
    if (typeof gig.ownerId === "string") {
      return gig.ownerId === user.id;
    }
    return gig.ownerId?._id === user.id;
  });

  if (myGigs.length === 0) {
    return <p>You have not posted any gigs yet.</p>;
  }

  return (
    <div>
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

export default MyGigs;
