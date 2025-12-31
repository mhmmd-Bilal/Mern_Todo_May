// Import User model to interact with users collection in MongoDB
import Users from "../Model/userModel.js";

// Import bcrypt for hashing and comparing passwords
import bcrypt from "bcrypt";

// Import jsonwebtoken for creating JWT tokens
import jwt from "jsonwebtoken";

/* ================================
   REGISTER USER CONTROLLER
   ================================ */
const registerUser = async (req, res) => {

  // Destructure name, email, and password from request body
  // Data comes from frontend registration form
  let { name, email, password } = req.body;

  // Generate salt for hashing password
  // 10 is the recommended number of rounds (security vs performance)
  const salt = await bcrypt.genSalt(10);

  // Hash the password using generated salt
  // This ensures password is not stored in plain text
  const encryptedPassword = await bcrypt.hash(password, salt);

  // Check if a user already exists with the given email
  const userExists = await Users.findOne({ email: email });

  // If user already exists, stop registration
  if (userExists) {
    return res.status(400).json({
      message: "user already exists"
    });
  }

  // Create new user in database
  const user = await Users.create({
    name,
    email,
    password: encryptedPassword, // store hashed password
  });

  // If user is created successfully
  if (user) {
    // 201 = resource created successfully
    return res.status(201).json(user);
  } else {
    // If user creation fails
    return res.status(400).json({
      message: "invalid user data"
    });
  }
};

/* ================================
   LOGIN USER CONTROLLER
   ================================ */
const loginUser = async (req, res) => {

  // Get email and password from request body
  let { email, password } = req.body;

  // Find user by email
  const user = await Users.findOne({ email: email });

  // Check if user exists AND password matches
  // matchPassword is usually a method defined in user schema
  if (user && (await user.matchPassword(password))) {

    // Create JWT token
    // Payload contains userId
    // Token expires in 30 days
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // Store token in HTTP-only cookie
    // httpOnly: prevents JS access (security)
    // sameSite: strict prevents CSRF attacks
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send user data as response (without password)
    res.json(user);

  } else {
    // If email or password is incorrect
    res.status(404).json({
      message: "no accounts matched"
    });
  }
};

/* ================================
   LOGOUT USER CONTROLLER
   ================================ */
const logoutUser = async (req, res) => {

  // Clear the JWT cookie
  // Setting maxAge to 0 removes the cookie immediately
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Send success response
  res.json({
    message: "User logged out successfully"
  });
};

// Export controllers so they can be used in routes
export { registerUser, loginUser, logoutUser };
