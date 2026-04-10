import type { APIClass } from "@/api";
import type { ITask, SetDataType } from "@/types/task";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ButtonGroup } from "../ui/button-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface IShowTasksProps {
  data: ITask[];
  api: APIClass;
  setData: SetDataType;
}

interface ITaskCardProps {
  task: ITask;
  handleChange: (id: number, completed: boolean) => void;
  handleDelete: (id: number) => void;
}

interface IDeleteButton {
  task: ITask;
  handleDelete: (id: number) => void;
}

export const ShowTasks = ({ data, api, setData }: IShowTasksProps) => {
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
    <div className="flex flex-row flex-wrap gap-2">
      {data.map((task) => (
        <TaskCard
          task={task}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const TaskCard = ({ task, handleChange, handleDelete }: ITaskCardProps) => {
  return (
    <Card
      className="bg-(--secondary) text-(--accent-foreground) shadow-xs flex-grow
      w-full md:w-1/3  md:max-w-1/2 lg:w-1/4  lg:max-w-1/3"
    >
      <CardHeader>
        <CardTitle>
          <p>{task.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>{task.createdAt}</CardContent>
      <CardFooter>
        <ButtonGroup>
          <Button
            className="xl:w-[20ch]"
            variant={task.completed ? "outline" : "default"}
            onClick={() => handleChange(task.id, task.completed)}
          >
            {task.completed ? "Mark as Pending" : "Mark as Completed"}
          </Button>
          <DeleteButton task={task} handleDelete={handleDelete} />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

const DeleteButton = ({ task, handleDelete }: IDeleteButton) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="xl:w-[20ch]" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete the task</DialogTitle>
          <DialogDescription>
            <p>Are you sure you want to delete following task?</p>
            <p className="font-bold">{task.title}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => handleDelete(task.id)}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
