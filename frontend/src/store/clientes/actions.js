import {
  GET_CLIENTES,
  INSERT_CLIENTE,
  EDIT_CLIENTE,
  WAIT_CLIENTES,
  GET_CLIENTES_FAIL,
  GET_CLIENTES_SUCCESS,
} from "./actionTypes"

export const getClientes = () => ({
  type: GET_CLIENTES,
  payload: {
    controller: "client",
    operacion: "selectAll",
  },
})

export const insertCliente = data => ({
  type: INSERT_CLIENTE,
  payload: { ...data, controller: "client", operacion: "insert" },
})

export const updateCliente = data => ({
  type: EDIT_CLIENTE,
  payload: { ...data, controller: "client", operacion: "update" },
})

export const waitClientes = () => ({
  type: WAIT_CLIENTES,
})

export const getClientesSuccess = users => ({
  type: GET_CLIENTES_SUCCESS,
  payload: users,
})

export const getClientesFail = error => ({
  type: GET_CLIENTES_FAIL,
  payload: error,
})
