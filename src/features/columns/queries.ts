import { useQuery } from "react-query";
import { getColumns, getColumn } from "./services";

export const useGetColumnsData = () => {
  return useQuery("columns", getColumns);
};
export const useGetColumnData = (id: string) => {
  return useQuery(["column", id], getColumn);
};
