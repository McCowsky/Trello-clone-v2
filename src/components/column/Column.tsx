import { ColumnType, TaskType } from "../../features/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useGetTaskData } from "@/features/tasks/queries";
import { BiDotsHorizontalRounded, BiRepost } from "react-icons/Bi";
import { useState, useRef, useEffect } from "react";
import { useDeleteColumn } from "@/features/columns/mutations";
import ColumnNameInput from "./components/ColumnNameInput";
import NewTaskButton from "./components/NewTaskButton";
import { useAddTask } from "@/features/tasks/mutations";
import ColumnDropArea from "./components/ColumnDropArea";

const Column: React.FC<{
  index: number;
  column: ColumnType;
}> = ({ index, column }) => {
  const { data, status } = useGetTaskData(column.ID);
  const [columnMenuVisible, setColumnMenuVisible] = useState(false);
  const columnMenuRef = useRef<HTMLLIElement>(null);
  const { mutate: deleteColumn } = useDeleteColumn(column.ID);
  const { mutate: addTask } = useAddTask(column.ID);

  const columnMenu = (): void => {
    setColumnMenuVisible((prev) => !prev);
  };

  const columnMenuClose = (event: MouseEvent): void => {
    if (
      columnMenuRef.current &&
      columnMenuVisible &&
      !columnMenuRef.current.contains(event.target as Node)
    ) {
      setColumnMenuVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", columnMenuClose);
    return () => document.removeEventListener("mousedown", columnMenuClose);
  });

  const delColumn = (): void => {
    deleteColumn(column.ID);
  };
  const newTask = (): void => {
    addTask(column.ID);
  };
  console.log(data?.data);
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
                <ColumnNameInput columnName={column.name} columnId={column.ID} />

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
                <ColumnDropArea columnId={column.ID} data={data!.data} />
                <NewTaskButton columnId={column.ID} newTask={newTask} />
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
