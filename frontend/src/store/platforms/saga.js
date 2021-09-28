import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_PLATFORMS } from "./actionTypes"
import { getPlatformsSuccess, getPlatformsFail } from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertSim, updateSim } from "store/actions"

function* fetchPlatforms(action) {
  try {
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getPlatformsSuccess(response))
  } catch (error) {
    yield put(getPlatformsFail(error))
  }
}

function* platformsSaga() {
  yield takeEvery(GET_PLATFORMS, fetchPlatforms)
}

export default platformsSaga
