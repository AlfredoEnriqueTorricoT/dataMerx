import React from "react";
import { Redirect } from "react-router-dom";

// User profile
import UserProfile from "../pages/Authentication/UserProfile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Home
import HomePage from "../pages/Home";

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
import ModemEventsPage from "pages/ModemEvents";
import SimEventsPage from "pages/SimEvents";
import CarEventsPage from "pages/CarEvents";
import WatchEventsPage from "pages/WatchEvents";

const authProtectedRoutes = [
  { path: "/home", component: HomePage },
  { path: "/mark-modem", component: MarkModem },
  { path: "/sims", component: SimPage },
  { path: "/sim/:id/events", component: SimEventsPage },
  { path: "/users", component: UserPage },
  { path: "/platform", component: PlatformPage },
  { path: "/car", component: CarPage },
  { path: "/car/:id/events", component: CarEventsPage },
  { path: "/watch/:id/events", component: WatchEventsPage },
  { path: "/modem", component: ModemPage },
  { path: "/modem/:id/events", component: ModemEventsPage },
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
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

];

export { authProtectedRoutes, publicRoutes };