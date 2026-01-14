import { useState } from "react";
import { postGigApi } from "../../apis/gigsAPI";

const usePostGig = () => {
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState();

  const postGig = async (data) => {
    setLoading(true);
    setError('');

    try {
      const res = await postGigApi(data);
      return res.data;
    } catch(error){
      setError(error?.response?.data?.message || "Could not post the Gig.");
    }
    finally {
      setLoading(false);
    }
  };

  return { postGig, loading,error };
};

export default usePostGig;
