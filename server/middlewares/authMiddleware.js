import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return errorResponse(
      res,
      401,
      "UNAUTHORIZED",
      "Authentication required"
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    return errorResponse(
      res,
      401,
      "INVALID_TOKEN",
      "Invalid or expired token"
    );
  }
};

export default authMiddleware;
