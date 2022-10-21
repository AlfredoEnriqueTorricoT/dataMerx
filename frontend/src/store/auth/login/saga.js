import { takeEvery, put, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import { API_ERROR, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import AxiosServices from "store/api/AxiosServices"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({payload: {user, history}}) {

  let errorData = {}
  try {

    const response = yield call(AxiosServices.axLogin, user)

    if (response.status === 200) {
      console.log(response);
      yield put(loginSuccess(response));
      localStorage.setItem("dmAuth", response.data.token);
      
      localStorage.setItem(
        "userName",
        response.data.name
      )
      history.push("/clientes")
    } else {
      errorData = response
      console.log("LOGIN_FAIL: RESPONSE")
      console.log(response)
      yield put(API_ERROR(response))
    }

  } catch (error) {
    console.log("Login saga error")
    console.log(error)

    if (errorData === {}) {
      yield put(apiError(error))
    } else {
      yield put(apiError(errorData))
    }
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

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(fireBaseBackend.socialLoginUser, data, type)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
