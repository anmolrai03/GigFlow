import api from "../utils/axios";

// POST /api/bids
export const submitBidApi = (data) => {
  return api.post("/bids", data);
};

// GET /api/bids/:gigId
export const getBidsForGigApi = (gigId) => {
  return api.get(`/bids/${gigId}`);
};

// PATCH /api/bids/:bidId/hire
export const hireBidApi = (bidId) => {
  return api.patch(`/bids/${bidId}/hire`);
};

export const getMyBidsApi = () => {
  return api.get("/bids/my-bids")
}