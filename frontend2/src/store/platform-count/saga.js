import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PLATFORM_COUNT,
  POST_PLATFORM_COUNT,
  PUT_PLATFORM_COUNT,
  DELETE_PLATFORM_COUNT,
  POST_AND_GET_PLATFORM_COUNT,
  PUT_AND_GET_PLATFORM_COUNT,
  DELETE_AND_GET_PLATFORM_COUNT,
  UPDATE_PLATFORM_COUNT_STORAGE,
} from "./actionTypes"
import {getPlatformCount, updatePlatformCountStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getPlatformCountSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)
    try {
      if (response.data.status == 200) {
        yield put(updatePlatformCountStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updatePlatformCountStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updatePlatformCountStorage({status: response.response.status, message: (response.data.message || "")}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updatePlatformCountStorage({status: "Unexpected error"}))
  }
}

function* postPlatformCountSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    try {
      if (response.data.status == 200) {
        yield put(updatePlatformCountStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updatePlatformCountStorage({status: response.data.message}))
      } 
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updatePlatformCountStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.response.data.status}))
      } else {
        yield put(updatePlatformCountStorage({status: response.response.data.status, message: response.response.data.message}))
      }
    }
  } catch (error) {
    yield put(updatePlatformCountStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* putPlatformCountSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(updatePlatformCountStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updatePlatformCountStorage({status: response.data.status, message: response.data.message}))
      }  
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updatePlatformCountStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updatePlatformCountStorage({status: response.response.data.status, message: response.response.data.message}))
      } 
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updatePlatformCountStorage({status: "Unexpected error"}))
  }
}

function* postAndGetPlatformCountSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getPlatformCount({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updatePlatformCountStorage({status: response.response.status, message: (response.response.data.message || "")}))
      }
    } catch (error) {
      if (response.response.status == 432) {
        yield put(updatePlatformCountStorage({status: response.response.status, message: (response.response.data.message || "")}))
      } else
      yield put(updatePlatformCountStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updatePlatformCountStorage({status: "Unexpected error"}))
  }
}

function* putAndGetPlatformCountSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getPlatformCount({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updatePlatformCountStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updatePlatformCountStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updatePlatformCountStorage({status: "Unexpected error"}))
  }
}

function* deleteAndGetPlatformCountSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.DELETE, {url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getPlatformCount({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updatePlatformCountStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updatePlatformCountStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updatePlatformCountStorage({status: "Unexpected error"}))
  }
}

function* PlatformCountSaga() {
  yield takeEvery(GET_PLATFORM_COUNT, getPlatformCountSaga)
  yield takeEvery(POST_PLATFORM_COUNT, postPlatformCountSaga)
  yield takeEvery(PUT_PLATFORM_COUNT, putPlatformCountSaga)
  yield takeEvery(POST_AND_GET_PLATFORM_COUNT, postAndGetPlatformCountSaga)
  yield takeEvery(PUT_AND_GET_PLATFORM_COUNT, putAndGetPlatformCountSaga)
  yield takeEvery(DELETE_AND_GET_PLATFORM_COUNT, deleteAndGetPlatformCountSaga)
}

export default PlatformCountSaga