import axios from "axios";
import { ColumnMove } from "../types";

export const getColumns = () => {
  return axios.get("/api/columns");
};

export const getColumn = async (id: number) => {
  const res = await axios.get(`/api/columns/${id}`);
  return await res.data;
};

export const addColumn = async () => {
  const res = await axios.post(`/api/columns`);
  return await res.data;
};

export const deleteColumn = async (id: number) => {
  const res = await axios.delete(`/api/columns/${id}`);
  return await res.data;
};

export const updateColumn = async (id: number, name: string) => {
  const res = await axios.patch(`/api/columns/${id}`, {
    name: name,
  });
  return await res.data;
};

export const moveColumn = async ([
  columnId,
  sourcePosition,
  destPosition,
]: ColumnMove[]) => {
  const res = await axios.post(`/api/columns/${columnId}/move`, {
    sourcePosition: sourcePosition,
    destPosition: destPosition,
  });

  return await res.data;
};
