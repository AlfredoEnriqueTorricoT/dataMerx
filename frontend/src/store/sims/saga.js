import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_SIMS,
  INSERT_SIM,
  EDIT_SIM,
  GET_SIMS_DISPONIBLES,
} from "./actionTypes"
import { getSims, waitSims, getSimsSuccess, getSimsFail } from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertSim, updateSim } from "store/actions"

function* fetchSims(action) {
  try {
    yield put(waitSims())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getSimsSuccess(response))
  } catch (error) {
    yield put(getSimsFail(error))
  }
}

function* fetchSimsDisponibles(action) {
  try {
    yield put(waitSims())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getSimsSuccess(response))
  } catch (error) {
    yield put(getSimsFail(error))
  }
}

function* sInsertSim(action) {
  try {
    yield put(waitSims())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getSims())
  } catch (error) {
    yield put(getSimsFail(error))
  }
}

function* sUpdateSim(action) {
  try {
    yield put(waitSims())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getSims())
  } catch (error) {
    yield put(getSimsFail(error))
  }
}

function* simsSaga() {
  yield takeEvery(GET_SIMS, fetchSims)
  yield takeEvery(GET_SIMS_DISPONIBLES, fetchSimsDisponibles)
  yield takeEvery(INSERT_SIM, sInsertSim)
  yield takeEvery(EDIT_SIM, sUpdateSim)
}

export default simsSaga
