import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CLIENT,
  POST_CLIENT,
  PUT_CLIENT,
  DELETE_CLIENT,
  POST_AND_GET_CLIENT,
  PUT_AND_GET_CLIENT,
  DELETE_AND_GET_CLIENT,
  UPDATE_CLIENT_STORAGE,
} from "./actionTypes"
import {getClient, updateClientStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getClientSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)

    try {
      if (response.data.status == 200) {
        yield put(updateClientStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateClientStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateClientStorage({status: response.response.status}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateClientStorage({status: "Unexpected error"}))
  }
}

function* postClientSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    if (response.data.status == 200) {
      yield put(updateClientStorage({
        payload: response.data.data,
        saveAs: action.saveAs,
        status: response.data.status}))
    } else {
      yield put(updateClientStorage({status: response.data.message}))
    }
  } catch (error) {
    yield put(updateClientStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* postAndGetClientSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getClient({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateClientStorage({status: response.status}))
      }
    } catch (error) {
      yield put(updateClientStorage({status: response.data.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateClientStorage({status: "Unexpected error"}))
  }
}

function* putAndGetClientSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        console.log("SUCCESS: ", response);
        yield put(
          getClient({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateClientStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateClientStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateClientStorage({status: "Unexpected error"}))
  }
}

function* deleteClientSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.DELETE, {url: action.url})

    try {
      if (response.data.status >= 200 && response.data.status <= 205) {
        yield put(updateClientStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateClientStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateClientStorage({status: response.response.status}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateClientStorage({status: "Unexpected error"}))
  }
}

function* clientSaga() {
  yield takeEvery(GET_CLIENT, getClientSaga)
  yield takeEvery(POST_CLIENT, postClientSaga)
  yield takeEvery(POST_AND_GET_CLIENT, postAndGetClientSaga)
  yield takeEvery(PUT_AND_GET_CLIENT, putAndGetClientSaga)
  yield takeEvery(DELETE_CLIENT, deleteClientSaga)
}

export default clientSaga