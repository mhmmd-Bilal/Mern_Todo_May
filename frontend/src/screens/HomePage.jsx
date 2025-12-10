import React, { useEffect, useState } from "react";
import axios from "../axios";
import Todo from "../components/Todo";
import { toast } from "react-toastify";

function HomePage() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTodos = async () => {
    try {
      const res = await axios.get();
      setTodos(res.data);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/create", { title, description });
      setTitle("");
      setDescription("");
      toast.success("Todo Added");
      getTodos();
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error?.data?.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      let res = await axios.delete(`/delete/${id}`);
      getTodos();
      toast.success("Todo Deleted");
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Welcome </h1>

      {todos?.map((todo, index) => (
        <>
          <div key={index}>
            <h3>{todo.title}</h3>
            <p>{todo?.description}</p>
            <button onClick={() => deleteTodo(todo._id)}>delete</button>
            <button>edit</button>
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
