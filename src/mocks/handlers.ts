import { rest } from "msw";
import {
  ColumnType,
  ColumnDetails,
  TaskType,
  TaskMove,
  ColumnMove,
  BoardType,
  Params,
} from "../features/types";

let BOARD: BoardType = {
  name: "default",
};

let COLUMNS: ColumnType[] = [
  {
    ID: 0,
    name: "TO DO",
    order: 0,
  },
  {
    ID: 1,
    name: "In Progress",
    order: 1,
  },
];

let TASKS: TaskType[] = [
  {
    ID: 100,
    columnID: 0,
    name: "asdasdasdasdasdasd",
    order: 0,
  },
  {
    ID: 101,
    columnID: 1,
    name: "aaaaaaaaaaaaaaaaa",
    order: 0,
  },
  {
    ID: 102,
    columnID: 1,
    name: "cccccccccccccccccccc",
    order: 1,
  },
  {
    ID: 103,
    columnID: 1,
    name: "ddddddddddddddddddddd",
    order: 3,
  },
  {
    ID: 104,
    columnID: 1,
    name: "eeeeeeeeeeeeeeeeeee",
    order: 2,
  },
  {
    ID: 105,
    columnID: 0,
    name: "bbbbbbbbbbbbbbb",
    order: 1,
  },
];

