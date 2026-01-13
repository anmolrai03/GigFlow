import { useEffect, useState } from "react";
import { getGigsApi } from "../../apis/gigsAPI";


const useGigs = (query = "") => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await getGigsApi(query);
        setGigs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [query]);

  return { gigs, loading };
};

export default useGigs;
