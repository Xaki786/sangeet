import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
// =====================================================
// MATERIAL-UI
// =====================================================
import { Typography, Button } from "@material-ui/core";
// =====================================================
import { fetchSelectedSong, fetchSongs } from "../../redux/actions";
import SoundPlayer from "../SoundPlayer";
import SongDetail from "./SongDetail";
// =====================================================
const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));
// =====================================================
const SelectedSong = ({ match, songs, selectedSong, fetchSelectedSong }) => {
  const { songId } = match.params;
  if (songs.length > 0) {
    const song = songs.find(song => song._id === songId);
    if (!selectedSong && song) {
      fetchSelectedSong(song);
    } else if (selectedSong && selectedSong._id !== song._id) {
      fetchSelectedSong(song);
    }
  }
  return (
    <div>
      {selectedSong ? (
        <div>
          <div>
            <SongDetail
              name={selectedSong.name}
              duration={selectedSong.length}
            />
          </div>
          <div>
            <SoundPlayer playBackUrl={selectedSong.playBackUrl} />
          </div>
          <div>
            <Button
              color="secondary"
              variant="outlined"
              component={AdapterLink}
              to="/songs"
            >
              Playlist
            </Button>
          </div>
        </div>
      ) : (
        <Typography variant="h6">Loading...!!</Typography>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  const { selectedSong, songs } = state.songs;
  return {
    selectedSong,
    songs
  };
};
export default connect(
  mapStateToProps,
  { fetchSelectedSong, fetchSongs }
)(SelectedSong);
