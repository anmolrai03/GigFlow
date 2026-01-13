import mongoose from "mongoose";

import Bid from '../models/BidModel.js'
import Gig from "../models/GigModel.js";

import { errorResponse, successResponse } from "../utils/responseHandler.js";

// SUBMIT BIDS FOR A GIG
const submitBidController = async (req, res) => {
  const { gigId, message } = req.body;

  try {
    if (!gigId || !message) {
      return errorResponse(
        res,
        400,
        "DATA_INSUFFICIENT",
        "GigId and message are required"
      );
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return errorResponse(res, 404, "GIG_NOT_FOUND", "Gig not found");
    }

    if (gig.status !== "open") {
      return errorResponse(
        res,
        400,
        "GIG_CLOSED",
        "Bidding is closed for this gig"
      );
    }

    if (gig.ownerId.toString() === req.user.id) {
      return errorResponse(
        res,
        403,
        "SELF_BIDDING_NOT_ALLOWED",
        "You cannot bid on your own gig"
      );
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message
    });

    return successResponse(
      res,
      201,
      "BID_SUBMITTED",
      "Bid submitted successfully",
      bid
    );

  } catch (error) {
    console.error("Submit Bid Error:", error);
    return errorResponse(res, 500, "INTERNAL_SERVER_ERROR", "Server error");
  }
};

// GET ALL BIDS FOR A PARTICULAL GIG
const getBidsForGigController = async (req, res) => {
  const { gigId } = req.params;

  try {
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return errorResponse(res, 404, "GIG_NOT_FOUND", "Gig not found");
    }

    if (gig.ownerId.toString() !== req.user.id) {
      return errorResponse(
        res,
        403,
        "FORBIDDEN",
        "You are not allowed to view bids for this gig"
      );
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      "BIDS_FETCHED",
      "Bids fetched successfully",
      bids
    );

  } catch (error) {
    return errorResponse(res, 500, "INTERNAL_SERVER_ERROR", "Server error");
  }
};


const hireController = async (req, res) => {
  const { bidId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(bidId).session(session);

    if (!bid) {
      await session.abortTransaction();
      return errorResponse(res, 404, "BID_NOT_FOUND", "Bid not found");
    }

    const gig = await Gig.findById(bid.gigId).session(session);

    if (!gig) {
      await session.abortTransaction();
      return errorResponse(res, 404, "GIG_NOT_FOUND", "Gig not found");
    }

    if (gig.ownerId.toString() !== req.user.id) {
      await session.abortTransaction();
      return errorResponse(
        res,
        403,
        "FORBIDDEN",
        "You are not allowed to hire for this gig"
      );
    }

    if (gig.status !== "open") {
      await session.abortTransaction();
      return errorResponse(
        res,
        400,
        "GIG_ALREADY_ASSIGNED",
        "This gig is already assigned"
      );
    }

    // Update Gig
    gig.status = "assigned";
    await gig.save({ session });

    //Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    //Reject all other bids
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id }
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return successResponse(
      res,
      200,
      "FREELANCER_HIRED",
      "Freelancer hired successfully"
    );

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Hire Error:", error);
    return errorResponse(res, 500, "INTERNAL_SERVER_ERROR", "Server error");
  }
};


export {submitBidController , getBidsForGigController, hireController};