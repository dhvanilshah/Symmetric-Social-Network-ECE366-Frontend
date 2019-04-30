import { FLAG_FRIENDS, UNFLAG_FRIENDS } from "./actiontypes.js";

const initState = {
  updateFriends: false
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case FLAG_FRIENDS:
      return {
        ...state,
        updateFriends: true
      };
    case UNFLAG_FRIENDS:
      return {
        ...state,
        updateFriends: false
      };
    default:
      return state;
  }
}
