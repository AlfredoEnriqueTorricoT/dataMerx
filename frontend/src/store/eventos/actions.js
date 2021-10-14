import {
  GET_EVENTOS,
  GET_EVENTOS_POR_ELEMENTO,
  INSERT_EVENTO,
  INSERT_EVENTO_A_ELEMENTO,
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

export const getEventosPorElemento = data => ({
  type: GET_EVENTOS_POR_ELEMENTO,
  payload: {
    ...data,
    controller: "event",
    operacion: "selectAllByElement",
  },
})

export const insertEvento = data => ({
  type: INSERT_EVENTO,
  payload: { ...data, controller: "event", operacion: "insert" },
})

export const insertEventoAElemento = (data, data2) => ({
  type: INSERT_EVENTO_A_ELEMENTO,
  payload: { ...data, controller: "event", operacion: "insert" },
  payload2: { ...data2 },
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
