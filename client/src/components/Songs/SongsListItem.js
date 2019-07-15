import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteSong } from "../../redux/actions";
// ==============================================================
// MATERIAL UI
// ==============================================================
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton
} from "@material-ui/core";
import { QueueMusic, Delete as DeleteIcon } from "@material-ui/icons";
import Styles from "./Styles";
// ==============================================================

const SongsListItem = ({ song, deleteSong }) => {
  const classes = Styles.SongListItem();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <QueueMusic color="secondary" />
        </Avatar>
      </ListItemAvatar>
      <Link to={`/songs/${song._id}`} className={classes.Link}>
        <ListItemText
          primary={song.name}
          secondary={`Duration: ${song.length}`}
        />
      </Link>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Delete"
          onClick={() => deleteSong(song)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default connect(
  null,
  { deleteSong }
)(SongsListItem);
