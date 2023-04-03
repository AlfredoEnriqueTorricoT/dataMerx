import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
    GET_SIM,
    POST_SIM,
    PUT_SIM,
    DELETE_SIM,
    POST_AND_GET_SIM,
    PUT_AND_GET_SIM,
    DELETE_AND_GET_SIM,
} from "./actionTypes"
import {getSim, updateSimStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

// # # # # # GET # # # # #

function* getSimSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.GET, action.url)

    if (response.data.status == 200) {
      yield put(updateSimStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateSimStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateSimStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

// # # # # # POST # # # # #

function* postSimSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    if (response.data.status == 200) {
      yield put(updateSimStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateSimStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateSimStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* postAndGetSimSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    try {
      if (response.data.status == 200) {
        yield put(
          getSim({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        if (response.response.status == 432)
          yield put(updateSimStorage({status: response.response.status, message: (response.response.data.message || "")}))
        else
          yield put(updateSimStorage({status: response.data.message}))
      } 
    } catch (error) {
      if (response.response.status == 432)
          yield put(updateSimStorage({status: response.response.status, message: (response.response.data.message || "")}))
        else
          yield put(updateSimStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateSimStorage({status: error.message}))
    console.log("ERROR: ", response, error, action);
  }
}

function* putAndGetSimSaga(action) {
  let response;
  console.log("PAG: ", action);
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})
    if (response.data.status == 200) {
      console.log("SUCCESS: ", response);
      yield put(
        getSim({
          saveAs: action.saveAs,
          saveIn: action.saveIn,
          url: action.urlToGet || action.url,
        })
      )
    } else {
      if (response.response.status == 432)
        yield put(updateSimStorage({status: response.response.status, message: (response.response.data.message || "")}))
      else
        yield put(updateSimStorage({status: "error"}))
    }
  } catch (error) {
    console.log("ERROR: ", response, error, action);
  }
}

function* simSaga() {
  yield takeEvery(GET_SIM, getSimSaga)
  yield takeEvery(POST_SIM, postSimSaga)
  yield takeEvery(POST_AND_GET_SIM, postAndGetSimSaga)
  yield takeEvery(PUT_AND_GET_SIM, putAndGetSimSaga)
}

export default simSaga