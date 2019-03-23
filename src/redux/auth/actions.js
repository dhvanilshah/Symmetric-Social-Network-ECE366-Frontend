import {
  CHECK_AUTHORIZATION,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './actiontypes.js'

export function checkAuthorization () {
  return {
    type: CHECK_AUTHORIZATION
  }
}

export function loginRequest () {
  return {
    type: LOGIN_REQUEST
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

// const actions = {
//   CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
//   LOGIN_REQUEST: "LOGIN_REQUEST",
//   LOGOUT: "LOGOUT",
//   LOGIN_SUCCESS: "LOGIN_SUCCESS",
//   LOGIN_ERROR: "LOGIN_ERROR",
//   checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
//   login: token => ({
//     type: actions.LOGIN_REQUEST,
//     token
//   }),
//   logout: () => ({
//     type: actions.LOGOUT
//   })
// }
// export default actions
