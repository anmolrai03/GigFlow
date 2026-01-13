import express from "express";
import {submitBidController , getBidsForGigController, hireController} from '../controllers/bidController.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Bids POST /api/bids Submit a bid for a gig.
// Bids GET /api/bids/:gigId Get all bids for a specific gig (Owner only).
// Hiring PATCH /api/bids/:bidId/hire The "Hire" logic (Atomic update).

router.post("/" ,authMiddleware, submitBidController);
router.get("/:gigId" ,authMiddleware, getBidsForGigController);
router.patch("/:bidId/hire",authMiddleware, hireController);

export default router;