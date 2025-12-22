import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRoute = express();

userRoute.post('/',loginUser)
userRoute.post("/register", registerUser);

export default userRoute;