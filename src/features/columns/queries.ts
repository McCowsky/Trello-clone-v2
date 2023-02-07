import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { getColumns, getColumn } from './services';
import { ColumnType } from '../types';

export const useGetColumnsData = () => {
  return useQuery<AxiosResponse<ColumnType[]>, AxiosError>('columns', () => {
    return getColumns();
  });
};
export const useGetColumnData = (id: number) => {
  return useQuery<number, AxiosError, number>(['column', id], () => {
    return getColumn(id);
  });
};
