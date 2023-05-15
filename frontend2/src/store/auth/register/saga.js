import { takeEvery, put, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

import AxiosServices from "../../api/AxiosServices"
import { showToast } from "components/toast";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  let response;

  try {
    response = yield call(AxiosServices.POST, {payload: user, url: "user"})
    if (response.data.status == 200) {
      yield put(registerUserSuccessful(user.name));
      history.push("/login")
      showToast({type: "success", message: "El usuario ha sido registrado"})
    } else {
      showToast({type: "warning", message: "El usuario no pudo ser registrado"})
      yield put(registerUserFailed("Correo o contraseña incorrecto"));
    }
  } catch (error) {
    showToast({type: "warning", message: "El usuario no pudo ser registrado"})
    yield put(registerUserFailed("Error de red"));
  }
 // ##########
  // try {
  //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //     const response = yield call(
  //       fireBaseBackend.registerUser,
  //       user.email,
  //       user.password
  //     );
  //     yield put(registerUserSuccessful(response));
  //   } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
  //     const response = yield call(postJwtRegister, "/post-jwt-register", user);
  //     yield put(registerUserSuccessful(response));
  //   } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
  //     const response = yield call(postFakeRegister, user);
  //     yield put(registerUserSuccessful(response));
  //   }
  // } catch (error) {
  //   yield put(registerUserFailed(error));
  // }
}

function* accountSaga() {
  yield takeEvery(REGISTER_USER, registerUser);
}

export default accountSaga;
