import {
  GET_USUARIOS,
  INSERT_USUARIO,
  EDIT_USUARIO,
  WAIT_USUARIOS,
  GET_USUARIOS_FAIL,
  GET_USUARIOS_SUCCESS,
} from "./actionTypes"

export const getUsuarios = () => ({
  type: GET_USUARIOS,
  payload: {
    controller: "user",
    operacion: "selectAll",
  },
})

export const insertUsuario = data => ({
  type: INSERT_USUARIO,
  payload: { ...data, controller: "user", operacion: "insert" },
})

export const updateUsuario = data => ({
  type: EDIT_USUARIO,
  payload: { ...data, controller: "user", operacion: "update" },
})

export const waitUsuarios = () => ({
  type: WAIT_USUARIOS,
})

export const getUsuariosSuccess = users => ({
  type: GET_USUARIOS_SUCCESS,
  payload: users,
})

export const getUsuariosFail = error => ({
  type: GET_USUARIOS_FAIL,
  payload: error,
})
