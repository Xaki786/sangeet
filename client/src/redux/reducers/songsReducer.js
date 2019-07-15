import {
  FETCH_SONGS,
  DELETE_SONG,
  FETCH_SELECTED_SONG
} from "../actions/types";
const initialState = { songs: [], selectedSong: null };
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return { ...state, songs: action.songs };

    case DELETE_SONG:
      const songs = state.songs.filter(item => item._id !== action.song._id);
      return { ...state, songs: songs };

    case FETCH_SELECTED_SONG:
      return { ...state, selectedSong: action.selectedSong };

    default:
      return state;
  }
};
