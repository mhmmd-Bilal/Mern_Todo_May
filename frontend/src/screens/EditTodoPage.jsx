import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "../slices/todoApiSlice";
import { toast } from "react-toastify";
import './EditTodoPage.css'

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
 <div className="edit-container">
      <div className="edit-card">
        <h3>Edit Todo</h3>

        <form onSubmit={editHandler}>
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

          <div className="status-row">
            <label>Status</label>
            <select
              value={isCompleted.toString()}
              onChange={(e) => setIsCompleted(e.target.value === "true")}
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="edit-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>  );
}

export default EditTodoPage;
