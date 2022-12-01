import { takeEvery, put, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError } from "./actions"
import AxiosServices from "store/api/AxiosServices"

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper"

// const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  let response
  try {
    response = yield call(AxiosServices.axLogin, user)
    if (response.data.status == 200) {
      yield put(loginSuccess())
      localStorage.setItem("userToken", response.data.data.token)
      let aUser = {name: response.data.data.name, email: response.data.data.email}
      localStorage.setItem("authUser", JSON.stringify(aUser))
      history.push("/dashboard")
    } else {
      yield put(apiError("Correo o contraseña incorrectos"))
      console.log(response);
    }
  } catch (error) {
    yield put(apiError(error.message))
    console.log(error, response);
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga