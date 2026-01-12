import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Gig from "../models/GigModel.js";


// // GET ALL OPEN GIGS
// const getAllGigsController = async (req, res) => {
//   try {
//     const gigs = await Gig.find({ status: "open" });

//     if (gigs.length === 0) {
//       return successResponse(
//         res,
//         200,
//         "GIGS_DATA_EMPTY",
//         "Currently there are no open gigs",
//         []
//       );
//     }

//     return successResponse(
//       res,
//       200,
//       "GIGS_DATA_SENT",
//       "Gigs data fetched successfully",
//       gigs
//     );

//   } catch (error) {
//     console.error("Error fetching gigs:", error);

//     return errorResponse(
//       res,
//       500,
//       "INTERNAL_SERVER_ERROR",
//       "Server error"
//     );
//   }
// };


// GET ALL OPEN GIGS (WITH OPTIONAL SEARCH)
const getAllGigsController = async (req, res) => {
  const { q } = req.query; // search query (optional)

  try {
    const filter = {
      status: "open"
    };

    // If search query exists, add title filter
    if (q) {
      filter.title = {
        $regex: q.trim(), // anchored search
        $options: "i"           // case-insensitive
      };
    }

    const gigs = await Gig.find(filter)
      .limit(10)
      .select("title description budget status ownerId");

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


// SEARCH GIG BY TITLE (FAST)
// const getGigByTitleController = async (req, res) => {
//   const { gigTitle } = req.params;
//   console.log(gigTitle)

//   if (!gigTitle) {
//     return errorResponse(
//       res,
//       400,
//       "QUERY_REQUIRED",
//       "Gig title is required"
//     );
//   }

//   try {
//     const gigs = await Gig.find({
//       title: {
//         $regex: gigTitle.trim(),
//         $options: "i"
//       },
//       status: "open"
//     })
//       .limit(10)
//       .select("title description budget status ownerId");

//     if (gigs.length === 0) {
//       return successResponse(
//         res,
//         200,
//         "GIGS_DATA_EMPTY",
//         "No matching gigs found",
//         []
//       );
//     }

//     return successResponse(
//       res,
//       200,
//       "GIGS_DATA_SENT",
//       "Matching gigs fetched successfully",
//       gigs
//     );

//   } catch (error) {
//     console.error("Error searching gig:", error);

//     return errorResponse(
//       res,
//       500,
//       "INTERNAL_SERVER_ERROR",
//       "Server error"
//     );
//   }
// };


export {
  getAllGigsController,
  postGigController,
  // getGigByTitleController
};
