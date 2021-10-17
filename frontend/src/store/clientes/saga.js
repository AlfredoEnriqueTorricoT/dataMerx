import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_CLIENTES, INSERT_CLIENTE, EDIT_CLIENTE } from "./actionTypes"
import {
  getClientes,
  waitClientes,
  getClientesSuccess,
  getClientesFail,
} from "./actions"

//Include Both Helper File with needed methods
import AxiosServices from "../api/AxiosServices"
//import { insertCliente, updateCliente } from "store/actions"

function* fetchClientes(action) {
  try {
    yield put(waitClientes())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getClientesSuccess(response))
  } catch (error) {
    yield put(getClientesFail(error))
  }
}

function* sInsertCliente(action) {
  try {
    yield put(waitClientes())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getClientes())
  } catch (error) {
    yield put(getClientesFail(error))
  }
}

function* sUpdateCliente(action) {
  try {
    yield put(waitClientes())
    const response = yield call(AxiosServices.POST, action.payload)
    yield put(getClientes())
  } catch (error) {
    yield put(getClientesFail(error))
  }
}

function* clientesSaga() {
  yield takeEvery(GET_CLIENTES, fetchClientes)
  yield takeEvery(INSERT_CLIENTE, sInsertCliente)
  yield takeEvery(EDIT_CLIENTE, sUpdateCliente)
}

export default clientesSaga
