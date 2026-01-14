import { useState } from "react";
import { hireBidApi } from "../../apis/bidsAPI";

const useHireBid = () => {
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState();

  const hireBid = async (bidId) => {
    setLoading(true);
    setError('');
    try {
      const res = await hireBidApi(bidId);
      return res.data;
    } catch(err){
      setError(err?.response?.data?.message);
    }
    finally {
      setLoading(false);
    }
  };

  return { hireBid, loading , error};
};

export default useHireBid;
