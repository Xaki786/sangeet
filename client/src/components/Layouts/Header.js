import React from "react";
import { Link as RouterLink } from "react-router-dom";
// ==============================================================
// MATERIAL UI
// ==============================================================
import Styles from "./Styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar
} from "@material-ui/core";
import QueueMusic from "@material-ui/icons/QueueMusic";
// ==============================================================
const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

// ==============================================================
const Header = props => {
  const classes = Styles.Header();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            component={AdapterLink}
            to="/"
          >
            <Avatar className={classes.avatar}>
              <QueueMusic color="secondary" />
            </Avatar>
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            component={AdapterLink}
            color="inherit"
            to="/"
            onClick={props.fetchSongs}
          >
            Sangeet
          </Typography>
          <Button
            color="inherit"
            component={AdapterLink}
            to="/songs"
            onClick={props.fetchSongs}
          >
            SONGS
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
