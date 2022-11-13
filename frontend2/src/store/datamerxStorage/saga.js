import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
    GET_DATA,
    POST_DATA,
    PUT_DATA,
    DELETE_DATA,
    POST_AND_GET_DATA,
    PUT_AND_GET_DATA,
    DELETE_AND_GET_DATA,
} from "./actionTypes"
import {getData, updateStorage} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertUsuario, updateUsuario } from "store/actions"

function* getDataSaga(action) {
  let response;
  try {
    response = yield call(AxiosServices.GET, action.payload)
    console.log("SUCCESS: ", response);
    // yield put(getUsuariosSuccess(response))
} catch (error) {
    console.log("FAIL: ", response, error);
    // yield put(getUsuariosFail(error))
  }
}

function* sInsertUsuario(action) {
  try {
    yield put(waitUsuarios())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getUsuarios())
  } catch (error) {
    yield put(getUsuariosFail(error))
  }
}

function* sUpdateUsuario(action) {
  try {
    yield put(waitUsuarios())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getUsuarios())
  } catch (error) {
    yield put(getUsuariosFail(error))
  }
}

function* _datamerxSaga() {
  yield takeEvery(GET_DATA, getDataSaga)
  yield takeEvery(INSERT_USUARIO, sInsertUsuario)
  yield takeEvery(EDIT_USUARIO, sUpdateUsuario)
}

export default _datamerxSaga