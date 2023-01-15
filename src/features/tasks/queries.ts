import { useQuery, useMutation } from "react-query";
import { getTasks } from "./services";

export const useGetTaskData = (id: number) => {
  return useQuery(["taskscolumn", id], getTasks);
};
