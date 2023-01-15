import { useMutation, useQueryClient } from "react-query";
import { moveTask, addTask, deleteTask, updateTask } from "./services";
import { AxiosError } from "axios";

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
        queryClient.invalidateQueries({
          queryKey: ["taskscolumn", +context?.colId],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["taskscolumn", +context?.destId],
          exact: true,
        });
      },
    }
  );
};

export const useAddTask = (id: any) => {
  const queryClient = useQueryClient();
  return useMutation(["addtasks", id], addTask, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["taskscolumn", id],
        exact: true,
      }),
  });
};

export const useDeleteTask = (id: any, taskId: any) => {
  const queryClient = useQueryClient();
  return useMutation(["deltasks", [id, taskId]], deleteTask, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["taskscolumn", id],
        exact: true,
      }),
  });
};

interface MyData {
  columnId: number;
  taskId: number;
  name: string;
}

export const useUpdateTaskName = (columnId: number, taskId: number) => {
  const queryClient = useQueryClient();
  console.log("kappa");

  // <MyData, AxiosError, MyData>
  return useMutation<MyData, AxiosError, string>(
    ["updatecolumn", [columnId, taskId, name]],
    (name) => {
      return updateTask(columnId, taskId, name);
    }
    // {
    //   onSuccess: () =>
    //     queryClient.invalidateQueries({
    //       queryKey: ["column", id],
    //       exact: true,
    //     }),
    // }
  );
};
