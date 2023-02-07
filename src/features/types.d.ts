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

export type BoardType = {
  name: string;
};

export type TaskMove = {
  [
    sourceColumnId: number,
    taskId: number,
    destinationColumnID: number,
    taskPositionInSource: number,
    taskPositionInDest: number
  ];
};

export type ColumnMove = {
  [sourceColumnId: number, sourcePosition: number, destPosition: number];
};

export type Params = {
  columnID: string;
  taskID: string;
};
