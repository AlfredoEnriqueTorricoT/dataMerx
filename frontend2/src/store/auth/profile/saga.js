import { takeEvery, fork, put, call, all } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes";
import { profileSuccess, profileError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper";

import AxiosServices from "store/api/AxiosServices";

const fireBaseBackend = getFirebaseBackend();

function* editProfile({ payload: { user } }) {
  let response

  try {
    response = yield call(AxiosServices.PUT, {payload: {name: user.username}, url: "login"})
    if (response.data.status == 200) {
      let uData = JSON.parse(localStorage.getItem("userData"))
      uData.name = response.data.data.name
      localStorage.setItem("userData", JSON.stringify(uData))
      yield put(
        yield put(profileSuccess("El nombre de usuario ha sido actualizado"))
      )
    } else {
      console.log("40?: ", response);
      yield put(profileError(response.message));
    }
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(
    //     fireBaseBackend.editProfileAPI,
    //     user.username,
    //     user.idx
    //   );
    //   yield put(profileSuccess(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtProfile, "/post-jwt-profile", {
    //     username: user.username,
    //     idx: user.idx,
    //   });
    //   yield put(profileSuccess(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
    //   const response = yield call(postFakeProfile, {
    //     username: user.username,
    //     idx: user.idx,
    //   });
    //   yield put(profileSuccess(response));
    // }
  } catch (error) {
    console.log(error);
    yield put(profileError("Error inesperado"));
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
