export type ColumnType = {
  ID: number;
  name: string;
  order: number;
};

export interface ColumnDetails extends Column {
  tasks: Task[];
}

export type TaskType = {
  ID: number;
  columnID: number;
  name: string;
  order: number;
};

export type ColumnProps = {
  index: number;
  column: ColumnType; //columnType, w pliku board blad
};

export type TaskProps = {
  index: number;
  task: TaskType;
};
export type TaskMove = {
  sourceColumnId: number;
  taskId: number;
  destinationColumnID: number;
  taskPositionInSource: number;
  taskPositionInDest: number;
};
