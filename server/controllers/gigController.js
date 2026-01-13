import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Gig from "../models/GigModel.js";

// GET ALL OPEN GIGS (WITH OPTIONAL SEARCH)
const getAllGigsController = async (req, res) => {

  const { q } = req.query; // search query (optional)

  try {
    const filter = {};

    // If search query exists, add title filter
    if (q && q.trim() !== "") {
      filter.title = {
        $regex: q.trim(), // anchored search
        $options: "i"           // case-insensitive
      };
    }

    const gigs = await Gig.find(filter)
      .sort({ createdAt: -1 }) // latest first (optional but good UX)
      .limit(20)
      .select("title description budget status ownerId createdAt");

    // const gigs = await Gig.find({});

    if (gigs.length === 0) {
      return successResponse(
        res,
        200,
        "GIGS_DATA_EMPTY",
        "No gigs found",
        []
      );
    }

    return successResponse(
      res,
      200,
      "GIGS_DATA_SENT",
      "Gigs fetched successfully",
      gigs
    );

  } catch (error) {
    console.error("Error fetching gigs:", error);

    return errorResponse(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Server error"
    );
  }
};

// POST A NEW GIG
const postGigController = async (req, res) => {
  const { title, description, budget } = req.body;

  try {
    // basic validation
    const errors = [];
    if (!title) errors.push({ field: "title", message: "Title is required" });
    if (!description) errors.push({ field: "description", message: "Description is required" });
    if (!budget) errors.push({ field: "budget", message: "Budget is required" });

    if (errors.length > 0) {
      return errorResponse(
        res,
        400,
        "DATA_INSUFFICIENT",
        "Insufficient data received",
        errors
      );
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id
    });

    return successResponse(
      res,
      201,
      "GIG_CREATED_SUCCESSFULLY",
      "Gig posted successfully",
      gig
    );

  } catch (error) {
    console.error("Error creating gig:", error);

    return errorResponse(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Server error"
    );
  }
};


export {
  getAllGigsController,
  postGigController,
};
