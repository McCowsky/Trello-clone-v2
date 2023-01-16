import { AxiosError } from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { addColumn, deleteColumn, updateColumn, moveColumn } from "./services";

export const useAddColumn = () => {
  const queryClient = useQueryClient();

  return useMutation("addcolumn", addColumn, {
    onSuccess: () => queryClient.invalidateQueries(["columns"]),
  });
};

export const useDeleteColumn = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(["delcolumn", id], deleteColumn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["columns"],
        exact: true,
      }),
  });
};
interface MyData {
  id: number;
  name: string;
}

export const useUpdateColumnName = (id: number) => {
  const queryClient = useQueryClient();
  //console.log("kappa");

  // <MyData, AxiosError, MyData>
  return useMutation<MyData, AxiosError, string>(
    ["updatecolumn", [id, name]],
    (name) => {
      return updateColumn(id, name);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["column", id],
          exact: true,
        }),
    }
  );
};

export const useMoveColumn = (columnId: any, sourcePosition: any, destPosition: any) => {
  const queryClient = useQueryClient();
  //console.log(destPosition);

  return useMutation(
    ["movecolumn", [columnId, sourcePosition, destPosition]],
    moveColumn,
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ["columns"],
          exact: true,
        }),
    }
  );
};
