import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_MODEMS } from "./actionTypes"
import { getModemsSuccess, getModemsFail } from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertSim, updateSim } from "store/actions"

function* fetchModems(action) {
  try {
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getModemsSuccess(response))
  } catch (error) {
    yield put(getModemsFail(error))
  }
}

function* modemsSaga() {
  yield takeEvery(GET_MODEMS, fetchModems)
}

export default modemsSaga
