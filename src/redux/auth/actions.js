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

export function loginRequest (username, password) { // can also be used for register success
  return {
    type: LOGIN_REQUEST,
    username,
    password
  }
}

export function logout (receipt) {
  return {
    type: LOGOUT,
    receipt
  }
}

export function registerUser (firstName, lastName, email, username, password, service) {
  return {
    type: REGISTER_USER,
    firstName,
    lastName,
    email,
    username,
    password,
    service
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
