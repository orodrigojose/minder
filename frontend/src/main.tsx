import { createBrowserRouter, RouterProvider } from "react-router";
import Settings from "./shared/pages/Settings.tsx";
import Layout from "./shared/layouts/Layout.tsx";
import Editor from "./shared/pages/Editor.tsx";
import Minder from "./shared/pages/Minder.tsx";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./shared/styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "/minder", element: <Minder /> },
      { path: "/settings", element: <Settings /> },
      { path: "/editor/:id?", element: <Editor /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
