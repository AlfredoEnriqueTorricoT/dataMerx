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
import eventSaga from "./event/saga"
import clientSaga from "./clients/saga"
import watchSaga from "./watch/saga"
import tagSaga from "./tags/saga"
import reportDeviceSaga from "./report-device/saga"
import ReportDeviceSigueloSaga from "./report-device-siguelo/saga"
import PlatformCountSaga from "./platform-count/saga"

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
    fork(modemSaga),
    fork(eventSaga),
    fork(clientSaga),
    fork(watchSaga),
    fork(tagSaga),
    fork(reportDeviceSaga),
    fork(ReportDeviceSigueloSaga),
    fork(PlatformCountSaga)
  ])
}
