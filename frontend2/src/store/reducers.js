import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

import ModemBrands from "./modem-brands/reducer"
import Users from "./users/reducer"
import Event from "./event/reducer"
import Client from "./clients/reducer"
import Tag from "./tags/reducer"
import ReportDeviceSiguelo from "./report-device-siguelo/reducer"

// RTK Slices
import watchReducer from "../pages/Watch/slices/watchSlice"
import platformCountReducer from "../pages/PlatformCount/slices/platformCountSlice"
import modem2Reducer from "../pages/Modem2/slices/modemSlice"
import platform2Reducer from "../pages/Platform2/slices/platformSlice"
import modemBrandReducer from "../pages/ModemBrand/slices/modemBrandSlice"
import watchLogReducer from "../pages/report/watch_log/slices/watchLogSlice"
import sims2Reducer from "../pages/Sims2/slices/simSlice"
import car2Reducer from "../pages/Car2/slices/carSlice"
import user2Reducer from "../pages/User2/slices/userSlice"
import eventFeedReducer from "../pages/Home/slices/eventFeedSlice"
import modemEventsReducer from "../pages/ModemEvents/slices/modemEventsSlice"
import simEventsReducer from "../pages/SimEvents/slices/simEventsSlice"
import carEventsReducer from "../pages/CarEvents/slices/carEventsSlice"
import watchEventsReducer from "../pages/WatchEvents/slices/watchEventsSlice"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Dashboard,
  DashboardSaas,
  ModemBrands,
  Users,
  Event,
  Client,
  Tag,
  ReportDeviceSiguelo,
  // RTK Slices
  Watch: watchReducer,
  PlatformCount: platformCountReducer,
  Modem2: modem2Reducer,
  Platform2: platform2Reducer,
  ModemBrand: modemBrandReducer,
  WatchLog: watchLogReducer,
  Sims2: sims2Reducer,
  Car2: car2Reducer,
  User2: user2Reducer,
  EventFeed: eventFeedReducer,
  ModemEvents: modemEventsReducer,
  SimEvents: simEventsReducer,
  CarEvents: carEventsReducer,
  WatchEvents: watchEventsReducer,
})

export default rootReducer
