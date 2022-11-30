import React from "react";
import { Redirect } from "react-router-dom";

// User profile
import UserProfile from "../pages/Authentication/UserProfile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//newPages
// import Clientes from "pages/Clientes";
import MarkModem from "pages/Mark modem";
import SimPage from "pages/Sims"
import UserPage from "pages/User"
import PlatformPage from "pages/Platform"
import CarPage from "pages/Car"
import ModemPage from "pages/Modem"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/mark-modem", component: MarkModem },
  { path: "/sims", component: SimPage },
  { path: "/users", component: UserPage },
  { path: "/platform", component: PlatformPage },
  { path: "/car", component: CarPage },
  { path: "/modem", component: ModemPage },

  //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  // { path: "/clientes", component: Clientes}
];

export { authProtectedRoutes, publicRoutes };