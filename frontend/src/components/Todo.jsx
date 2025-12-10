import React from "react";

function Todo({ todo }) {
  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo?.description}</p>
    </div>
  );
}

export default Todo;
