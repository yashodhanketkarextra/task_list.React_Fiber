import { useEffect, useState } from "react";
import { APIClass } from "@/api";
import type { ITask } from "@/types/task";
import { AddTasks } from "@/components/task/add";
import { ShowTasks } from "@/components/task/show";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Separator } from "./components/ui/separator";

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
    <div className="flex flex-col min-h-screen bg-(--muted) text-(--muted-foreground)">
      <Header />
      <main className="flex-1 mt-4 mb-auto mx-auto p-4 container bg-(--background) text-(--foreground) rounded-xl">
        <h1 className="text-4xl font-bold">Task List</h1>
        <Separator className="my-4" />
        <AddTasks setData={setData} api={api} />
        <Separator className="my-4" />
        <ShowTasks setData={setData} data={data} api={api} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
