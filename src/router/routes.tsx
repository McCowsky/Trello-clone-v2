import { Route } from "@tanstack/react-location";
import Home from "@/views/home/home";
import BoardWrapper from "@/views/board/boardWrapper";
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
