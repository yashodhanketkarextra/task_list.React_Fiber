import type React from "react";
import { useState } from "react";
import type { APIClass } from "../api";

export const AddTasks = ({
  setState,
  api,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  api: APIClass;
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.addTask(title);
    await setTitle("");
    setState((s) => !s);
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label htmlFor="task">Add a task</label>
      <input
        type="text"
        name="task"
        value={title}
        placeholder="Add a task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
      {/* <div className="task-form-core"> */}
      {/* </div> */}
    </form>
  );
};
