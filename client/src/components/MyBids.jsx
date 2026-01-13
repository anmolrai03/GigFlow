import { Link } from "react-router-dom";

import useMyBids from "../hooks/bids/useMyBids";

function MyBids() {

  const { bids, loading, error } = useMyBids();

  if (loading) return <p>Loading your bids...</p>;
  if (error) return <p>{error}</p>;

  if (bids.length === 0) {
    return <p>You haven’t placed any bids yet.</p>;
  }

  return (
    <div>
      {bids.map((bid) => (
        <div key={bid._id}>
          <h3>{bid.gigId.title}</h3>
          <p>Your message: {bid.message}</p>
          <p>Status: {bid.status}</p>

          {/* <Link
            to={`/dashboard/gigs/${bid.gigId._id}`}
            state={{ gig: bid.gigId }}
          >
            View Gig
          </Link> */}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyBids;