export const handlers = [
  rest.get<BoardType>("/api/board", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json<BoardType>(BOARD));
  }),

  rest.patch("/api/board", async (req, res, ctx) => {
    BOARD.name = (await req.json<BoardType>()).name;
    return res(ctx.status(200));
  }),

  rest.get<ColumnType[]>("/api/columns", async (_, res, ctx) => {
    COLUMNS = COLUMNS.sort((a: ColumnType, b: ColumnType) => a.order - b.order);
    return res(ctx.status(200), ctx.json<ColumnType[]>(COLUMNS));
  }),

  rest.get<ColumnDetails, { ID: string }>("/api/columns/:ID", async (req, res, ctx) => {
    const { ID } = req.params;
    const board: ColumnType | undefined = COLUMNS.find((b) => b.ID === +ID);

    if (!board) {
      return res(ctx.status(404));
    }

    let tasks: TaskType[] = TASKS.filter((item) => item.columnID === +ID);
    tasks = tasks.sort((a: TaskType, b: TaskType) => a.order - b.order);
    return res(
      ctx.status(200),
      ctx.json<ColumnDetails>({
        ...board,
        tasks,
      })
    );
  }),

  rest.post<TaskMove, { ID: string }>(
    "/api/columns/:ID/tasks/:taskID/move",
    async (req, res, ctx) => {
      const { ID: sourceColumnID } = req.params;
      const { destinationColumnID, taskPositionInSource, taskPositionInDest } =
        await req.json<TaskMove>();

      let tasks: TaskType[] = TASKS.filter((item) => item.columnID === +sourceColumnID);
      let tasksDest: TaskType[] = TASKS.filter(
        (item) => item.columnID === +destinationColumnID
      );

      let task: TaskType | undefined = tasks.find(
        (o) => o.order === taskPositionInSource
      );

      task!.order = taskPositionInDest;

      if (+sourceColumnID === +destinationColumnID) {
        if (taskPositionInSource !== taskPositionInDest)
          if (taskPositionInSource === 0) {
            tasks.forEach((item) => {
              if (item.order <= taskPositionInDest && item.ID !== task?.ID) {
                item.order -= 1;
              }
            });
          } else if (taskPositionInSource === tasks.length - 1) {
            tasks.forEach((item) => {
              if (item.order >= taskPositionInDest && item.ID !== task?.ID) {
                item.order += 1;
              }
            });
          } else {
            if (taskPositionInSource < taskPositionInDest) {
              tasks.forEach((item) => {
                if (
                  item.order >= taskPositionInSource &&
                  item.order <= taskPositionInDest &&
                  item.ID !== task?.ID
                ) {
                  item.order -= 1;
                }
              });
            } else {
              tasks.forEach((item) => {
                if (
                  item.order <= taskPositionInSource &&
                  item.order >= taskPositionInDest &&
                  item.ID !== task?.ID
                ) {
                  item.order += 1;
                }
              });
            }
          }
      } else {
        task!.columnID = +destinationColumnID;

        tasks.forEach((item, index) => {
          if (item.order > taskPositionInSource && item.ID !== task?.ID) {
            item.order -= 1;
          }
        });

        tasksDest.forEach((item) => {
          if (item.order >= taskPositionInDest && item.ID !== task?.ID) {
            item.order += 1;
          }
        });
        tasks.forEach((item, index) => {
          if (item.columnID === destinationColumnID) {
            tasks.splice(index, 1);
            tasksDest.push(item);
          }
        });

        TASKS = TASKS.filter(
          (item) =>
            item.columnID !== +sourceColumnID && item.columnID !== +destinationColumnID
        );
        TASKS = TASKS.concat(tasks, tasksDest);
      }
      return res(ctx.status(200));
    }
  ),

  rest.post("/api/columns", async (req, res, ctx) => {
    let columnID: number = Math.max(
      ...COLUMNS.map((o) => {
        return o.ID + 1;
      })
    );
    if (columnID === -Infinity) columnID = 0;

    let columnOrder: number = Math.max(...COLUMNS.map((o) => o.order + 1));
    if (columnOrder === -Infinity) columnOrder = 0;

    COLUMNS.push({
      ID: columnID,
      name: "",
      order: columnOrder,
    });

    return res(ctx.status(200));
  }),

  rest.delete<ColumnType, { ID: string }>("/api/columns/:ID", async (req, res, ctx) => {
    const { ID } = req.params;
    const board: ColumnType | undefined = COLUMNS.find((b) => b.ID === +ID);

    if (!board) {
      return res(ctx.status(404));
    }

    TASKS = TASKS.filter((task) => task.columnID !== +ID);
    COLUMNS = COLUMNS.filter((b) => b.ID !== +ID);

    return res(ctx.status(200));
  }),

  rest.patch<ColumnType, { ID: string }>("/api/columns/:ID", async (req, res, ctx) => {
    const { ID } = req.params;
    const newValues = await req.json<Partial<ColumnType>>();
    const board: ColumnType | undefined = COLUMNS.find((b) => b.ID === +ID);

    if (!board) {
      return res(ctx.status(404));
    }

    COLUMNS = COLUMNS.map((b) => {
      if (b.ID !== +ID) {
        return b;
      }

      return {
        ...b,
        ...newValues,
      };
    });

    return res(ctx.status(200));
  }),

  rest.post<TaskType, { ID: string }>("/api/columns/:ID/tasks", async (req, res, ctx) => {
    const { ID } = req.params;
    let taskID: number = Math.max(
      ...TASKS.map((o) => {
        return o.ID + 1;
      })
    );
    if (taskID === -Infinity) taskID = 100;

    let taskOrder: number = Math.max(
      ...TASKS.map((o) => {
        if (o.columnID === +ID) {
          return o.order + 1;
        }
        return 0;
      })
    );
    if (taskOrder === -Infinity) taskOrder = 0;

    const task: TaskType = {
      ID: taskID,
      name: "",
      order: taskOrder,
      columnID: -1,
    };

    TASKS.push({
      ...task,
      columnID: +ID,
    });

    return res(ctx.status(200));
  }),

  rest.delete<TaskType, { columnID: string; ID: string }>(
    "/api/columns/:columnID/tasks/:ID",
    async (req, res, ctx) => {
      const { columnID, ID } = req.params;

      const task: TaskType | undefined = TASKS.find(
        (b) => b.columnID === +columnID && b.ID === +ID
      );

      if (!task) {
        return res(ctx.status(404));
      }

      TASKS = TASKS.filter((b) => b.columnID !== +columnID || b.ID !== +ID);
      let tasks: TaskType[] = TASKS.filter((item) => item.columnID === +columnID);

      tasks.forEach((item) => {
        if (item.order > task!.order) {
          item.order -= 1;
        }
      });
      TASKS = TASKS.filter((item) => item.columnID !== +columnID);
      TASKS = TASKS.concat(tasks);
      return res(ctx.status(200));
    }
  ),

  rest.patch<TaskType, { columnID: string; ID: string }>(
    "/api/columns/:columnID/tasks/:ID",
    async (req, res, ctx) => {
      const { columnID, ID } = req.params;
      const newValues = await req.json<Partial<TaskType>>();

      const task: TaskType | undefined = TASKS.find(
        (b) => b.columnID === +columnID && b.ID === +ID
      );

      if (!task) {
        return res(ctx.status(404));
      }
      TASKS = TASKS.map((b) => {
        if (b.columnID !== +columnID || b.ID !== +ID) {
          return b;
        }

        return {
          ...b,
          ...newValues,
        };
      });
      return res(ctx.status(200));
    }
  ),

  rest.post<ColumnMove, { ID: string }>(
    "/api/columns/:ID/move",
    async (req, res, ctx) => {
      const { ID } = req.params;
      const { sourcePosition, destPosition } = await req.json();
      const column: ColumnType | undefined = COLUMNS.find((b) => b.ID === +ID);
      column!.order = destPosition;

      if (sourcePosition === 0) {
        COLUMNS.forEach((item) => {
          if (item.order <= destPosition && item.ID !== column?.ID) {
            item.order -= 1;
          }
        });
      } else if (sourcePosition === COLUMNS.length - 1) {
        COLUMNS.forEach((item) => {
          if (item.order >= destPosition && item.ID !== column?.ID) {
            item.order += 1;
          }
        });
      } else {
        if (sourcePosition < destPosition) {
          COLUMNS.forEach((item) => {
            if (
              item.order >= sourcePosition &&
              item.order <= destPosition &&
              item.ID !== column?.ID
            ) {
              item.order -= 1;
            }
          });
        } else {
          COLUMNS.forEach((item) => {
            if (
              item.order <= sourcePosition &&
              item.order >= destPosition &&
              item.ID !== column?.ID
            ) {
              item.order += 1;
            }
          });
        }
      }
      return res(ctx.status(200));
    }
  ),
];
