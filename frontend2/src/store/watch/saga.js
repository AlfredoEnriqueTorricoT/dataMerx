import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_WATCH,
  POST_WATCH,
  PUT_WATCH,
  DELETE_WATCH,
  POST_AND_GET_WATCH,
  PUT_AND_GET_WATCH,
  DELETE_AND_GET_WATCH,
  UPDATE_WATCH_STORAGE,
} from "./actionTypes"
import {getWatch, updateWatchStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getWatchSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)
    try {
      if (response.data.status == 200) {
        yield put(updateWatchStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateWatchStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateWatchStorage({status: response.response.status, message: (response.data.message || "")}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateWatchStorage({status: "Unexpected error"}))
  }
}

function* postWatchSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    try {
      if (response.data.status == 200) {
        yield put(updateWatchStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateWatchStorage({status: response.data.message}))
      } 
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateWatchStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.response.data.status}))
      } else {
        yield put(updateWatchStorage({status: response.response.data.status, message: response.response.data.message}))
      }
    }
  } catch (error) {
    yield put(updateWatchStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* putWatchSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(updateWatchStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateWatchStorage({status: response.data.status, message: response.data.message}))
      }  
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateWatchStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateWatchStorage({status: response.response.data.status, message: response.response.data.message}))
      } 
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateWatchStorage({status: "Unexpected error"}))
  }
}

function* postAndGetWatchSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getWatch({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateWatchStorage({status: response.response.status, message: (response.response.data.message || "")}))
      }
    } catch (error) {
      if (response.response.status == 432) {
        yield put(updateWatchStorage({status: response.response.status, message: (response.response.data.message || "")}))
      } else
      yield put(updateWatchStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateWatchStorage({status: "Unexpected error"}))
  }
}

function* putAndGetWatchSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getWatch({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateWatchStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateWatchStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateWatchStorage({status: "Unexpected error"}))
  }
}

function* deleteAndGetWatchSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.DELETE, {url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getWatch({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateWatchStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateWatchStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateWatchStorage({status: "Unexpected error"}))
  }
}

function* watchSaga() {
  yield takeEvery(GET_WATCH, getWatchSaga)
  yield takeEvery(POST_WATCH, postWatchSaga)
  yield takeEvery(PUT_WATCH, putWatchSaga)
  yield takeEvery(POST_AND_GET_WATCH, postAndGetWatchSaga)
  yield takeEvery(PUT_AND_GET_WATCH, putAndGetWatchSaga)
  yield takeEvery(DELETE_AND_GET_WATCH, deleteAndGetWatchSaga)
}

export default watchSaga