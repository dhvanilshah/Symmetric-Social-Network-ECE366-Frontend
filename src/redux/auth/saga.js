import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import actions from "./actions";

export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", function*(payload) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      idToken: payload.token
    });
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem("token", payload.idToken);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    console.log("removing-token");
    localStorage.removeItem("token");
  });
}

// export function* checkAuthorization() {
//   yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
//     // const token = getToken().get("token");
//     const token = 0; // fix for now
//     if (token) {
//       yield put({
//         type: actions.LOGIN_SUCCESS,
//         idToken: token
//       });
//     }
//   });
// }

// // export function* checkAuthorization() {
// //   yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
// //     const token = getToken().get("token");
// //     if (token) {
// //       yield put({
// //         type: actions.LOGIN_SUCCESS,
// //         idToken: token
// //       });
// //       yield put(push("/dashboard"));
// //     }
// //   });
// // }

export default function* rootSaga() {
  yield all([
    // fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
