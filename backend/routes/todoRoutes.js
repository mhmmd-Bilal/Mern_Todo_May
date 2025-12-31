import express from "express";

const todoRoute = express.Router();
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

// http://localhost:4000/api/todo
todoRoute.get("/", protect, getTodos);

// http://localhost:4000/api/todo/create
todoRoute.post("/create", protect, addTodo);

// http://localhost:4000/api/todo/delete/82374873242hb32g3
todoRoute.delete("/delete/:id", protect, deleteTodo);

// http://localhost:4000/api/todo/getTodo
todoRoute.get("/getTodo", protect, getTodoById);

todoRoute.patch("/updateTodo", protect, updateTodo);

export default todoRoute;
