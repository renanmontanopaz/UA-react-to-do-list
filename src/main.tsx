import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound/index.tsx";
import LandingPage from "./pages/LandingPage/index.tsx";
import ToDo from "./pages/ToDo/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/to-do",
    element: <ToDo />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
