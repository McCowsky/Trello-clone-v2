import { ColumnProps, ColumnType, TaskType } from "../../features/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useGetTaskData } from "@/features/tasks/queries";
import Task from "../task/Task";
import { useAddTask } from "@/features/tasks/mutations";
import { BiDotsHorizontalRounded, BiRepost } from "react-icons/Bi";
import { useState, useRef } from "react";
import { useDeleteColumn, useUpdateColumnName } from "@/features/columns/mutations";

const Column: React.FC<ColumnProps> = ({ index, column }) => {
  const { data, status } = useGetTaskData(column.ID);
  const [columnMenuVisible, setColumnMenuVisible] = useState(false);
  const columnMenuRef = useRef<HTMLLIElement>(null);

  const [inputValue, setInputValue] = useState(column.name);

  const { mutate: addTask } = useAddTask(column.ID);
  const { mutate: deleteColumn } = useDeleteColumn(column.ID);
  const { mutate: updateColumn } = useUpdateColumnName(column.ID);

  const newTask = (): void => {
    addTask(column.ID);
  };

  const columnMenu = (): void => {
    setColumnMenuVisible((prev) => !prev);
  };

  const columnMenuClose = (event: any): void => {
    if (
      columnMenuRef.current &&
      columnMenuVisible &&
      !columnMenuRef.current.contains(event.target)
    ) {
      setColumnMenuVisible(false);
    }
  };
  document.addEventListener("mousedown", columnMenuClose);

  const delColumn = (): void => {
    deleteColumn(column.ID);
  };
  const handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
    if (column.name !== event.currentTarget.value) updateColumn(inputValue);
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  return status === "success" ? (
    <Draggable draggableId={column.ID.toString()} index={index} key={column.ID}>
      {(provided, snapshot) => (
        <div
          className="h-fit first-of-type:ml-3 w-[272px] "
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div
            style={{
              transform: snapshot.isDragging ? "rotate(5deg)" : "",
            }}
          >
            <div className="ml-1 mr-1 bg-bg_column rounded">
              <div
                className="px-2 py-1 flex justify-between"
                {...provided.dragHandleProps}
              >
                <input
                  type="text"
                  value={inputValue}
                  onBlur={handleFocus}
                  onChange={handleChange}
                  className="bg-bg_column pl-2 h-7 w-full outline-none focus:shadow-[0_0_0_2px_rgba(0,121,191,1)] rounded-[3px] py-[2px]"
                  autoFocus
                />
                <ul
                  className="flex justify-center items-center px-2 w-8 h-8 hover:bg-hover_grey_darker rounded"
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
                        <ul className="flex justify-between border-b-[1px] border-border_grey mx-3 text-text_grey">
                          <li></li>
                          <li className="h-10 flex justify-center items-center text-center">
                            List actions
                          </li>
                          <li className="flex items-center justify-center  w-5 h-5 p-5">
                            X
                          </li>
                        </ul>
                      </li>
                      <li
                        className="h-8 flex items-center mx-3 hover:bg-hover_grey_darker mt-2 text-text_grey"
                        onClick={newTask}
                      >
                        Add card
                      </li>
                      <li
                        className="h-8 flex items-center mx-3 hover:bg-hover_grey_darker mb-2 text-text_grey"
                        onClick={delColumn}
                      >
                        Delete list
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                <Droppable droppableId={column.ID.toString()} type="column">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "hover_grey_darker"
                          : "bg_column",
                      }}
                      className="min-h-[5px] h-fit max-h-[calc(100vh-185px)] px-2 overflow-y-auto"
                    >
                      {data?.data.tasks.map((task: TaskType, index: number) => (
                        <Task task={task} index={index} key={task.ID} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button
                  className="text-left mx-2 px-2 py-1 h-[28px] hover:bg-hover_grey_darker rounded-sm mb-2 flex items-center"
                  onClick={newTask}
                >
                  <span className="text-2xl text-text_grey">
                    + <span className="text-sm ">Add card</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  ) : (
    <h2 className="text-4xl text-center">Loading...</h2>
  );
};

export default Column;
