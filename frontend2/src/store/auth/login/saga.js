import { takeEvery, put, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError } from "./actions"
import AxiosServices from "store/api/AxiosServices"

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper"

// const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  console.log("LOGIN USER");
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

function* AuthSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default AuthSaga
