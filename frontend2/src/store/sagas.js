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
import userSaga from "./users/saga"
import eventSaga from "./event/saga"
import clientSaga from "./clients/saga"
import tagSaga from "./tags/saga"
import ReportDeviceSigueloSaga from "./report-device-siguelo/saga"

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
    fork(userSaga),
    fork(eventSaga),
    fork(clientSaga),
    fork(tagSaga),
    fork(ReportDeviceSigueloSaga),
  ])
}
