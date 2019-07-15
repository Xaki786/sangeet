import songsReducer from "./songsReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  songs: songsReducer
});
export default rootReducer;
