import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { ColumnType } from "@/features/types";
import Column from "@/components/column/Column";
import { useMoveTask } from "@/features/tasks/mutations";
import { useAddColumn, useMoveColumn } from "@/features/columns/mutations";
import BoardNameInput from "./components/BoardNameInput";
import { BoardType } from "@/features/types";

const Board: React.FC<{
  columnData: ColumnType[];
  boardData: BoardType;
}> = ({ columnData, boardData }) => {
  const { mutate: moveTask } = useMoveTask(100, 200, 300, 400, 500);
  const { mutate: moveColumn } = useMoveColumn(100, 200, 300);
  const { mutate: addColumn } = useAddColumn();

  const newColumn = (): void => {
    addColumn();
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId, type } = result;

    if (
      source.index === destination?.index &&
      source.droppableId === destination.droppableId
    )
      return;
    if (type === "board") {
      moveColumn([+draggableId, source.index, destination!.index]);
    }

    if (type === "column") {
      if (!destination) return;

      moveTask([
        +source.droppableId,
        +draggableId,
        +destination.droppableId,
        source.index,
        destination.index,
      ]);
    }
  };

  return (
    <div className="board h-full bg-inherit flex flex-col text-sm">
      <div className="pl-8 py-2">
        <BoardNameInput boardName={boardData.name} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full px-4">
          <Droppable droppableId="board" type="board" direction="horizontal">
            {(provided, snapshot) => (
              <div className="flex w-fit h-fit" ref={provided.innerRef}>
                {columnData.map((column: ColumnType, index: number) => (
                  <Column column={column} index={index} key={column.ID} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button
            className="bg-white/[0.24] text-white p-1 ml-1 mr-2 w-[272px] h-10 hover:bg-white/30 text-left rounded flex items-center"
            onClick={newColumn}
          >
            <span className="text-2xl relative">
              +<span className="text-sm">Add another list</span>
            </span>
          </button>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
