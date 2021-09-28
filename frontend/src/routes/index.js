import React from "react"
import { Redirect } from "react-router-dom"

// User profile
import UserProfile from "../pages/Authentication/UserProfile"

//dashboard
import Dashboard from "../pages/Dashboard/index"

//sims
import SimsPage from "../pages/Sims/sims_page"

//devices
import Devices from "../pages/Dispositivos/devices_page"

//clientes
import Clientes from "../pages/Clientes/clientes_page"

//vehiculos
import Vehiculos from "../pages/Vehiculos/cars_page"

//code opt
import Usuarios from "../pages/Dashboard/COPTM/users"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

const authProtectedRoutes = [
  { path: "/usuarios", component: Dashboard },
  { path: "/sims", component: SimsPage },
  { path: "/usuarios", component: Usuarios },
  { path: "/dispositivos", component: Devices },
  { path: "/clientes", component: Clientes },
  { path: "/vehiculos", component: Vehiculos },

  //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/clientes" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
