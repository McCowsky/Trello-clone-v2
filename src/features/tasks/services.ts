import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { ColumnDetails, TaskMove } from "../types";

export const getTasks = (id: QueryFunctionContext) => {
  return axios.get<ColumnDetails>(`/api/columns/${id.queryKey[1]}`);
};

export const moveTask = ([
  sourceColumnId,
  taskId,
  destColumnId,
  sourceOrder,
  destOrder,
]: number[]) => {
  return axios.post(`/api/columns/${sourceColumnId}/tasks/${taskId}/move`, {
    destinationColumnID: destColumnId,
    taskPositionInSource: sourceOrder,
    taskPositionInDest: destOrder,
  });
};

export const addTask = async (id: number) => {
  const res = await axios.post<number>(`/api/columns/${id}/tasks`);
  return await res.data;
};

export const deleteTask = async ([id, taskId]: number[]) => {
  const res = await axios.delete<number[]>(`/api/columns/${id}/tasks/${taskId}`);
  return await res.data;
};

export const updateTask = async (columnId: number, taskId: number, name: string) => {
  const res = await axios.patch<{
    columnId: number;
    taskId: number;
    name: string;
  }>(`/api/columns/${columnId}/tasks/${taskId}`, {
    name: name,
  });

  return await res.data;
};
