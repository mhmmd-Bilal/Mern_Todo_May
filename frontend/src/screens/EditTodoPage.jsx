import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "../slices/todoApiSlice";
import { toast } from "react-toastify";

function EditTodoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  let { id } = useParams();

  const navigate = useNavigate();

  let { data: todo, refetch } = useGetTodoByIdQuery({ id });
  const [updateTodo] = useUpdateTodoMutation();

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await updateTodo({ title, description, isCompleted, id }).unwrap();

      refetch();

      toast.success("edited");
      setTitle("");
      setDescription("");
      setIsCompleted(false);

      navigate("/");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo?.title);
      setDescription(todo?.description);
      setIsCompleted(todo?.isCompleted);
    }
  }, [todo]);

  return (
    <div>
      <h3>Edit Page</h3>
      <form onSubmit={editHandler}>
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

        <select
          value={isCompleted.toString()}
          onChange={(e) => setIsCompleted(e.target.value === "true")}
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditTodoPage;
