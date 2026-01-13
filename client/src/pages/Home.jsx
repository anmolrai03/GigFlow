import { Link } from "react-router-dom";

import useGigs from "../hooks/gigs/useGigs";

function Home() {
  const { gigs, loading } = useGigs();
  // console.log(gigs)

  if (loading) return <p>Loading gigs...</p>;

  return (
    <div>
      <h1>Open Gigs</h1> <hr />
      {gigs.length === 0 && <p>No gigs available</p>}
      {gigs
        .filter((gig) => gig.status !== "assigned")
        .map((gig) => (
          <div key={gig._id}>
            <h3>Title: {gig.title}</h3>
            <p>Description: {gig.description}</p>
            <p>Status: {gig.status}</p>
            <p>Budget: {gig.budget}</p>

            <Link to={`/gigs/${gig._id}`} className="underline" state={{ gig }}>
              View Gig
            </Link>

            <hr />
          </div>
        ))}
    </div>
  );
}

export default Home;
