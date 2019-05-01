import { SELECT_SONG, CLEAR_SONG, UPDATE_FEED } from "./actiontypes.js";

export function updateSong(song) {
  return {
    type: SELECT_SONG,
    song
  };
}
export function clearSong(song) {
  return {
    type: CLEAR_SONG
  };
}

export function updateFeed(bool) {
  return {
    type: UPDATE_FEED,
    bool
  };
}
