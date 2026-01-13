import { useState } from "react";
import { submitBidApi } from "../../apis/bidsAPI";

const useSubmitBid = () => {
  const [loading, setLoading] = useState(false);

  const submitBid = async (data) => {
    setLoading(true);
    try {
      const res = await submitBidApi(data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { submitBid, loading };
};

export default useSubmitBid;
