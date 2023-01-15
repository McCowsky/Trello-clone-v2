import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { ColumnType, ColumnDetails, TaskType } from "../../features/types";
import { useGetColumnsData, useGetColumnData } from "../../features/columns/queries";
import Column from "../../components/column/Column";
import { useMoveTask } from "../../features/tasks/mutations";
import { useAddColumn } from "../../features/columns/mutations";

const Board = () => {
  const { data, error, status } = useGetColumnsData();

  const { mutate } = useMoveTask(1, 2, 3, 4, 5);
  const { mutate: addColumn } = useAddColumn();

  const newColumn = () => {
    addColumn();
  };

  // const onDragStart = (start) => {
  //   const { draggableId } = start;
  //   console.log(draggableId);
  //   document.getElementById(draggableId)!.style.color = "green";
  // };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    //if (source.index === destination.index) return;
    mutate([
      source.droppableId,
      draggableId,
      destination.droppableId,
      source.index,
      destination.index,
    ]);

    if (source.droppableId === destination.droppableId) {
    }
  };

  return status === "success" ? (
    <div className="board h-full bg-inherit flex flex-col">
      <div className="pl-8 py-2">
        <input type="text" className="h-8 bg-inherit w-fit " />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full px-4">
          {data?.data.map((column: any, index: any) => (
            <Column column={column} index={index} key={column.ID} />
          ))}
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
