import React, { Component } from "react";
import List from "@material-ui/core/List";
import SongsListItem from "./SongsListItem";
class SongsList extends Component {
  render() {
    const { songs, deleteSong } = this.props;
    return (
      <List>
        {songs && songs.length > 0 ? (
          songs.map(song => (
            <SongsListItem song={song} key={song._id} deleteSong={deleteSong} />
          ))
        ) : (
          <h4>No Songs</h4>
        )}
      </List>
    );
  }
}

export default SongsList;
