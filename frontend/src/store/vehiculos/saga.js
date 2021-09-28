import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_VEHICULOS, INSERT_VEHICULO, EDIT_VEHICULO } from "./actionTypes"
import {
  getVehiculos,
  waitVehiculos,
  getVehiculosSuccess,
  getVehiculosFail,
} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertVehiculo, updateVehiculo } from "store/actions"

function* fetchVehiculos(action) {
  try {
    yield put(waitVehiculos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getVehiculosSuccess(response))
    console.log("GET_SUCCESS: ", response)
  } catch (error) {
    yield put(getVehiculosFail(error))
    console.log("GET_FAIL: ", error)
  }
}

function* sInsertVehiculo(action) {
  try {
    yield put(waitVehiculos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getVehiculos())
    console.log(response)
  } catch (error) {
    yield put(getVehiculosFail(error))
    console.log("CONNECT_I_FAIL: ", error)
  }
}

function* sUpdateVehiculo(action) {
  try {
    yield put(waitVehiculos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getVehiculos())
    console.log(response)
  } catch (error) {
    yield put(getVehiculosFail(error))
    console.log("CONNECT_U_FAIL: ", error)
  }
}

function* vehiculosSaga() {
  yield takeEvery(GET_VEHICULOS, fetchVehiculos)
  yield takeEvery(INSERT_VEHICULO, sInsertVehiculo)
  yield takeEvery(EDIT_VEHICULO, sUpdateVehiculo)
}

export default vehiculosSaga
