import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_TAG,
  POST_TAG,
  PUT_TAG,
  DELETE_TAG,
  POST_AND_GET_TAG,
  PUT_AND_GET_TAG,
  DELETE_AND_GET_TAG,
  UPDATE_TAG_STORAGE,
} from "./actionTypes"
import {getTag, updateTagStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getTagSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)
    try {
      if (response.data.status == 200) {
        
        yield put(updateTagStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateTagStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateTagStorage({status: response.response.status, message: (response.data.message || "")}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateTagStorage({status: "Unexpected error"}))
  }
}

function* postTagSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    try {
      if (response.data.status == 200) {
        yield put(updateTagStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateTagStorage({status: response.data.message}))
      } 
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateTagStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.response.data.status}))
      } else {
        yield put(updateTagStorage({status: response.response.data.status, message: response.response.data.message}))
      }
    }
  } catch (error) {
    yield put(updateTagStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* putTagSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(updateTagStorage({
          payload: response.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateTagStorage({status: response.data.status, message: response.data.message}))
      }  
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateTagStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateTagStorage({status: response.response.data.status, message: response.response.data.message}))
      } 
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateTagStorage({status: "Unexpected error"}))
  }
}

function* postAndGetTagSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getTag({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateTagStorage({status: response.response.status, message: (response.response.data.message || "")}))
      }
    } catch (error) {
      if (response.response.status == 432) {
        yield put(updateTagStorage({status: response.response.status, message: (response.response.data.message || "")}))
      } else
      yield put(updateTagStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateTagStorage({status: "Unexpected error"}))
  }
}

function* putAndGetTagSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getTag({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateTagStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateTagStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateTagStorage({status: "Unexpected error"}))
  }
}

function* deleteAndGetTagSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.DELETE, {url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getTag({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateTagStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateTagStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateTagStorage({status: "Unexpected error"}))
  }
}

function* tagSaga() {
  yield takeEvery(GET_TAG, getTagSaga)
  yield takeEvery(POST_TAG, postTagSaga)
  yield takeEvery(PUT_TAG, putTagSaga)
  yield takeEvery(POST_AND_GET_TAG, postAndGetTagSaga)
  yield takeEvery(PUT_AND_GET_TAG, putAndGetTagSaga)
  yield takeEvery(DELETE_AND_GET_TAG, deleteAndGetTagSaga)
}

export default tagSaga