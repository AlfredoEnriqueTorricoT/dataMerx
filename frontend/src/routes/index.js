import React from "react"
import { Redirect } from "react-router-dom"

// User profile
import UserProfile from "../pages/Authentication/UserProfile"

//dashboard
import Dashboard from "../pages/Dashboard/index"

//sims
import SimsPage from "pages/Sims/index.js"

//devices
import Devices from "../pages/Dispositivos/devices_page"

//clientes
import Clientes from "../pages/Clientes/clientes_page"

//vehiculos
import Vehiculos from "../pages/Vehiculos/cars_page"

//eventos
import Eventos from "../pages/Eventos/eventos_page"

//invoice
import invoice from "pages/Eventos/invoice"

//code opt
import Usuarios from "../pages/Dashboard/COPTM/users"
import ClientesOpt from "../pages/Clientes/index"
import CarsOpt from "../pages/Vehiculos/index"
import DevicesOpt from "../pages/Dispositivos/index"
import UsersOpt from "../pages/Usuarios/index"

//INVOICE
import EventInvoice from "pages/Eventos/invoice"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

const authProtectedRoutes = [
  { path: "/usuarios", component: UsersOpt },
  { path: "/sims", component: SimsPage },
  { path: "/qwerty", component: Usuarios },
  { path: "/dispositivos", component: DevicesOpt },
  { path: "/clientes", component: ClientesOpt },
  { path: "/vehiculos", component: CarsOpt },
  { path: "/eventos", component: Eventos },
  { name: "simEventos", path: "/:id", component: invoice },
  { path: "/invoice", component: EventInvoice },

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
