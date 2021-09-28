import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//usuarios
import usuarios from "./usuarios/reducer"

//sims
import sims from "./sims/reducer"

//platforms
import platforms from "./platforms/reducer"

//modems
import modems from "./modems/reducer"

//devices
import dispositivos from "./dispositivos/reducer"

//clients
import clientes from "./clientes/reducer"

//vehiculos
import vehiculos from "./vehiculos/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  usuarios,
  sims,
  platforms,
  modems,
  dispositivos,
  clientes,
  vehiculos,
})

export default rootReducer
