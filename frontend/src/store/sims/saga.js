import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_SIMS, INSERT_SIM, EDIT_SIM } from "./actionTypes"
import { getSims, waitSims, getSimsSuccess, getSimsFail } from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertSim, updateSim } from "store/actions"

function* fetchSims(action) {
  try {
    yield put(waitSims())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getSimsSuccess(response))
    console.log("GET_SUCCESS: ", response)
  } catch (error) {
    yield put(getSimsFail(error))
    console.log("GET_FAIL: ", error)
  }
}

function* sInsertSim(action) {
  try {
    yield put(waitSims())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getSims())
    console.log(response)
  } catch (error) {
    yield put(getSimsFail(error))
    console.log("CONNECT_I_FAIL: ", error)
  }
}

function* sUpdateSim(action) {
  try {
    yield put(waitSims())
    console.log("ACTION")
    console.log(action.payload)
    const response = yield call(AxiosServices.POST, action.payload)
    console.log("RESPONSE")
    console.log(response)
    yield put(getSims())
  } catch (error) {
    yield put(getSimsFail(error))
    console.log("CONNECT_U_FAIL: ", error)
  }
}

function* simsSaga() {
  yield takeEvery(GET_SIMS, fetchSims)
  yield takeEvery(INSERT_SIM, sInsertSim)
  yield takeEvery(EDIT_SIM, sUpdateSim)
}

export default simsSaga
