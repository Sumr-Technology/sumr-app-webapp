import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";
import DefaultLayout from "../Layout/DefaultLayout";
import Dashboard from "../Component/Pages/Dashboard/Dashboard";
import NotFound from "../Component/Pages/NotFound/NotFound";
import Instagram from "../Component/Pages/SumrDetail/SumrDetail";
import Profile from "../Component/Pages/Profile/Profile";
import Playlists from "../Component/Pages/Playlists/Playlists";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "sumrs",
        element: <Dashboard />,
      },
      {
        path: "instagram",
        element: <Instagram />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "playlists",
        element: <Playlists />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
