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
import Sims from "./sims/reducer"
import Users from "./users/reducer"

import Platform from "./platform/reducer"
import Car from "./car/reducer"
import Modem from "./modem/reducer"
import Event from "./event/reducer"
import Client from "./clients/reducer"
import Watch from "./watch/reducer"

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
  Sims,
  Platform,
  Car,
  Users,
  Modem,
  Event,
  Client,
  Watch
})

export default rootReducer
