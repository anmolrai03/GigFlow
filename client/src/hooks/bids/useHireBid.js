import { useState } from "react";
import { hireBidApi } from "../../apis/bidsAPI";

const useHireBid = () => {
  const [loading, setLoading] = useState(false);

  const hireBid = async (bidId) => {
    setLoading(true);
    try {
      const res = await hireBidApi(bidId);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { hireBid, loading };
};

export default useHireBid;
