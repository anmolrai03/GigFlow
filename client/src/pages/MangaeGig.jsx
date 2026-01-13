import { useParams } from "react-router-dom";
import useGetBids from "../hooks/bids/useGetBids";
import useHireBid from "../hooks/bids/useHireBid";


function ManageGig (){
  
  const { gigId } = useParams();
  const { bids, loading } = useGetBids(gigId);
  const { hireBid } = useHireBid();

  if (loading) return <p>Loading bids...</p>;

  console.log(bids)

  return (
    <div>
      <h1>Manage Bids</h1>

      {bids.length === 0 && <p>No bids yet</p>}

      {bids.map((bid) => (
        <div key={bid._id}>
          <p>Freelancer: {bid.freelancerId.name}</p>
          <p>{bid.message}</p>
          <p>Status: {bid.status}</p>

          {bid.status === "pending" && (
            <button onClick={() => hireBid(bid._id)}>
              Hire
            </button>
          )}
          <hr />
        </div>
        
      ))}
    </div>
  );
};

export default ManageGig;
