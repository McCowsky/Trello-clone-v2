import { Draggable } from '@hello-pangea/dnd';
import { TaskType } from '@/features/types';
import { useDeleteTask } from '@/features/tasks/mutations';
import { useState } from 'react';
import { BsTrash } from 'react-icons/Bs';
import TaskInput from './components/TaskInput';

const Task: React.FC<{
  index: number;
  task: TaskType;
}> = ({ index, task }) => {
  const { mutate: deleteTask } = useDeleteTask(task.columnID, task.ID);
  const [trashVisible, setTrashVisible] = useState(false);

  const removeTask = (): void => {
    deleteTask([task.columnID, task.ID]);
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
              backgroundColor: snapshot.isDragging ? 'transparent' : 'white',
              boxShadow: snapshot.isDragging ? '' : '0 1px 0 0 rgba(9, 30, 66, 0.13 )',
              ...provided.draggableProps.style
            }}
            className="mb-2 w-full  text-text_grey_darker  rounded grid h-full mr-[-100px]">
            <div
              onMouseOver={trashChange}
              onMouseOut={trashChange}
              style={{
                transform: snapshot.isDragging ? 'rotate(5deg)' : ''
              }}
              className="w-full h-full py-2 hover:bg-hover_grey_darker  bg-white flex rounded items-center justify-between">
              <TaskInput columnId={task.columnID} taskId={task.ID} taskName={task.name} />
              <BsTrash
                className="mr-2"
                onClick={removeTask}
                style={{ visibility: trashVisible ? 'visible' : 'hidden' }}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
