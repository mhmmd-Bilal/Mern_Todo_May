// Import jsonwebtoken package
// This is used to verify and decode JWT tokens
import jwt from "jsonwebtoken";

// Import User model from MongoDB
// This helps us fetch user details from the database
import Users from "../Model/userModel.js";

// protect middleware
// This middleware protects private routes
// It checks whether the user is authenticated or not
const protect = async (req, res, next) => {

  // Get JWT token from cookies
  // The token is usually stored as "jwt" when user logs in
  let token = req.cookies.jwt;

  // If token does not exist, user is not logged in
  if (!token) {
    // Send Unauthorized response
    return res.status(401).json({
      message: "Not authorized, no token"
    });
  }

  try {
    // Verify the token using secret key
    // If token is valid, decoded data will be returned
    // If invalid or expired, it will throw an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded contains payload data like userId
    // Use userId to find the user in database
    // select("-password") removes password from result for security
    const user = await Users.findById(decoded.userId).select("-password");

    // If no user found with this ID
    // (possible if user was deleted but token still exists)
    if (!user) {
      return res.status(401).json({
        message: "User Not Found"
      });
    }

    // Attach user data to request object
    // This makes user data accessible in next middleware/controllers
    // Example: req.user.name, req.user.email
    req.user = user;

    // Call next() to move to the next middleware or controller
    next();

  } catch (error) {
    // If token verification fails or any error occurs
    console.error(error);

    // Send Unauthorized response
    return res.status(401).json({
      message: "Not authorized, token failed"
    });
  }
};

// Export protect middleware so it can be used in routes
// Example usage:
// router.get("/profile", protect, getUserProfile);
export { protect };
