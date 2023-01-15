import axios from "axios";

export const getTasks = (id: any) => {
  return axios.get(`/api/columns/${id.queryKey[1]}`);
};

export const moveTask = ([
  sourceColumnId,
  taskId,
  destColumnId,
  sourceOrder,
  destOrder,
]: any[]) => {
  return axios.post(`/api/columns/${sourceColumnId}/tasks/${taskId}/move`, {
    destinationColumnID: destColumnId,
    taskPositionInSource: sourceOrder,
    taskPositionInDest: destOrder,
  });
};

export const addTask = (id: any) => {
  return axios.post(`/api/columns/${id}/tasks`);
};

export const deleteTask = ([id, taskId]: any[]) => {
  return axios.delete(`/api/columns/${id}/tasks/${taskId}`);
};

export const updateTask = async (columnId: number, taskId: number, name: string) => {
  console.log("alfa");

  const res = await axios.patch(`/api/columns/${columnId}/tasks/${taskId}`, {
    name: name,
  });
  //console.log(res.data);

  return await res.data;
};
