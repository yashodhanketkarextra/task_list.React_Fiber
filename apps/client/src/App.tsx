import { useEffect, useState } from "react";
import "./App.css";
import { APIClass } from "./api";
import type { ITask } from "./types/task";
import { AddTasks } from "./components/add";
import { ShowTasks } from "./components/show";

const api = new APIClass();

function App() {
  const [data, setData] = useState<ITask[]>([]);
  const [state, setState] = useState(true);
  const year = new Date().getFullYear();

  useEffect(() => {
    (async () => {
      await api
        .getData()
        .then((d) => setData(d))
        .catch((e) => console.error(e));
    })();
  }, [state]);

  console.log(data);

  return (
    <div id="container">
      <header id="header">Task List</header>
      <main id="main">
        <h1>Task List</h1>
        <AddTasks setState={setState} api={api} />
        <ShowTasks data={data} api={api} setState={setState} />
      </main>
      <footer id="footer">&copy; {year} Yashodhan Ketkar</footer>
    </div>
  );
}

export default App;
