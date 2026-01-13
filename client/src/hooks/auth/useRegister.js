import { useState } from "react";
import { registerApi } from "../../apis/authAPI";


const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await registerApi(data);
      return res.data;

    } catch (err) {
      setError(err.response?.data);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
