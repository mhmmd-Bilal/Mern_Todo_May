import Users from "../Model/userModel.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const userExists = await Users.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const user = await Users.create({
    name,
    email,
    password: encryptedPassword,
  });

  if (user) {
    return res.status(201).json(user);
  } else {
    return res.status(400).json({ message: "invalid user data" });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  const user = await Users.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json(user);
  } else {
    res.status(404).json({ message: "no accounts matched" });
  }
};

const logoutUser = async (req, res) => {};

export { registerUser, loginUser, logoutUser };
