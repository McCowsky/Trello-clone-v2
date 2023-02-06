import { Route } from "@tanstack/react-location";
//import BoardWrapper from "@/views/board/BoardWrapper";
import { BoardWrapper } from "@/views/board";
import { Home } from "@/views/home";
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
