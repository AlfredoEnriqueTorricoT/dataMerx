import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_EVENTOS, INSERT_EVENTO, EDIT_EVENTO } from "./actionTypes"
import {
  getEventos,
  waitEventos,
  getEventosSuccess,
  getEventosFail,
} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertEvento, updateEvento } from "store/actions"

function* fetchEventos(action) {
  try {
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventosSuccess(response))
    console.log("GET_SUCCESS: ", response)
  } catch (error) {
    yield put(getEventosFail(error))
    console.log("GET_FAIL: ", error)
  }
}

function* sInsertEvento(action) {
  try {
    console.log(action.payload)
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventos())
    console.log(response)
  } catch (error) {
    yield put(getEventosFail(error))
    console.log("CONNECT_I_FAIL: ", error)
  }
}

function* sUpdateEvento(action) {
  try {
    yield put(waitEventos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getEventos())
    console.log(response)
  } catch (error) {
    yield put(getEventosFail(error))
    console.log("CONNECT_U_FAIL: ", error)
  }
}

function* eventosSaga() {
  yield takeEvery(GET_EVENTOS, fetchEventos)
  yield takeEvery(INSERT_EVENTO, sInsertEvento)
  yield takeEvery(EDIT_EVENTO, sUpdateEvento)
}

export default eventosSaga
