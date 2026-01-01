// Import Todo model to interact with todos collection in MongoDB
import Todos from "../Model/todoModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/* ================================
   ADD TODO CONTROLLER
   ================================ */
const addTodo = asyncHandler(async (req, res) => {
  // Earlier way of reading data from request body
  // let title = req.body.title
  // let description = req.body.description

  // Destructure title, description, and userId from request body
  // userId is used to link todo with a specific user
  let { title, description, userId } = req.body;

  // Create a new todo document in database
  const todo = await Todos.create({
    title,
    description,
    userId,
  });

  // Send created todo as response
  res.send(todo);
});

/* ================================
   GET ALL TODOS (USER-WISE)
   ================================ */
const getTodos = asyncHandler(async (req, res) => {
  // Read userId from query parameters
  // Example request: /api/todos?userId=123
  let todos = await Todos.find({
    userId: req.query.userId,
  });

  // Send list of todos for that user
  res.send(todos);
});

/* ================================
   DELETE TODO BY ID
   ================================ */
const deleteTodo = asyncHandler(async (req, res) => {
  // Get todo id from URL params
  // Example route: /api/todos/:id
  const deleted = await Todos.findByIdAndDelete(req.params.id);

  // If todo not found
  if (!deleted) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }

  // If deletion successful
  res.json({
    message: "Todo deleted successfully",
  });
});

/* ================================
   GET SINGLE TODO BY ID
   ================================ */
const getTodoById = asyncHandler(async (req, res) => {
  // Get todo id from query parameters
  // Example request: /api/todo?id=123
  const todo = await Todos.findById(req.query.id);

  // If todo does not exist
  if (!todo) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }

  // Send todo data
  res.json(todo);
});

/* ================================
   UPDATE TODO
   ================================ */
const updateTodo = asyncHandler(async (req, res) => {
  // Destructure updated fields from request body
  // id is required to know which todo to update
  const { title, description, isCompleted, id } = req.body;

  // Find todo by ID and update it
  // new: true returns the updated document
  const updatedTodo = await Todos.findByIdAndUpdate(
    id,
    { title, description, isCompleted },
    { new: true }
  );

  // If todo not found
  if (!updatedTodo) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }

  // Send updated todo as response
  return res.json(updatedTodo);
});

// Export all controllers to use in routes
export { addTodo, getTodos, deleteTodo, getTodoById, updateTodo };
