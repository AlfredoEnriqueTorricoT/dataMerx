import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_EVENT,
  POST_EVENT,
  PUT_EVENT,
  DELETE_EVENT,
  POST_AND_GET_EVENT,
  PUT_AND_GET_EVENT,
  DELETE_AND_GET_EVENT,
  UPDATE_EVENT_STORAGE,
} from "./actionTypes"
import {getEvent, updateEventStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getEventSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)

    try {
      if (response.data.status == 200) {
        yield put(updateEventStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateEventStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateEventStorage({status: response.response.status}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateEventStorage({status: "Unexpected error"}))
  }
}

function* postAndGetEventSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getEvent({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateEventStorage({status: response.status}))
      }
    } catch (error) {
      yield put(updateEventStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateEventStorage({status: "Unexpected error"}))
  }
}

function* putAndGetEventSaga(action) {
  let response;
  console.log("PAG: ", action);
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        console.log("SUCCESS: ", response);
        yield put(
          getEvent({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateEventStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateEventStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateEventStorage({status: "Unexpected error"}))
  }
}

function* eventSaga() {
  yield takeEvery(GET_EVENT, getEventSaga)
  yield takeEvery(POST_AND_GET_EVENT, postAndGetEventSaga)
  yield takeEvery(PUT_AND_GET_EVENT, putAndGetEventSaga)
}

export default eventSaga