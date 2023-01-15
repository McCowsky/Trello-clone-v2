import axios from "axios";

export const getColumns = () => {
  return axios.get("/api/columns");
};

export const getColumn = (id: any) => {
  return axios.get(`/api/columns/${id}`);
};

export const addColumn = () => {
  return axios.post(`/api/columns`);
};

export const deleteColumn = (id: number) => {
  return axios.delete(`/api/columns/${id}`);
};

export const updateColumn = async (id: number, name: string) => {
  console.log("alfa");

  const res = await axios.patch(`/api/columns/${id}`, {
    name: name,
  });
  //console.log(res.data);

  return await res.data;
};
