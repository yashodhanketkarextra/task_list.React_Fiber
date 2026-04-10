import type { APIClass } from "../../api";
import type { ITask, SetDataType } from "../../types/task";

interface IShowTasks {
  data: ITask[];
  api: APIClass;
  setData: SetDataType;
}

export const ShowTasks = ({ data, api, setData }: IShowTasks) => {
  if (data.length === 0) return;

  const handleChange = async (id: number, completed: boolean) => {
    await api
      .udpateTask(id, completed)
      .then((d) => d.json())
      .then((d) =>
        setData((s) => {
          const index = s.findIndex((t) => t.id === id);
          s[index].completed = d.completed;
          return [...s];
        }),
      );
  };

  const handleDelete = async (id: number) => {
    await api.deleteTask(id).then((s) => {
      if (s.status === 204) setData((s) => s.filter((t) => t.id !== id));
    });
  };

  return (
    <ul className="task-list">
      {data.map((t) => (
        <li
          className={`task ${t.completed ? "completed" : "pending"}`}
          key={t.id}
        >
          <div className="task-display">
            <p>{t.title}</p>
            <span>{new Date(t.createdAt).toLocaleString()}</span>
          </div>
          <div className="task-control">
            <button onClick={() => handleChange(t.id, t.completed)}>
              {t.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
