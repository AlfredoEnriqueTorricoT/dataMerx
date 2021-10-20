import {
  GET_VEHICULOS,
  INSERT_VEHICULO,
  EDIT_VEHICULO,
  WAIT_VEHICULOS,
  GET_VEHICULOS_FAIL,
  GET_VEHICULOS_SUCCESS,
  INSERT_MODEM_A_VEHICULO,
  REMOVE_MODEM,
} from "./actionTypes"

export const getVehiculos = () => ({
  type: GET_VEHICULOS,
  payload: {
    controller: "car",
    operacion: "selectAll",
  },
})

export const insertVehiculo = data => ({
  type: INSERT_VEHICULO,
  payload: { ...data, controller: "car", operacion: "insert" },
})

export const insertModemAVehiculo = data => ({
  type: INSERT_MODEM_A_VEHICULO,
  payload: { ...data, controller: "car", operacion: "addDeviceToCar" },
})

export const removeModem = data => ({
  type: REMOVE_MODEM,
  payload: {
    carid: data,
    userid: localStorage.getItem("userId"),
    controller: "car",
    operacion: "retirar",
  },
})

export const updateVehiculo = data => ({
  type: EDIT_VEHICULO,
  payload: { ...data, controller: "car", operacion: "update" },
})

export const waitVehiculos = () => ({
  type: WAIT_VEHICULOS,
})

export const getVehiculosSuccess = users => ({
  type: GET_VEHICULOS_SUCCESS,
  payload: users,
})

export const getVehiculosFail = error => ({
  type: GET_VEHICULOS_FAIL,
  payload: error,
})
