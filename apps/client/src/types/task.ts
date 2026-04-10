import React from "react";

export interface ITask {
  completed: boolean;
  createdAt: string;
  id: number;
  title: string;
}

export type SetDataType = React.Dispatch<React.SetStateAction<ITask[]>>;
