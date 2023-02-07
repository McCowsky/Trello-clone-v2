import { ColumnType } from '../../features/types';
import { Draggable } from '@hello-pangea/dnd';
import { useGetTaskData } from '@/features/tasks/queries';
import ColumnNameInput from './components/ColumnNameInput';
import NewTaskButton from './components/NewTaskButton';
import { useAddTask } from '@/features/tasks/mutations';
import ColumnDropArea from './components/ColumnDropArea';
import ColumnMenu from './components/ColumnMenu';

const Column: React.FC<{
  index: number;
  column: ColumnType;
}> = ({ index, column }) => {
  const { data, status } = useGetTaskData(column.ID);
  const { mutate: addTask } = useAddTask(column.ID);

  const newTask = (): void => {
    addTask(column.ID);
  };

  return status === 'success' ? (
    <Draggable draggableId={column.ID.toString()} index={index} key={column.ID}>
      {(provided, snapshot) => (
        <div
          className="h-fit first-of-type:ml-3 w-[272px] "
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style
          }}>
          <div
            style={{
              transform: snapshot.isDragging ? 'rotate(5deg)' : ''
            }}>
            <div className="ml-1 mr-1 bg-bg_column rounded">
              <div className="px-2 py-1 flex justify-between" {...provided.dragHandleProps}>
                <ColumnNameInput columnName={column.name} columnId={column.ID} />
                <ColumnMenu columnId={column.ID} newTask={newTask} />
              </div>
              <div className="flex flex-col">
                <ColumnDropArea columnId={column.ID} data={data?.data} />
                <NewTaskButton newTask={newTask} />
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
