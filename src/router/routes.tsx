import { Router, Route, Outlet, ReactLocation, Link } from "@tanstack/react-location";
import Home from "../views/home/home";
import Board from "../views/board/board";

export const routes: Route[] = [
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "Board",
    element: <Board />,
  },
];
