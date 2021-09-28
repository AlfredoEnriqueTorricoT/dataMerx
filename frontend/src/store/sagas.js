import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import usuariosSaga from "./usuarios/saga"
import simsSaga from "./sims/saga"
import platformsSaga from "./platforms/saga"
import modemsSaga from "./modems/saga"
import dispositivosSaga from "./dispositivos/saga"
import clientesSaga from "./clientes/saga"
import vehiculosSaga from "./vehiculos/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(usuariosSaga),
    fork(simsSaga),
    fork(platformsSaga),
    fork(modemsSaga),
    fork(dispositivosSaga),
    fork(clientesSaga),
    fork(vehiculosSaga),
  ])
}
