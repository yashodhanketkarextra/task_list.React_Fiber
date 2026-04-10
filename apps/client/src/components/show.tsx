import type { APIClass } from "../api";
import type { ITask } from "../types/task";

export const ShowTasks = ({
  data,
  api,
  setState,
}: {
  data: ITask[];
  api: APIClass;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (data.length === 0) return;

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    id: number,
  ) => {
    e.preventDefault();
    await api.udpateTask(id, e.target.checked);
    setState((s) => !s);
  };

  const handleDelete = async (id: number) => {
    await api.deleteTask(id);
    setState((s) => !s);
  };

  return (
    <ul className="task-list">
      {data.map((t) => (
        <li
          className={`task ${t.completed ? "completed" : "pending"}`}
          key={t.id}
        >
          <input
            type="checkbox"
            checked={t.completed}
            onChange={(e) => handleChange(e, t.id)}
          />
          <span>{t.title}</span>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
