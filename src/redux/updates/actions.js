import { FLAG_FRIENDS, UNFLAG_FRIENDS } from "./actiontypes.js";

export function flagFriends() {
  return {
    type: FLAG_FRIENDS
  };
}

export function unflagFriends() {
  return {
    type: UNFLAG_FRIENDS
  };
}
