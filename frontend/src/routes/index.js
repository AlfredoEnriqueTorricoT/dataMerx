import React from "react"
import { Redirect } from "react-router-dom"

// User profile
import UserProfile from "../pages/Authentication/UserProfile"

//dashboard
import Dashboard from "../pages/Dashboard/index"

//sims
import SimsPage from "pages/Sims/index.js"

//devices
import DevicesPage from "../pages/Dispositivos/index"

//clientes
import ClientsPage from "../pages/Clientes/index"

//vehiculos
import CarsPage from "../pages/Vehiculos/index"

//eventos
import EventosPage from "../pages/Eventos/index"

//invoice
import invoice from "pages/DetalleEventos/index"

//code opt
import UserPage from "../pages/Usuarios/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

const authProtectedRoutes = [
  { path: "/usuarios", component: UserPage },
  { path: "/sims", component: SimsPage },
  { path: "/dispositivos", component: DevicesPage },
  { path: "/clientes", component: ClientsPage },
  { path: "/vehiculos", component: CarsPage },
  { name: "/eventos/:type:id", component: invoice },
  { path: "/eventos", component: EventosPage },

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
