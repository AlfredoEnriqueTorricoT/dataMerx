import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DISPOSITIVOS,
  GET_DISPOSITIVOS_POR_ID,
  GET_DISPOSITIVOS_DISPONIBLES,
  INSERT_DISPOSITIVO,
  EDIT_DISPOSITIVO,
  DISPOSITIVO_INSERTAR_SIM,
  DISPOSITIVO_RETIRAR_SIM,
} from "./actionTypes"
import {
  getDispositivos,
  waitDispositivos,
  getDispositivosSuccess,
  getDispositivosFail,
} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertDispositivo, updateDispositivo } from "store/actions"

function* fetchDispositivos(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getDispositivosSuccess(response))
  } catch (error) {
    yield put(getDispositivosFail(error))
  }
}

function* sInsertDispositivo(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getDispositivos())
  } catch (error) {
    yield put(getDispositivosFail(error))
  }
}

function* sUpdateDispositivo(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getDispositivos())
  } catch (error) {
    yield put(getDispositivosFail(error))
  }
}

function* insertarSimDispositivo(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getDispositivos())
  } catch (error) {
    yield put(getDispositivosFail(error))
  }
}

function* retirarSimDispositivo(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getDispositivos())
  } catch (error) {
    yield put(getDispositivosFail(error))
  }
}

function* dispositivosSaga() {
  yield takeEvery(GET_DISPOSITIVOS, fetchDispositivos)
  yield takeEvery(GET_DISPOSITIVOS_DISPONIBLES, fetchDispositivos)
  yield takeEvery(INSERT_DISPOSITIVO, sInsertDispositivo)
  yield takeEvery(EDIT_DISPOSITIVO, sUpdateDispositivo)
  yield takeEvery(DISPOSITIVO_INSERTAR_SIM, insertarSimDispositivo)
  yield takeEvery(DISPOSITIVO_RETIRAR_SIM, retirarSimDispositivo)
}

export default dispositivosSaga
