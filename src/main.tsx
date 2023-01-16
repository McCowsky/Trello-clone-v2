import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { Router, Route, Outlet, ReactLocation, Link } from "@tanstack/react-location";

import { worker } from "./mocks/browser";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

worker.start({
  // serviceWorker: {
  //   url: "/Trello-clone/mockServiceWorker.js",
  // },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);