import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_MODEM,
  POST_MODEM,
  PUT_MODEM,
  DELETE_MODEM,
  POST_AND_GET_MODEM,
  PUT_AND_GET_MODEM,
  DELETE_AND_GET_MODEM,
  UPDATE_MODEM_STORAGE,
  POST_AND_UPDATE_PENDING_MODEM,
} from "./actionTypes"
import {getModem, updateModemStorage, updatePendingModem} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getModemSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)
    try {
      if (response.data.status == 200) {
        yield put(updateModemStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateModemStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateModemStorage({status: response.response.status, message: (response.data.message || "")}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateModemStorage({status: "Unexpected error"}))
  }
}

function* postModemSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    console.log(action);
    try {
      if (response.data.status == 200) {
        yield put(updateModemStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateModemStorage({status: response.data.message}))
      } 
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateModemStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.response.data.status}))
      } else {
        yield put(updateModemStorage({status: response.response.data.status, message: response.response.data.message}))
      }
    }
  } catch (error) {
    yield put(updateModemStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* putModemSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(updateModemStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateModemStorage({status: response.data.status, message: response.data.message}))
      }  
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateModemStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateModemStorage({status: response.response.data.status, message: response.response.data.message}))
      } 
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateModemStorage({status: "Unexpected error"}))
  }
}

function* postAndGetModemSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getModem({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateModemStorage({status: response.response.status, message: (response.response.data.message || "")}))
      }
    } catch (error) {
      if (response.response.status == 432) {
        yield put(updateModemStorage({status: response.response.status, message: (response.response.data.message || "")}))
      } else
      yield put(updateModemStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateModemStorage({status: "Unexpected error"}))
  }
}

function* postAndUpdatePendingModem(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          updatePendingModem({
            action: {dataToUpdate: action.payload.dataToUpdate}
          })
        )
      } else {
        yield put(updateModemStorage({status: response.response.status, message: (response.response.data.message || "")}))
      }
    } catch (error) {
      if (response.response.status == 432) {
        yield put(updateModemStorage({status: response.response.status, message: (response.response.data.message || "")}))
      } else
      yield put(updateModemStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateModemStorage({status: "Unexpected error"}))
  }
}

function* putAndGetModemSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getModem({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateModemStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateModemStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateModemStorage({status: "Unexpected error"}))
  }
}

function* modemSaga() {
  yield takeEvery(GET_MODEM, getModemSaga)
  yield takeEvery(POST_MODEM, postModemSaga)
  yield takeEvery(PUT_MODEM, putModemSaga)
  yield takeEvery(POST_AND_UPDATE_PENDING_MODEM, postAndUpdatePendingModem)
  yield takeEvery(POST_AND_GET_MODEM, postAndGetModemSaga)
  yield takeEvery(PUT_AND_GET_MODEM, putAndGetModemSaga)
}

export default modemSaga