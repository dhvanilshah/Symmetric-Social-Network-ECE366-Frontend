import { SELECT_SONG, CLEAR_SONG, UPDATE_FEED } from "./actiontypes.js";

const initState = {
  songSelected: false,
  song: { album: null, artist: null, title: null, url: null, id: null },
  updateFeed: false
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
    case UPDATE_FEED: {
      console.log("updatefeed", action.bool);
      return {
        ...state,
        updateFeed: action.bool
      };
    }
    default:
      return state;
  }
}
