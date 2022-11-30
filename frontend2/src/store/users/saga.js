import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
    GET_USER,
    POST_USER,
    PUT_USER,
    DELETE_USER,
    POST_AND_GET_USER,
    PUT_AND_GET_USER,
    DELETE_AND_GET_USER,
} from "./actionTypes"
import {getUser, updateUserStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

// # # # # # GET # # # # #

function* getUserSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.GET, action.url)
    if (response.data.status == 200) {
      yield put(updateUserStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateUserStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateUserStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

// # # # # # POST # # # # #

function* postUserSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, action.url)
    if (response.data.status == 200) {
      yield put(updateUserStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateUserStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateUserStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* postAndGetUserSaga(action) {
  let response;
  console.log(action);
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    console.log(response);
    if (response.data.status == 200) {
      yield put(
        getUser({
          saveAs: action.saveAs,
          url: action.urlToGet || action.url,
        })
      )
    } else {
      yield put(updateUserStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateUserStorage({status: error.message}))
    console.log("ERROR: ", response, error, action);
  }
}

function* putAndGetUserSaga(action) {
  let response;
  console.log("PAG: ", action);
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})
    if (response.data.status == 200) {
      console.log("SUCCESS: ", response);
      yield put(
        getUser({
          saveAs: action.saveAs,
          saveIn: action.saveIn,
          url: action.urlToGet || action.url,
        })
      )
    } else {
      console.log("40?: ", response);
      yield put(updateUserStorage({status: "error"}))
    }
  } catch (error) {
    console.log("ERROR: ", response, error, action);
  }
}

function* userSaga() {
  yield takeEvery(GET_USER, getUserSaga)
  yield takeEvery(POST_AND_GET_USER, postAndGetUserSaga)
  yield takeEvery(PUT_AND_GET_USER, putAndGetUserSaga)
}

export default userSaga