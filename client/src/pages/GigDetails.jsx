import { useParams } from "react-router-dom";

import useSubmitBid from "../hooks/bids/useSubmitBid";
import { useAuth } from "../context/AuthContext";

function GigDetails() {
  
  const { gigId } = useParams();
  const { user } = useAuth();
  const { submitBid, loading } = useSubmitBid();

  const handleBid = async () => {
    await submitBid({
      gigId,
      message: "I would like to work on this gig"
    });
    alert("Bid submitted");
  };

  return (
    <div>
      <h1>Gig Details</h1>
      <p>Gig ID: {gigId}</p>

      {user ? (
        <button onClick={handleBid} disabled={loading}>
          Submit Bid
        </button>
      ) : (
        <p>Login to submit a bid</p>
      )}
    </div>
  );
};

export default GigDetails;
