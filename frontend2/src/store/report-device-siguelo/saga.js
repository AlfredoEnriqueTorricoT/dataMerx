import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_REPORT_DEVICE,
  POST_REPORT_DEVICE,
  PUT_REPORT_DEVICE,
  DELETE_REPORT_DEVICE,
  POST_AND_GET_REPORT_DEVICE,
  PUT_AND_GET_REPORT_DEVICE,
  DELETE_AND_GET_REPORT_DEVICE,
  UPDATE_REPORT_DEVICE_STORAGE,
} from "./actionTypes"
import {getReportDevice, updateReportDeviceStorage} from "./actions"

import AxiosServices from "../api/AxiosServices"

function* getReportDeviceSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.url)
    try {
      if (response.data.status == 200) {
        yield put(updateReportDeviceStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateReportDeviceStorage({status: response.data.status}))
      }  
    } catch (error) {
      yield put(updateReportDeviceStorage({status: response.response.status, message: (response.data.message || "")}))
    }
    
} catch (error) {
  console.log("resp:", response);
  console.log("error:", error);
  yield put(updateReportDeviceStorage({status: "Unexpected error"}))
  }
}

function* postReportDeviceSaga(action) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})
    try {
      if (response.data.status == 200) {
        yield put(updateReportDeviceStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status}))
      } else {
        yield put(updateReportDeviceStorage({status: response.data.message}))
      } 
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateReportDeviceStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.response.data.status}))
      } else {
        yield put(updateReportDeviceStorage({status: response.response.data.status, message: response.response.data.message}))
      }
    }
  } catch (error) {
    yield put(updateReportDeviceStorage({status: error.message}))
    console.log("FAIL: ", response, error, action);
  }
}

function* putReportDeviceSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(updateReportDeviceStorage({
          payload: response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateReportDeviceStorage({status: response.data.status, message: response.data.message}))
      }  
    } catch (error) {
      if (response.response.data.status == 200) {
        yield put(updateReportDeviceStorage({
          payload: response.response.data.data,
          saveAs: action.saveAs,
          status: response.data.status})
        )
      } else {
        yield put(updateReportDeviceStorage({status: response.response.data.status, message: response.response.data.message}))
      } 
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateReportDeviceStorage({status: "Unexpected error"}))
  }
}

function* postAndGetReportDeviceSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.POST, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getReportDevice({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateReportDeviceStorage({status: response.response.status, message: (response.response.data.message || "")}))
      }
    } catch (error) {
      if (response.response.status == 432) {
        yield put(updateReportDeviceStorage({status: response.response.status, message: (response.response.data.message || "")}))
      } else
      yield put(updateReportDeviceStorage({status: response.response.status}))
    }

  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateReportDeviceStorage({status: "Unexpected error"}))
  }
}

function* putAndGetReportDeviceSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.PUT, {payload: action.payload, url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getReportDevice({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateReportDeviceStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateReportDeviceStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateReportDeviceStorage({status: "Unexpected error"}))
  }
}

function* deleteAndGetReportDeviceSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.DELETE, {url: action.url})

    try {
      if (response.data.status == 200) {
        yield put(
          getReportDevice({
            saveAs: action.saveAs,
            url: action.urlToGet || action.url,
          })
        )
      } else {
        yield put(updateReportDeviceStorage({status: response.data.status, message: (response.data.message || "")}))
      }  
    } catch (error) {
      yield put(updateReportDeviceStorage({status: response.response.status}))
    }
    
  } catch (error) {
    console.log("resp:", response);
    console.log("error:", error);
    yield put(updateReportDeviceStorage({status: "Unexpected error"}))
  }
}

function* ReportDeviceSigueloSaga() {
  yield takeEvery(GET_REPORT_DEVICE, getReportDeviceSaga)
  yield takeEvery(POST_REPORT_DEVICE, postReportDeviceSaga)
  yield takeEvery(PUT_REPORT_DEVICE, putReportDeviceSaga)
  yield takeEvery(POST_AND_GET_REPORT_DEVICE, postAndGetReportDeviceSaga)
  yield takeEvery(PUT_AND_GET_REPORT_DEVICE, putAndGetReportDeviceSaga)
  yield takeEvery(DELETE_AND_GET_REPORT_DEVICE, deleteAndGetReportDeviceSaga)
}

export default ReportDeviceSigueloSaga