import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../slices/todoApiSlice";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'

function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [todoCreate] = useCreateTodoMutation();
  const [todoDelete] = useDeleteTodoMutation();

  const { data: todos, refetch } = useGetTodosQuery({userId : '69528e5848d89df0b235a976'});

  const navigate = useNavigate();

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      let res = await todoCreate({ title, description,userId : '69528e5848d89df0b235a976' }).unwrap();
      setTitle("");
      setDescription("");
      refetch();
      toast.success("Todo Added");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error?.data?.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      let res = await todoDelete(id).unwrap();
      refetch();
      toast.success("Todo Deleted");
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
 <div className="home-container">
      <div className="home-header">
        <h1>Welcome 👋</h1>
      </div>

      <div className="todo-layout">
        {/* Todo List */}
        <div className="todo-list">
          {todos?.length === 0 && (
            <div className="empty">No todos added yet</div>
          )}

          {todos?.map((todo) => (
            <div className="todo-card" key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>

              <div className="todo-actions">
                <button
                  className="edit"
                  onClick={() => navigate(`/edit/${todo._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Todo */}
        <div className="todo-form">
          <h2>Add Todo</h2>

          <form onSubmit={createTodo}>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />

            <button type="submit">Add Todo</button>
          </form>
        </div>
      </div>
    </div>  );
}

export default HomePage;
