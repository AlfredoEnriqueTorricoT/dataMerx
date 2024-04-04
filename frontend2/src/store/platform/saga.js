import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PLATFORM,
  POST_PLATFORM,
  PUT_PLATFORM,
  DELETE_PLATFORM,
  POST_AND_GET_PLATFORM,
  PUT_AND_GET_PLATFORM,
  DELETE_AND_GET_PLATFORM,
  UPDATE_PLATFORM_STORAGE,
} from "./actionTypes"
import {getPlatform, updatePlatformStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getPlatformSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)

    try {
      if (response.data.status == 200) {
        yield put(updatePlatformStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updatePlatformStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updatePlatformStorage({status: response.response.status}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updatePlatformStorage({status: "Unexpected error"}))
  }
}

function* deletePlatformSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.DELETE, {url: action.url})

    try {
      if (response.data.status == 204) {
        yield put(updatePlatformStorage({
          payload: action.payload,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updatePlatformStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updatePlatformStorage({status: response.response.status}))
    }
    
} catch (error) {
  console.log("error:", error);
  yield put(updatePlatformStorage({status: "Unexpected error"}))
  }
}

function* postAndGetPlatformSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getPlatform({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updatePlatformStorage({status: response.status}))
      }
    } catch (error) {
      yield put(updatePlatformStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updatePlatformStorage({status: "Unexpected error"}))
  }
}

function* putAndGetPlatformSaga(action) {
  let response;
  console.log("PAG: ", action);
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        console.log("SUCCESS: ", response);
        yield put(
          getPlatform({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updatePlatformStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updatePlatformStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updatePlatformStorage({status: "Unexpected error"}))
  }
}

function* platformSaga() {
  yield takeEvery(GET_PLATFORM, getPlatformSaga)
  yield takeEvery(DELETE_PLATFORM, deletePlatformSaga)
  yield takeEvery(POST_AND_GET_PLATFORM, postAndGetPlatformSaga)
  yield takeEvery(PUT_AND_GET_PLATFORM, putAndGetPlatformSaga)
}

export default platformSaga