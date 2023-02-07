import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { updateBoard } from './services';

export const useChangeBoardName = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, string>(
    ['updateboard', [name]],
    (name) => {
      return updateBoard(name);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['board'],
          exact: true
        })
    }
  );
};
