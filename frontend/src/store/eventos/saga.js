import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_EVENTOS,
  INSERT_EVENTO,
  EDIT_EVENTO,
  GET_EVENTOS_POR_ELEMENTO,
  INSERT_EVENTO_A_ELEMENTO,
} from "./actionTypes"
import {
  getEventos,
  waitEventos,
  getEventosSuccess,
  getEventosFail,
  getEventosPorElemento,
} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertEvento, updateEvento } from "store/actions"

function* fetchEventos(action) {
  try {
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventosSuccess(response))
  } catch (error) {
    yield put(getEventosFail(error))
  }
}

function* sInsertEvento(action) {
  try {
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventos())
  } catch (error) {
    yield put(getEventosFail(error))
  }
}

function* sInsertEventoAElemento(action) {
  try {
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventosPorElemento(action.payload2))
  } catch (error) {
    yield put(getEventosFail(error))
  }
}

function* sUpdateEvento(action) {
  try {
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventos())
  } catch (error) {
    yield put(getEventosFail(error))
  }
}

function* eventosSaga() {
  yield takeEvery(GET_EVENTOS, fetchEventos)
  yield takeEvery(GET_EVENTOS_POR_ELEMENTO, fetchEventos)
  yield takeEvery(INSERT_EVENTO, sInsertEvento)
  yield takeEvery(INSERT_EVENTO_A_ELEMENTO, sInsertEventoAElemento)
  yield takeEvery(EDIT_EVENTO, sUpdateEvento)
}

export default eventosSaga
