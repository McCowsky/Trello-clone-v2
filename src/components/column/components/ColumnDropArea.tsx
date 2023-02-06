import { Draggable, Droppable } from "@hello-pangea/dnd";
import Task from "../../task/Task";
import { ColumnDetails, ColumnType, TaskType } from "../../../features/types";

const ColumnDropArea: React.FC<{ columnId: number; data: ColumnDetails }> = ({
  columnId,
  data,
}) => {
  return (
    <Droppable droppableId={columnId.toString()} type="column">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? "hover_grey_darker" : "bg_column",
          }}
          className="min-h-[5px] h-fit max-h-[calc(100vh-185px)] px-2 overflow-y-auto"
        >
          {data.tasks.map((task: TaskType, index: number) => (
            <Task task={task} index={index} key={task.ID} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ColumnDropArea;
