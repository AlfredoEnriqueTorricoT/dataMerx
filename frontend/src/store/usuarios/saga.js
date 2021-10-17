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
  } catch (error) {
    yield put(getUsuariosFail(error))
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

function* contactsSaga() {
  yield takeEvery(GET_USUARIOS, fetchUsuarios)
  yield takeEvery(INSERT_USUARIO, sInsertUsuario)
  yield takeEvery(EDIT_USUARIO, sUpdateUsuario)
}

export default contactsSaga
