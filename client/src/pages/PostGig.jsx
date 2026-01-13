import { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePostGig from "../hooks/gigs/usePostGig";


function PostGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const { postGig } = usePostGig();
  const navigate = useNavigate();

  const handlePost = async () => {
    await postGig({ title, description, budget });
    // console.log(res.data);

    alert("Gig posted");
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Post a Gig</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Budget"
        onChange={(e) => setBudget(e.target.value)}
      />

      <button onClick={handlePost}>Post Gig</button>
    </div>
  );
};

export default PostGig;
