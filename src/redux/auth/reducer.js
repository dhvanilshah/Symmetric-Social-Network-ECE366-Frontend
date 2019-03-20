import actions from "./actions";

const initState = {
  idToken: null,
  userId: null,
  firstName: null,
  lastName: null,
  role: null
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    // case actions.LOGIN_REQUEST:
    //   return {
    //     ...state,
    //     idToken: action.token
    //   };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.idToken
        // userId: action.userId,
        // firstName: action.firstName,
        // lastName: action.lastName,
        // role: action.role
      };
    case actions.LOGOUT:
      console.log("logout");
      return initState;
    default:
      return state;
  }
}
