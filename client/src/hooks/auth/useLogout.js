import { logoutApi } from "../../apis/authAPI";

const useLogout = () => {
  const logout = async () => {
    await logoutApi();
  };

  return { logout };
};

export default useLogout;
