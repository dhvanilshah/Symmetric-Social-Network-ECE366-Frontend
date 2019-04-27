import { SELECT_SONG, CLEAR_SONG } from "./actiontypes.js";

const initState = {
  songSelected: false,
  song: { album: null, artist: null, title: null, url: null }
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case SELECT_SONG:
      return {
        ...state,
        song: action.song,
        songSelected: true
      };
    case CLEAR_SONG: {
      return {
        ...initState
      };
    }
    default:
      return state;
  }
}
