import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ColumnMove } from '../types';
import { addColumn, deleteColumn, updateColumn, moveColumn } from './services';

export const useAddColumn = () => {
  const queryClient = useQueryClient();

  return useMutation<number, AxiosError>(
    'addcolumn',
    () => {
      return addColumn();
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['columns'])
    }
  );
};

export const useDeleteColumn = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<number, AxiosError, number>(
    ['delcolumn', id],
    () => {
      return deleteColumn(id);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['columns'],
          exact: true
        })
    }
  );
};

export const useUpdateColumnName = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    {
      id: number;
      name: string;
    },
    AxiosError,
    string
  >(
    ['updatecolumn', [id, name]],
    (name) => {
      return updateColumn(id, name);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['columns'],
          exact: true
        })
    }
  );
};

export const useMoveColumn = (columnId: number, sourcePosition: number, destPosition: number) => {
  const queryClient = useQueryClient();

  return useMutation<ColumnMove, AxiosError, ColumnMove[]>(
    ['movecolumn', [columnId, sourcePosition, destPosition]],
    moveColumn,
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['columns'],
          exact: true
        })
    }
  );
};
