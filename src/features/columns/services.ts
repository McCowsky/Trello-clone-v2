import axios from 'axios';
import { ColumnMove, ColumnType } from '../types';

export const getColumns = () => {
  return axios.get<ColumnType[]>('/api/columns');
};

export const getColumn = async (id: number) => {
  const res = await axios.get<number>(`/api/columns/${id}`);
  return res.data;
};

export const addColumn = async () => {
  const res = await axios.post<number>(`/api/columns`);
  return res.data;
};

export const deleteColumn = async (id: number) => {
  const res = await axios.delete<number>(`/api/columns/${id}`);
  return res.data;
};

export const updateColumn = async (id: number, name: string) => {
  const res = await axios.patch<{
    id: number;
    name: string;
  }>(`/api/columns/${id}`, {
    name: name
  });
  return res.data;
};

export const moveColumn = async ([columnId, sourcePosition, destPosition]: ColumnMove[]) => {
  const res = await axios.post<ColumnMove>(`/api/columns/${columnId}/move`, {
    sourcePosition: sourcePosition,
    destPosition: destPosition
  });

  return res.data;
};
