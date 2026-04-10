import type React from "react";
import { useState } from "react";
import type { APIClass } from "../../api";
import type { SetDataType } from "../../types/task";

interface IAddTaskForm {
  setData: SetDataType;
  api: APIClass;
}

export const AddTasks = ({ setData, api }: IAddTaskForm) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .addTask(title)
      .then((res) => res.json())
      .then((data) => setData((s) => [...s, data]));
    setTitle("");
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
    </form>
  );
};
