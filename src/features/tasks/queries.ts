import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { getTasks } from "./services";
import { ColumnDetails } from "../types";

export const useGetTaskData = (id: number) => {
  return useQuery<AxiosResponse<ColumnDetails>, AxiosError, AxiosResponse<ColumnDetails>>(
    ["taskscolumn", id],
    getTasks
  );
};
