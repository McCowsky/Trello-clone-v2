import { useMutation, useQueryClient } from "react-query";
import { moveTask, addTask, deleteTask, updateTask } from "./services";
import { AxiosError } from "axios";
import { TaskMove } from "../types";

export const useMoveTask = (
  sourceColumnId: number,
  taskId: number,
  destColumnId: number,
  sourceOrder: number,
  destOrder: number
) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["movetasks", [sourceColumnId, taskId, destColumnId, sourceOrder, destOrder]],
    moveTask,
    {
      onMutate: async (params) => {
        const colId = params[0];
        const destId = params[2];
        return { colId, destId };
      },
      onSuccess: (err, variables, context) => {
        if (context) {
          queryClient.invalidateQueries({
            queryKey: ["taskscolumn", +context?.colId],
            exact: true,
          });

          queryClient.invalidateQueries({
            queryKey: ["taskscolumn", +context?.destId],
            exact: true,
          });
        }
      },
    }
  );
};

export const useAddTask = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<number, AxiosError, number>(
    ["addtasks", id],
    () => {
      return addTask(id);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["taskscolumn", id],
          exact: true,
        }),
    }
  );
};

export const useDeleteTask = (id: number, taskId: number) => {
  const queryClient = useQueryClient();
  return useMutation<number[], AxiosError, number[]>(
    ["deltasks", [id, taskId]],
    () => {
      return deleteTask([id, taskId]);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["taskscolumn", id],
          exact: true,
        }),
    }
  );
};

export const useUpdateTaskName = (columnId: number, taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    {
      columnId: number;
      taskId: number;
      name: string;
    },
    AxiosError,
    string
  >(
    ["updatecolumn", [columnId, taskId, name]],
    (name) => {
      return updateTask(columnId, taskId, name);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["taskscolumn", columnId],
          exact: true,
        }),
    }
  );
};
