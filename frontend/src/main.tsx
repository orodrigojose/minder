import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./shared/layouts/Layout.tsx";
import Editor from "./shared/pages/Editor.tsx";
import Minder from "./shared/pages/Minder.tsx";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame-dark.css";
import "./shared/styles/global.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "/minder", element: <Minder /> },
      { path: "/editor/:file?/:id?", element: <Editor /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
