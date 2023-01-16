import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { ColumnType, ColumnDetails, TaskType } from "../../features/types";
import { useGetColumnsData, useGetColumnData } from "../../features/columns/queries";
import Column from "../../components/column/Column";
import { useMoveTask } from "../../features/tasks/mutations";
import { useAddColumn, useMoveColumn } from "../../features/columns/mutations";

const Board = () => {
  const { data, error, status } = useGetColumnsData();

  const { mutate } = useMoveTask(100, 200, 300, 400, 500);
  const { mutate: moveColumn } = useMoveColumn(100, 200, 300);
  const { mutate: addColumn } = useAddColumn();

  const newColumn = () => {
    addColumn();
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId, type } = result;
    if (source.index === destination?.index) return;
    if (type === "board") {
      moveColumn([draggableId, source.index, destination?.index]);
    }
    if (type === "column") {
      if (!destination) return;
      mutate([
        source.droppableId,
        draggableId,
        destination.droppableId,
        source.index,
        destination.index,
      ]);
    }
  };

  return status === "success" ? (
    <div className="board h-full bg-inherit flex flex-col">
      <div className="pl-8 py-2">
        <input type="text" className="h-8 bg-inherit w-fit " />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full px-4">
          <Droppable droppableId="board" type="board" direction="horizontal">
            {(provided, snapshot) => (
              <div className="flex w-fit h-fit" ref={provided.innerRef}>
                {data?.data.map((column: any, index: any) => (
                  <Column column={column} index={index} key={column.ID} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button
            className="bg-white/[0.24] text-white p-1 ml-1 mr-2 w-[272px] h-10 hover:bg-white/30 text-left rounded"
            onClick={newColumn}
          >
            + Add another list
          </button>
        </div>
      </DragDropContext>
    </div>
  ) : (
    <h2 className="text-4xl text-center">Loading...</h2>
  );
};

export default Board;
