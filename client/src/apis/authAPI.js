import api from "../utils/axios";

export const registerApi = (data) => {
  return api.post("/auth/register", data);
};

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const logoutApi = () => {
  return api.get("/auth/logout");
};
