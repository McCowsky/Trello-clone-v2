import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "react-query";
import { getTasks } from "./services";

export const useGetTaskData = (id: number) => {
  return useQuery<AxiosResponse, AxiosError, AxiosResponse>(
    ["taskscolumn", id],
    getTasks
  );
};
