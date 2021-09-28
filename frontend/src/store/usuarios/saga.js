import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_USUARIOS, INSERT_USUARIO, EDIT_USUARIO } from "./actionTypes"
import {
  getUsuarios,
  waitUsuarios,
  getUsuariosSuccess,
  getUsuariosFail,
} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertUsuario, updateUsuario } from "store/actions"

function* fetchUsuarios(action) {
  try {
    yield put(waitUsuarios())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getUsuariosSuccess(response))
    console.log("GET_SUCCESS: ", response)
  } catch (error) {
    yield put(getUsuariosFail(error))
    console.log("GET_FAIL: ", error)
  }
}

function* sInsertUsuario(action) {
  try {
    yield put(waitUsuarios())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getUsuarios())
    console.log(response)
  } catch (error) {
    yield put(getUsuariosFail(error))
    console.log("CONNECT_I_FAIL: ", error)
  }
}

function* sUpdateUsuario(action) {
  try {
    yield put(waitUsuarios())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getUsuarios())
    console.log(response)
  } catch (error) {
    yield put(getUsuariosFail(error))
    console.log("CONNECT_U_FAIL: ", error)
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USUARIOS, fetchUsuarios)
  yield takeEvery(INSERT_USUARIO, sInsertUsuario)
  yield takeEvery(EDIT_USUARIO, sUpdateUsuario)
}

export default contactsSaga
