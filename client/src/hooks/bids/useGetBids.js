import { useEffect, useState } from "react";
import { getBidsForGigApi } from "../../apis/bidsAPI";

const useGetBids = (gigId) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gigId) return;

    const fetchBids = async () => {
      try {
        const res = await getBidsForGigApi(gigId);
        setBids(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [gigId]);

  return { bids, loading };
};

export default useGetBids;
