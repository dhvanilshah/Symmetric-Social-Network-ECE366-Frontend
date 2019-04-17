import {
  CHECK_AUTHORIZATION,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_USER,
  REGISTER_SUCCESS
} from './actiontypes.js'

export function checkAuthorization (token) {
  return {
    type: CHECK_AUTHORIZATION,
    token
  }
}

export function loginRequest (token) { // can also be used for register success
  return {
    type: LOGIN_REQUEST,
    token
  }
}

export function logout (receipt) {
  return {
    type: LOGOUT,
    receipt
  }
}

export function registerUser (receipt) {
  return {
    type: REGISTER_USER,
    receipt
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
