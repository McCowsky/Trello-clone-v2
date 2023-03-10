import { Droppable } from '@hello-pangea/dnd';
import { ColumnType } from '@/features/types';
import { Column } from '@/components/column';

const BoardDropArea: React.FC<{ columnData: ColumnType[] }> = ({ columnData }) => {
  return (
    <Droppable droppableId="board" type="board" direction="horizontal">
      {(provided) => (
        <div className="flex w-fit h-fit" ref={provided.innerRef} data-testid="boardDropArea">
          {columnData.map((column: ColumnType, index: number) => (
            <Column column={column} index={index} key={column.ID} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default BoardDropArea;
