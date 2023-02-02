import { Draggable } from "@hello-pangea/dnd";
import { TaskProps } from "@/features/types";
import { useDeleteTask, useUpdateTaskName } from "@/features/tasks/mutations";
import { useState, useRef } from "react";
import { BsTrash } from "react-icons/Bs";
import TextareaAutosize from "react-textarea-autosize";

const Task: React.FC<TaskProps> = ({ index, task }) => {
  const { mutate: deleteTask } = useDeleteTask(task.columnID, task.ID);
  const { mutate: updateTask } = useUpdateTaskName(task.columnID, task.ID);
  const [inputValue, setInputValue] = useState(task.name);
  const [taskMenuvisible, setTaskMenuVisible] = useState(false);
  const [trashVisible, setTrashVisible] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);
  const taskMenuRef = useRef<HTMLLIElement>(null);

  const removeTask = (): void => {
    deleteTask([task.columnID, task.ID]);
  };
  const handleFocus = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    if (task.name !== event.currentTarget.value) updateTask(inputValue);
  };
  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  const trashChange = () => {
    setTrashVisible((prev) => !prev);
  };

  return (
    <Draggable draggableId={task.ID.toString()} index={index} key={task.ID}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? "transparent" : "white",
              boxShadow: snapshot.isDragging ? "" : "0 1px 0 0 rgba(9, 30, 66, 0.13 )",
              ...provided.draggableProps.style,
            }}
            className="mb-2 w-full  text-text_grey_darker  rounded grid h-full mr-[-100px]"
          >
            <div
              onMouseOver={trashChange}
              onMouseOut={trashChange}
              style={{
                pointerEvents: taskMenuvisible ? "none" : "auto",
                backgroundColor: taskMenuvisible
                  ? "white"
                  : snapshot.isDragging
                  ? "white"
                  : "",
                transform: snapshot.isDragging ? "rotate(5deg)" : "",
              }}
              className="w-full h-full p-2 hover:bg-hover_grey_darker  bg-white flex rounded items-center justify-between"
            >
              <TextareaAutosize
                rows={1}
                ref={ref}
                value={inputValue}
                onBlur={handleFocus}
                onChange={handleChange}
                className="bg-inherit w-48 resize-none outline-none focus:shadow-[0_0_0_2px_rgba(0,121,191,1)] rounded-[3px] text-text_grey"
                autoFocus
              />
              <BsTrash
                className=""
                onClick={removeTask}
                style={{ visibility: trashVisible ? "visible" : "hidden" }}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
