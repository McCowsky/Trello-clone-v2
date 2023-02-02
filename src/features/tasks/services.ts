import axios from "axios";
import { QueryFunctionContext } from "react-query";

export const getTasks = (id: QueryFunctionContext) => {
  return axios.get(`/api/columns/${id.queryKey[1]}`);
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
  const res = await axios.post(`/api/columns/${id}/tasks`);
  return await res.data;
};

export const deleteTask = async ([id, taskId]: number[]) => {
  const res = await axios.delete(`/api/columns/${id}/tasks/${taskId}`);
  return await res.data;
};

export const updateTask = async (columnId: number, taskId: number, name: string) => {
  console.log("alfa");

  const res = await axios.patch(`/api/columns/${columnId}/tasks/${taskId}`, {
    name: name,
  });
  //console.log(res.data);

  return await res.data;
};
