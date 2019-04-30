import { SELECT_SONG, CLEAR_SONG } from "./actiontypes.js";

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
