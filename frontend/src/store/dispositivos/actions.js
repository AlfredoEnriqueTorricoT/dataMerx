import {
  GET_DISPOSITIVOS,
  GET_DISPOSITIVOS_DISPONIBLES,
  INSERT_DISPOSITIVO,
  EDIT_DISPOSITIVO,
  WAIT_DISPOSITIVOS,
  GET_DISPOSITIVOS_FAIL,
  GET_DISPOSITIVOS_SUCCESS,
  DISPOSITIVO_INSERTAR_SIM,
  DISPOSITIVO_RETIRAR_SIM,
} from "./actionTypes"

export const getDispositivos = () => ({
  type: GET_DISPOSITIVOS,
  payload: {
    controller: "device",
    operacion: "selectAll",
  },
})

export const getDispositivosDisponibles = () => ({
  type: GET_DISPOSITIVOS_DISPONIBLES,
  payload: {
    controller: "device",
    operacion: "selectDisponible",
  },
})

export const insertDispositivo = data => ({
  type: INSERT_DISPOSITIVO,
  payload: { ...data, controller: "device", operacion: "insert" },
})

export const updateDispositivo = data => ({
  type: EDIT_DISPOSITIVO,
  payload: { ...data, controller: "device", operacion: "update" },
})

export const waitDispositivos = () => ({
  type: WAIT_DISPOSITIVOS,
})

export const getDispositivosSuccess = device => ({
  type: GET_DISPOSITIVOS_SUCCESS,
  payload: device,
})

export const getDispositivosFail = error => ({
  type: GET_DISPOSITIVOS_FAIL,
  payload: error,
})

export const dispositivoInsertarSim = data => ({
  type: DISPOSITIVO_INSERTAR_SIM,
  payload: {
    ...data,
    controller: "device",
    operacion: "addDeviceToSim",
    date_start: "2021-09-22",
    userid: localStorage.getItem("userId"),
  },
})

export const dispositivoRetirarSim = data => ({
  type: DISPOSITIVO_RETIRAR_SIM,
  payload: {
    controller: "device",
    operacion: "retirar",
    deviceid: data,
    userid: localStorage.getItem("userId"),
  },
})
