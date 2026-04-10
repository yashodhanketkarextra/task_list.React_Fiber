import type React from "react";
import { useState } from "react";
import type { APIClass } from "@/api";
import type { SetDataType } from "@/types/task";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { ButtonGroup } from "../ui/button-group";

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
    <form onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="task">Create a task</FieldLabel>
        <ButtonGroup>
          <Input
            id="task"
            type="text"
            value={title}
            placeholder="Add a task"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button typeof="submit" variant="default">
            Add
          </Button>
        </ButtonGroup>
        <FieldDescription>Enter task title</FieldDescription>
      </Field>
    </form>
  );
};
