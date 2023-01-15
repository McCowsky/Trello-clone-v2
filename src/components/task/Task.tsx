import { Draggable } from "@hello-pangea/dnd";
import { TaskProps } from "../../features/types";
import { useDeleteTask, useUpdateTaskName } from "../../features/tasks/mutations";
import { useState, useRef } from "react";
import { BsPencil } from "react-icons/Bs";
import TextareaAutosize from "react-textarea-autosize";

const Task: React.FC<TaskProps> = (props) => {
  const { mutate } = useDeleteTask(props.task.columnID, props.task.ID);
  const [inputValue, setInputValue] = useState(props.task.name);
  const [taskMenuvisible, setTaskMenuVisible] = useState(false);

  const { mutate: updateTask } = useUpdateTaskName(props.task.columnID, props.task.ID);

  const ref = useRef<HTMLTextAreaElement>(null);
  const taskMenuRef = useRef<any>(null);

  const removeTask = () => {
    mutate([props.task.columnID, props.task.ID]);
  };
  const handleFocus = (event: any) => {
    if (inputValue !== event.target.value) updateTask(inputValue);
  };
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const focus = () => {
    if (ref.current) ref.current.focus();
    setTaskMenuVisible((prev) => !prev);
  };

  const taskMenuClose = (e: any) => {
    if (
      taskMenuRef.current &&
      taskMenuvisible &&
      !taskMenuRef.current.contains(e.target)
    ) {
      setTaskMenuVisible(false);
    }
  };
  document.addEventListener("mousedown", taskMenuClose);

  return (
    <Draggable draggableId={props.task.ID.toString()} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? "transparent" : "white",
              boxShadow: snapshot.isDragging ? "" : "0 1px 0 0 rgba(23, 43, 77, 1)",
              ...provided.draggableProps.style,
            }}
            className="mb-2 w-full  text-[#172B4D]  rounded bg-yellow-400 grid h-full mr-[-100px]"
          >
            <div
              style={{
                pointerEvents: taskMenuvisible ? "none" : "auto",
                backgroundColor: taskMenuvisible
                  ? "white"
                  : snapshot.isDragging
                  ? "white"
                  : "",
                //backgroundColor: snapshot.isDragging ? "white" : "",
                transform: snapshot.isDragging ? "rotate(5deg)" : "",
              }}
              className=" w-full h-full p-2 hover:bg-[#091e4214] bh-white  flex  rounded items-center justify-between "
            >
              {/* <input
                type="text"
                ref={ref}
                value={inputValue}
                onBlur={handleFocus}
                onChange={handleChange}
                className="bg-inherit"
                autoFocus
              /> */}
              <TextareaAutosize
                name=""
                id=""
                rows={1}
                ref={ref}
                value={inputValue}
                onBlur={handleFocus}
                onChange={handleChange}
                className="bg-inherit w-48"
                autoFocus
              />
              <BsPencil className="" onClick={removeTask} />
              {/* <ul
                onClick={removeTask}
                className=" pointer-events-auto pt-1 pr-2 h-full overflow-visible z-30 "
                ref={taskMenuRef}
              >
                <li className="relative w-fit h-fit flex bg-red-400 items-center z-30">
                  <BsPencil className="" />
                  {/* <ul
                    className="absolute left-2 top-0  z-20 bg-black text-white p-2 w-fit "
                    style={
                      {
                        // visibility: taskMenuvisible ? "visible" : "hidden",
                        // display: taskMenuvisible ? "block" : "none",
                        // opacity: taskMenuvisible ? 1 : 0,
                      }
                    }
                  >
                    <li onClick={removeTask} className="">
                      Delete
                    </li>
                  </ul> 
                </li>
              </ul> */}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
