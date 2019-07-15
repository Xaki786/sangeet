import { FETCH_SONGS, DELETE_SONG, FETCH_SELECTED_SONG } from "./types";
import Axios from "axios";
export const fetchSongs = () => async disptach => {
  const res = await Axios.get("http://localhost:5000/api/songs");
  return disptach({
    type: FETCH_SONGS,
    songs: res.data.songs
  });
};

export const deleteSong = song => async dispatch => {
  await Axios.delete(`http://localhost:5000/api/songs/${song._id}`);
  return dispatch({
    type: DELETE_SONG,
    song: song
  });
};

export const fetchSelectedSong = song => async dispatch => {
  const res = await Axios.get(`http://localhost:5000/api/songs/${song._id}`);
  const url = await `http://localhost:5000${res.data.url}`;
  return dispatch({
    type: FETCH_SELECTED_SONG,
    selectedSong: { ...song, playBackUrl: url }
  });
};
