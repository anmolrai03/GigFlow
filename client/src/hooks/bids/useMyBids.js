import { useEffect, useState } from "react";

import { getMyBidsApi } from "../../apis/bidsAPI";

const useMyBids = () => {
  
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await getMyBidsApi();
        setBids(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bids");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  return { bids, loading, error };
};

export default useMyBids;
