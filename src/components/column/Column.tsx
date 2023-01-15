import { ColumnProps, ColumnType, TaskType } from "../../features/types";
import { Droppable } from "@hello-pangea/dnd";
import { useGetTaskData } from "../../features/tasks/queries";
import Task from "../task/Task";
import { useAddTask, useDeleteTask } from "../../features/tasks/mutations";
import { BiDotsHorizontalRounded } from "react-icons/Bi";
import { useState, useRef } from "react";
import { useDeleteColumn, useUpdateColumnName } from "../../features/columns/mutations";

const Column: React.FC<ColumnProps> = (props) => {
  const { data, error, status, isError } = useGetTaskData(props.column.ID);
  const [columnMenuVisible, setColumnMenuVisible] = useState(false);
  const columnMenuRef = useRef<any>(null);

  const [inputValue, setInputValue] = useState(props.column.name);
  const { mutate } = useAddTask(props.column.ID);
  const { mutate: deleteColumn } = useDeleteColumn(props.column.ID);
  const { mutate: updateColumn } = useUpdateColumnName(props.column.ID);

  const newTask = () => {
    mutate(props.column.ID);
  };

  const columnMenu = (e: any) => {
    setColumnMenuVisible((prev) => !prev);
  };
  if (columnMenuVisible) {
  }
  const columnMenuClose = (e: any) => {
    if (
      columnMenuRef.current &&
      columnMenuVisible &&
      !columnMenuRef.current.contains(e.target)
    ) {
      setColumnMenuVisible(false);
    }
  };
  document.addEventListener("mousedown", columnMenuClose);

  const delColumn = () => {
    deleteColumn(props.column.ID);
  };
  const handleFocus = () => {
    updateColumn(inputValue);
  };
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return status === "success" ? (
    <div className="h-fit first-of-type:ml-3 w-[272px] ">
      <div className="ml-1 mr-1 bg-[#ebecf0] rounded">
        <div className="px-2 py-[10px] flex justify-between">
          <input
            type="text"
            value={inputValue}
            onBlur={handleFocus}
            onChange={handleChange}
            className="bg-[#ebecf0] px-2 w-full"
            autoFocus
          />
          <ul
            className="flex justify-center items-center px-2 w-8 h-8 hover:bg-[#091e4214] rounded"
            onClick={columnMenu}
          >
            <li
              className="relative w-full h-full flex justify-center items-center "
              ref={columnMenuRef}
            >
              <BiDotsHorizontalRounded />
              <ul
                className="absolute bg-white w-[304px] top-8 left-[-8px] z-10 rounded"
                style={{
                  visibility: columnMenuVisible ? "visible" : "hidden",
                  opacity: columnMenuVisible ? 1 : 0,
                }}
              >
                <li>
                  <ul className="flex justify-between border-b-[1px] border-black mx-3">
                    <li></li>
                    <li className="h-10 flex justify-center items-center text-center">
                      List actions
                    </li>
                    <li className="flex items-center justify-center  w-5 h-5 p-5">X</li>
                  </ul>
                </li>
                <li
                  className="h-8 flex items-center mx-3 hover:bg-[#091e4214] mt-2"
                  onClick={newTask}
                >
                  Add card
                </li>
                <li
                  className="h-8 flex items-center mx-3 hover:bg-[#091e4214] mb-2"
                  onClick={delColumn}
                >
                  Delete list
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <Droppable droppableId={props.column.ID.toString()}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? "lightblue" : "#ebecf0",
                  }}
                  className="  min-h-[5px] h-fit max-h-[calc(100vh-185px)]  px-2 overflow-y-auto"
                >
                  {data?.data.tasks.map((task: any, index: any) => (
                    <Task task={task} index={index} key={task.ID} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <button
            className="text-left mx-2 px-2 py-1 h-[28px] hover:bg-[#091e4214] rounded-sm mb-2"
            onClick={newTask}
          >
            + Add card
          </button>
        </div>
      </div>
    </div>
  ) : (
    <h2 className="text-4xl text-center">Loading...</h2>
  );
};

export default Column;
