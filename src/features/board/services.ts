import axios from "axios";

export const getBoard = () => {
  return axios.get("/api/board");
};

export const updateBoard = async (name: string) => {
  const res = await axios.patch(`/api/board`, {
    name: name,
  });

  return await res.data;
};
