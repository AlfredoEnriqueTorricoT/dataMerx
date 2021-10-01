import {
  GET_SIMS,
  GET_SIMS_DISPONIBLES,
  INSERT_SIM,
  EDIT_SIM,
  WAIT_SIMS,
  GET_SIMS_FAIL,
  GET_SIMS_SUCCESS,
} from "./actionTypes"

export const getSims = () => ({
  type: GET_SIMS,
  payload: {
    controller: "sim",
    operacion: "selectAll",
  },
})

export const getSimsDisponibles = () => ({
  type: GET_SIMS_DISPONIBLES,
  payload: {
    controller: "sim",
    operacion: "selectDisponible",
  },
})

export const insertSim = data => ({
  type: INSERT_SIM,
  payload: { ...data, controller: "sim", operacion: "insert" },
})

export const updateSim = data => ({
  type: EDIT_SIM,
  payload: { ...data, controller: "sim", operacion: "update" },
})

export const waitSims = () => ({
  type: WAIT_SIMS,
})

export const getSimsSuccess = sims => ({
  type: GET_SIMS_SUCCESS,
  payload: sims,
})

export const getSimsFail = error => ({
  type: GET_SIMS_FAIL,
  payload: error,
})
