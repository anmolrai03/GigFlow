import { useState } from "react";
import { submitBidApi } from "../../apis/bidsAPI";

const useSubmitBid = () => {
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState();

  const submitBid = async (data) => {

    setLoading(true);
    setError('');

    try {
      const res = await submitBidApi(data);
      return res.data;
    } catch(error){
      // console.log(error?.response?.data?.message);
      setError(error?.response?.data);
    }finally {
      setLoading(false);
    }

  };

  return { submitBid, loading, error };
};

export default useSubmitBid;
