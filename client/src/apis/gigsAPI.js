import api from "../utils/axios";

// GET /api/gigs?q=react
export const getGigsApi = (query = "") => {
  return api.get(`/gigs${query ? `?q=${query}` : ""}`);
};

// POST /api/gigs
export const postGigApi = (data) => {
  return api.post("/gigs/", data);
};
