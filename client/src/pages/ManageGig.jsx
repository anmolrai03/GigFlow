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




// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// import useGetBids from "../hooks/bids/useGetBids";
// import useHireBid from "../hooks/bids/useHireBid";
// import useGigs from '../hooks/gigs/useGigs'

// import {useAuth} from '../context/AuthContext'

// function ManageGig() {

//   const { gigId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const { gig, loading: gigLoading } = useGigs(gigId);
//   const { bids, loading: bidsLoading, setBids } = useGetBids(gigId);
//   const { hireBid } = useHireBid();

//   // 🔒 Owner-only guard
//   useEffect(() => {
//     if (gig && gig.ownerId !== user.id) {
//       navigate("/home");
//     }
//   }, [gig, user, navigate]);

//   if (gigLoading || bidsLoading) return <p>Loading...</p>;
//   if (!gig) return <p>Gig not found</p>;

//   const handleHire = async (bidId) => {
//     try {
//       await hireBid(bidId);

//       // 🔥 Optimistic UI update
//       setBids((prev) =>
//         prev.map((bid) => {
//           if (bid._id === bidId) {
//             return { ...bid, status: "hired" };
//           }
//           return { ...bid, status: "rejected" };
//         })
//       );
//     } catch (error) {
//       console.error("Hire failed:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Manage Bids</h1>

//       <h2>{gig.title}</h2>
//       <p>Status: {gig.status}</p>

//       {bids.length === 0 && <p>No bids yet</p>}

//       {bids.map((bid) => (
//         <div key={bid._id}>
//           <p>Freelancer: {bid.freelancerId.name}</p>
//           <p>{bid.message}</p>
//           <p>Status: {bid.status}</p>

//           <button
//             disabled={
//               gig.status === "assigned" || bid.status !== "pending"
//             }
//             onClick={() => handleHire(bid._id)}
//           >
//             Hire
//           </button>

//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ManageGig;
