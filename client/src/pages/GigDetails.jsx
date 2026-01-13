
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import useSubmitBid from "../hooks/bids/useSubmitBid";
// import { useAuth } from "../context/AuthContext";

// function GigDetails() {

//   const location = useLocation();
//   const navigate = useNavigate();

//   const gig = location.state?.gig; // 👈 received from Home
//   const { user } = useAuth();
//   const { submitBid, loading } = useSubmitBid();

//   const [message, setMessage] = useState("");

//   // 🔒 Safety: if user refreshes page, state is lost
//   if (!gig) {
//     return (
//       <div>
//         <p>Gig data not available.</p>
//         <button onClick={() => navigate("/home")}>
//           Go back
//         </button>
//       </div>
//     );
//   }

//   const handleBid = async () => {
//     if (!message.trim()) {
//       alert("Please enter a message");
//       return;
//     }

//     await submitBid({
//       gigId: gig._id,
//       message
//     });

//     alert("Bid submitted");
//     setMessage("");
//   };

//   return (
//     <div>
//       <h1>Title: {gig.title}</h1>

//       <p>Description: {gig.description}</p>
//       <p>Budget: ₹{gig.budget}</p>
//       <p>Status: {gig.status}</p>

//       {user ? (
//         <>
//           <textarea
//             placeholder="Write your proposal..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />

//           <br />

//           <button onClick={handleBid} disabled={loading}>
//             Submit Bid
//           </button>
//         </>
//       ) : (
//         <p>Login to submit a bid</p>
//       )}
//     </div>
//   );
// }

// export default GigDetails;


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useSubmitBid from "../hooks/bids/useSubmitBid";
import { useAuth } from "../context/AuthContext";

function GigDetails({ showBidForm = true }) {
  const location = useLocation();
  const navigate = useNavigate();

  const gig = location.state?.gig;
  const { user } = useAuth();
  const { submitBid, loading } = useSubmitBid();

  const [message, setMessage] = useState("");

  // Safety: refresh / direct access
  if (!gig) {
    return (
      <div>
        <p>Gig data not available.</p>
        <button onClick={() => navigate("/home")}>
          Go back
        </button>
      </div>
    );
  }

  const handleBid = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    await submitBid({
      gigId: gig._id,
      message
    });

    alert("Bid submitted");
    setMessage("");
  };

  return (
    <div>
      <h1>Title: {gig.title}</h1>

      <p>Description: {gig.description}</p>
      <p>Budget: ₹{gig.budget}</p>
      <p>Status: {gig.status}</p>

      {/* 👇 CONDITIONAL BID FORM */}
      {showBidForm && (
        <>
          {user ? (
            <>
              <textarea
                placeholder="Write your proposal..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <br />

              <button onClick={handleBid} disabled={loading}>
                Submit Bid
              </button>
            </>
          ) : (
            <p>Login to submit a bid</p>
          )}
        </>
      )}
    </div>
  );
}

export default GigDetails;
