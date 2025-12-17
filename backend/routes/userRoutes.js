import express from "express";
import { registerUser } from "../controllers/userController.js";

const userRoute = express();

userRoute.post("/register", registerUser);

export default userRoute;