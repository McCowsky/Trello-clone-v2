import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { ColumnType } from "@/features/types";
import Column from "@/components/column/Column";
import { useMoveTask } from "@/features/tasks/mutations";
import { useMoveColumn } from "@/features/columns/mutations";
import BoardNameInput from "./components/BoardNameInput";
import { BoardType } from "@/features/types";
import NewColumnButton from "./components/NewColumnButton";

const Board: React.FC<{
  columnData: ColumnType[];
  boardData: BoardType;
}> = ({ columnData, boardData }) => {
  const { mutate: moveTask } = useMoveTask(100, 200, 300, 400, 500);
  const { mutate: moveColumn } = useMoveColumn(100, 200, 300);

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
          <NewColumnButton />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
