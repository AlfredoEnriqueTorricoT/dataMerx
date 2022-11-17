import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_M_BRAND,
  POST_M_BRAND,
  PUT_M_BRAND,
  DELETE_M_BRAND,
  POST_AND_GET_M_BRAND,
  PUT_AND_GET_M_BRAND,
  DELETE_AND_GET_M_BRAND,
  UPDATE_STORAGE,
} from "./actionTypes"
import {getMBrand, updateStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getMBrandSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)
    if (response.data.status == 200) {
      yield put(updateStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateStorage({status: "error"}))
    }
} catch (error) {
    console.log("FAIL: ", response, error, action);
    // yield put(getUsuariosFail(error))
  }
}

function* postAndGetMBrandSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    if (response.data.status == 200) {
      yield put(
        getMBrand({
          saveAs: action.saveAs,
          url: action.urlToGet || action.url,
        })
      )
    } else {
      yield put(updateStorage({status: "error"}))
    }
  } catch (error) {
    console.log("ERROR: ", response, error, action);
  }
}

function* putAndGetMBrandSaga(action) {
  let response;
  console.log("PAG: ", action);
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})
    if (response.data.status == 200) {
      console.log("SUCCESS: ", response);
      yield put(
        getMBrand({
          saveAs: action.saveAs,
          url: action.urlToGet || action.url,
        })
      )
    } else {
      console.log("40?: ", response);
      yield put(updateStorage({status: "error"}))
    }
  } catch (error) {
    console.log("ERROR: ", response, error, action);
  }
}

function* mBrandSaga() {
  yield takeEvery(GET_M_BRAND, getMBrandSaga)
  yield takeEvery(POST_AND_GET_M_BRAND, postAndGetMBrandSaga)
  yield takeEvery(PUT_AND_GET_M_BRAND, putAndGetMBrandSaga)
}

export default mBrandSaga