import {
  CHECK_AUTHORIZATION,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_USER
} from './actiontypes.js'

const initState = {
  idToken: null,
  userId: null,
  firstName: null,
  lastName: null,
  role: null
}

export default function authReducer (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.idToken
      }
    case LOGOUT:
      console.log('logout')
      return initState
    case REGISTER_USER:
      return {
        ...state,
        idToken: action.idToken
      }
    default:
      return state
  }
}
