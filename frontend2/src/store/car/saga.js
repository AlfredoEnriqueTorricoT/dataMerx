import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CAR,
  POST_CAR,
  PUT_CAR,
  DELETE_CAR,
  POST_AND_GET_CAR,
  PUT_AND_GET_CAR,
  DELETE_AND_GET_CAR,
  UPDATE_CAR_STORAGE,
} from "./actionTypes"
import {getCar, updateCarStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getCarSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)

    try {
      if (response.data.status == 200) {
        yield put(updateCarStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateCarStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateCarStorage({status: response.response.status}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateCarStorage({status: "Unexpected error"}))
  }
}

function* postCarSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    if (response.data.status == 200) {
      yield put(updateCarStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateCarStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateCarStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* postAndGetCarSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getCar({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateCarStorage({status: response.status}))
      }
    } catch (error) {
      yield put(updateCarStorage({status: response.data.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateCarStorage({status: "Unexpected error"}))
  }
}

function* putAndGetCarSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        console.log("SUCCESS: ", response);
        yield put(
          getCar({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateCarStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateCarStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateCarStorage({status: "Unexpected error"}))
  }
}

function* carSaga() {
  yield takeEvery(GET_CAR, getCarSaga)
  yield takeEvery(POST_CAR, postCarSaga)
  yield takeEvery(POST_AND_GET_CAR, postAndGetCarSaga)
  yield takeEvery(PUT_AND_GET_CAR, putAndGetCarSaga)
}

export default carSaga