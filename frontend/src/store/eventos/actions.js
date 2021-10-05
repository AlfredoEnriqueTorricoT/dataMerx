import {
  GET_EVENTOS,
  INSERT_EVENTO,
  EDIT_EVENTO,
  WAIT_EVENTOS,
  GET_EVENTOS_FAIL,
  GET_EVENTOS_SUCCESS,
} from "./actionTypes"

export const getEventos = () => ({
  type: GET_EVENTOS,
  payload: {
    controller: "event",
    operacion: "selectAll",
  },
})

export const insertEvento = data => ({
  type: INSERT_EVENTO,
  payload: { ...data, controller: "event", operacion: "insert" },
})

export const updateEvento = data => ({
  type: EDIT_EVENTO,
  payload: { ...data, controller: "event", operacion: "update" },
})

export const waitEventos = () => ({
  type: WAIT_EVENTOS,
})

export const getEventosSuccess = events => ({
  type: GET_EVENTOS_SUCCESS,
  payload: events,
})

export const getEventosFail = error => ({
  type: GET_EVENTOS_FAIL,
  payload: error,
})
