import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_VEHICULOS,
  INSERT_VEHICULO,
  EDIT_VEHICULO,
  INSERT_MODEM_A_VEHICULO,
  REMOVE_MODEM,
} from "./actionTypes"
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
  } catch (error) {
    yield put(getVehiculosFail(error))
  }
}

function* sInsertVehiculo(action) {
  try {
    yield put(waitVehiculos())
    console.log("InsertVehiculo:", action.payload)
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getVehiculos())
  } catch (error) {
    yield put(getVehiculosFail(error))
  }
}

function* sUpdateVehiculo(action) {
  try {
    yield put(waitVehiculos())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getVehiculos())
  } catch (error) {
    yield put(getVehiculosFail(error))
  }
}

function* vehiculosSaga() {
  yield takeEvery(GET_VEHICULOS, fetchVehiculos)
  yield takeEvery(INSERT_VEHICULO, sInsertVehiculo)
  yield takeEvery(INSERT_MODEM_A_VEHICULO, sInsertVehiculo)
  yield takeEvery(REMOVE_MODEM, sInsertVehiculo)
  yield takeEvery(EDIT_VEHICULO, sUpdateVehiculo)
}

export default vehiculosSaga
