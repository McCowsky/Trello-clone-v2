import { Route } from "@tanstack/react-location";
import Home from "@/views/home/Home";
import BoardWrapper from "@/views/board/BoardWrapper";
export const routes: Route[] = [
  {
    path: "/Trello-clone-v2",
    element: <Home />,
  },
  {
    path: "Board",
    element: <BoardWrapper />,
  },
];
