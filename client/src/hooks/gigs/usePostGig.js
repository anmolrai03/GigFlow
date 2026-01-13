import { useState } from "react";
import { postGigApi } from "../../apis/gigsAPI";

const usePostGig = () => {
  const [loading, setLoading] = useState(false);

  const postGig = async (data) => {
    setLoading(true);
    try {
      const res = await postGigApi(data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { postGig, loading };
};

export default usePostGig;
