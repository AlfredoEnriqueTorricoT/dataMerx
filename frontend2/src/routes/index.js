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
import MarkModem from "pages/ModemBrand";
import SimPage from "pages/Sims2"
import UserPage from "pages/User2"
import PlatformPage from "pages/Platform2"
import CarPage from "pages/Car2"
import ModemPage from "pages/Modem2"
import EventPage from "pages/Events";
import ClientPage from "pages/Client"
import WatchPage from "pages/Watch";
import TagsPage from "pages/Tags";
import ReportDeviceOfSiguelo from "pages/ReportDeviceOfSiguelo";
import PlatformCountPage from "pages/PlatformCount";
import WatchLogPage from "pages/report/watch_log";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/mark-modem", component: MarkModem },
  { path: "/sims", component: SimPage },
  { path: "/users", component: UserPage },
  { path: "/platform", component: PlatformPage },
  { path: "/car", component: CarPage },
  { path: "/modem", component: ModemPage },
  { path: "/clients", component: ClientPage },
  { path: "/watch", component: WatchPage },
  { path: "/tags", component: TagsPage },
  { path: "/report_device", component: PlatformCountPage },
  { path: "/report_device_of_siguelo", component: ReportDeviceOfSiguelo },
  { path: "/report/watch_log", component: WatchLogPage },
  // { path: "/event", component: EventPage },

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

];

export { authProtectedRoutes, publicRoutes };