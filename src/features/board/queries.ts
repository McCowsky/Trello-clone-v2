import { useQuery } from "react-query";
import { getBoard } from "./services";
import { AxiosError, AxiosResponse } from "axios";

export const useGetBoardName = () => {
  return useQuery<AxiosResponse, AxiosError>("board", getBoard);
};
