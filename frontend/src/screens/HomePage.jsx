import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../slices/todoApiSlice";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [todoCreate] = useCreateTodoMutation();
  const [todoDelete] = useDeleteTodoMutation();

  const { data: todos, refetch } = useGetTodosQuery();

  const navigate = useNavigate();

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      let res = await todoCreate({ title, description }).unwrap();
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
    <div>
      <h1>Welcome </h1>

      {todos?.map((todo, index) => (
        <>
          <div key={index}>
            <h3>{todo.title}</h3>
            <p>{todo?.description}</p>
            <button onClick={() => deleteTodo(todo._id)}>delete</button>
            <button onClick={() => navigate(`/edit/${todo._id}`)}>edit</button>
          </div>
        </>
      ))}

      <div>
        <form onSubmit={createTodo}>
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
