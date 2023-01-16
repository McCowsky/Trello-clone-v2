import { rest } from "msw";
import { ColumnType, ColumnDetails, TaskType, TaskMove } from "../features/types";

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

type TaskMoveParams = {
  taskID: string;
  ID: string;
};

type GetParams = {
  ID: string;
};

type ColumnMove = {
  sourceColumnId: number;
  sourcePosition: number;
  destPosition: number;
};

type ColumnkMoveParams = {
  ID: string;
};

export const handlers = [
  rest.get<ColumnType[]>("/api/columns", async (_, res, ctx) => {
    COLUMNS = COLUMNS.sort((a, b) => a.order - b.order);
    return res(ctx.status(200), ctx.json<ColumnType[]>(COLUMNS));
  }),

  rest.get<ColumnDetails>("/api/columns/:ID", async (req, res, ctx) => {
    const { ID } = req.params;

    const board = COLUMNS.find((b) => b.ID === +ID);

    if (!board) {
      return res(ctx.status(404));
    }

    let tasks = TASKS.filter((item) => item.columnID === +ID);
    tasks = tasks.sort((a: TaskType, b: TaskType) => a.order - b.order);
    return res(
      ctx.status(200),
      ctx.json<ColumnDetails>({
        ...board,
        tasks,
      })
    );
  }),

  ////////////////////////////////////////////

  rest.post<TaskMove, TaskMoveParams>(
    "/api/columns/:ID/tasks/:taskID/move",
    async (req, res, ctx) => {
      const { ID: sourceColumnID, taskID } = req.params;
      const { destinationColumnID, taskPositionInSource, taskPositionInDest } =
        await req.json<TaskMove>();

      let tasks = TASKS.filter((item) => item.columnID === +sourceColumnID);
      let tasksDest = TASKS.filter((item) => item.columnID === +destinationColumnID);

      let task = tasks.find((o) => o.order === taskPositionInSource);

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

      //1: znajdz taska, zaktualizuj columnid (moze by to samo) i order
      //2: aktualizacja 1szej kolumny o
      return res(ctx.status(200));
    }
  ),

  //////////////////////////////////

  rest.post("/api/columns", async (req, res, ctx) => {
    let columnID = Math.max(
      ...COLUMNS.map((o) => {
        return o.ID + 1;
      })
    );
    if (columnID === -Infinity) columnID = 0;

    let columnOrder = Math.max(...COLUMNS.map((o) => o.order + 1));
    if (columnOrder === -Infinity) columnOrder = 0;

    const column = {
      ID: columnID,
      name: "",
      order: columnOrder,
    };
    COLUMNS.push(column);

    return res(ctx.status(200));
  }),

  rest.delete("/api/columns/:ID", async (req, res, ctx) => {
    const { ID } = req.params;
    const board = COLUMNS.find((b) => b.ID === +ID);

    if (!board) {
      return res(ctx.status(404));
    }

    TASKS = TASKS.filter((task) => task.columnID !== +ID);
    COLUMNS = COLUMNS.filter((b) => b.ID !== +ID);

    return res(ctx.status(200));
  }),

  rest.patch("/api/columns/:ID", async (req, res, ctx) => {
    const { ID } = req.params;
    const newValues = await req.json<Partial<ColumnType>>();
    const board = COLUMNS.find((b) => b.ID === +ID);

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

  rest.post("/api/columns/:ID/tasks", async (req, res, ctx) => {
    const { ID } = req.params;
    //const task = await req.json<TaskType>();
    let taskID = Math.max(
      ...TASKS.map((o) => {
        return o.ID + 1;
      })
    );
    if (taskID === -Infinity) taskID = 100;

    let taskOrder = Math.max(
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

  rest.delete("/api/columns/:columnID/tasks/:ID", async (req, res, ctx) => {
    const { columnID, ID } = req.params;

    const task = TASKS.find((b) => b.columnID === +columnID && b.ID === +ID);

    if (!task) {
      return res(ctx.status(404));
    }

    TASKS = TASKS.filter((b) => b.columnID !== +columnID || b.ID !== +ID);
    let tasks = TASKS.filter((item) => item.columnID === +columnID);

    tasks.forEach((item) => {
      if (item.order > task!.order) {
        item.order -= 1;
      }
    });
    TASKS = TASKS.filter((item) => item.columnID !== +columnID);
    TASKS = TASKS.concat(tasks);
    return res(ctx.status(200));
  }),

  rest.patch("/api/columns/:columnID/tasks/:ID", async (req, res, ctx) => {
    const { columnID, ID } = req.params;
    const newValues = await req.json<Partial<TaskType>>();

    const task = TASKS.find((b) => b.columnID === +columnID && b.ID === +ID);

    if (!task) {
      return res(ctx.status(404));
    }
    console.log(TASKS);

    TASKS = TASKS.map((b) => {
      if (b.columnID !== +columnID || b.ID !== +ID) {
        return b;
      }

      return {
        ...b,
        ...newValues,
      };
    });
    console.log(TASKS);

    return res(ctx.status(200));
  }),

  rest.post<ColumnMove, ColumnkMoveParams>(
    "/api/columns/:ID/move",
    async (req, res, ctx) => {
      const { ID } = req.params;
      const { sourcePosition, destPosition } = await req.json<ColumnMove>();
      const column = COLUMNS.find((b) => b.ID === +ID);
      //console.log(column);
      column!.order = destPosition;
      console.log(COLUMNS);

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
      console.log(COLUMNS);

      return res(ctx.status(200));
    }
  ),
];
