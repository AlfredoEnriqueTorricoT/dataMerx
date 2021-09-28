import { GET_MODEMS, GET_MODEMS_FAIL, GET_MODEMS_SUCCESS } from "./actionTypes"

export const getModems = () => ({
  type: GET_MODEMS,
  payload: {
    controller: "markModem",
    operacion: "selectAll",
  },
})

export const getModemsSuccess = modem => ({
  type: GET_MODEMS_SUCCESS,
  payload: modem,
})

export const getModemsFail = error => ({
  type: GET_MODEMS_FAIL,
  payload: error,
})
