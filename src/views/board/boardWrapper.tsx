import { useGetColumnsData } from '../../features/columns/queries';
import { useGetBoardName } from '../../features/board/queries';
import Board from './Board';

const BoardWrapper: React.FC = () => {
  const { data: columnData, error: columnError, isLoading: isLoadingColumn } = useGetColumnsData();

  const { data: boardData, error: boardError, isLoading: isLoadingBoard } = useGetBoardName();
  if (isLoadingColumn || isLoadingBoard) return <div>&quot;Loading...&quot;</div>;
  if (columnError) return <div>`Error! ${columnError.message}`</div>;
  if (boardError) return <div>`Error! ${boardError.message}`</div>;
  if (columnData === undefined) return <div>Error! columnData undefined</div>;
  return <Board columnData={columnData.data} boardData={boardData?.data} />;
};

export default BoardWrapper;
