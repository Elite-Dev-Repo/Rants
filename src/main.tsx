import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Rants from "./components/Rants.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Error from "./components/Error.tsx";
import PostDetail from "./components/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    errorElement: <Error />,
  },

  {
    path: "/rants/:pk",
    element: <PostDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/rants",
    element: (
      <ProtectedRoutes>
        <Rants />
      </ProtectedRoutes>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
