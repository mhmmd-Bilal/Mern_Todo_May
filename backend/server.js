import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors'
import todoRoute from "./routes/todoRoutes.js";
import userRoute from "./routes/userRoutes.js";

dotenv.config();   

const app = express();

connectDb();

let port = process.env.PORT;

// app.httpMethod(url,handler)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// http://localhost:4000/api/todo
app.use('/api/todo' , todoRoute) // todo related request must start with /api/todo

// http://localhost:4000/api/user
app.use('/api/user',userRoute)


app.listen(port, () => console.log("server started"));
// BPFARg6bh4sCrJD5
