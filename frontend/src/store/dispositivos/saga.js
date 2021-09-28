import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DISPOSITIVOS,
  INSERT_DISPOSITIVO,
  EDIT_DISPOSITIVO,
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
    console.log("GET_SUCCESS: ", response)
  } catch (error) {
    yield put(getDispositivosFail(error))
  }
}

function* sInsertDispositivo(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getDispositivos())
    console.log(response)
  } catch (error) {
    yield put(getDispositivosFail(error))
    console.log("CONNECT_I_FAIL: ", error)
  }
}

function* sUpdateDispositivo(action) {
  try {
    yield put(waitDispositivos())
    const response = yield call(AxiosServices.POST, action.payload)
    console.log("ACTION")
    console.log(action.payload)
    yield put(getDispositivos())
  } catch (error) {
    yield put(getDispositivosFail(error))
    console.log("CONNECT_U_FAIL: ", error)
  }
}

function* dispositivosSaga() {
  yield takeEvery(GET_DISPOSITIVOS, fetchDispositivos)
  yield takeEvery(INSERT_DISPOSITIVO, sInsertDispositivo)
  yield takeEvery(EDIT_DISPOSITIVO, sUpdateDispositivo)
}

export default dispositivosSaga
