import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import mBrandSaga from "./modem-brands/saga"
import simSaga from "./sims/saga"
import userSaga from "./users/saga"
import platformSaga from "./platform/saga"
import carSaga from "./car/saga"
import modemSaga from "./modem/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(mBrandSaga),
    fork(simSaga),
    fork(platformSaga),
    fork(carSaga),
    fork(userSaga),
    fork(modemSaga)
  ])
}
