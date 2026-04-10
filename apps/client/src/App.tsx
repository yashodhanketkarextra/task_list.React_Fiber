import { useEffect, useState } from "react";
import "./App.css";
import { APIClass } from "./api";
import type { ITask } from "./types/task";
import { AddTasks } from "./components/task/add";
import { ShowTasks } from "./components/task/show";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const api = new APIClass();

function App() {
  const [data, setData] = useState<ITask[]>([]);

  useEffect(() => {
    (async () => {
      await api
        .getData()
        .then((d) => setData(d))
        .catch((e) => console.error(e));
    })();
  }, []);

  return (
    <div id="container">
      <Header />
      <main id="main">
        <h1>Task List</h1>
        <AddTasks setData={setData} api={api} />
        <ShowTasks setData={setData} data={data} api={api} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
