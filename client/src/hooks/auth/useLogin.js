import { useState } from "react";
import { loginApi } from "../../apis/authAPI";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginApi(data);
      return res.data;

    } catch (err) {
      setError(err.response?.data);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
