import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
// ==============================================================
import { fetchSongs } from "../redux/actions";
import Header from "./Layouts/Header";
import SongsList from "./Songs/SongsList";
import SelectedSong from "./Songs/SelectedSong";
import PageNotFound from "./PageNotFound";
// ==============================================================
// MATERIAL UI
// ==============================================================
import Styles from "./Styles";
import {
  Typography,
  Paper,
  Avatar,
  CssBaseline,
  Grid,
  withStyles
} from "@material-ui/core";
import QueueMusic from "@material-ui/icons/QueueMusic";
// ==============================================================
export class App extends Component {
  // ----------------------------------------------------
  renderSongsList = () => {
    return (
      <SongsList songs={this.props.songs} fetchSongs={this.props.fetchSongs} />
    );
  };
  // ----------------------------------------------------
  renderSelectedSong = props => {
    return <SelectedSong {...props} />;
  };
  // ----------------------------------------------------
  componentDidMount() {
    this.props.fetchSongs();
  }
  // ----------------------------------------------------
  render() {
    // ----------------------------------------------------
    // LOADING MATERIAL UI CLASSES FROM STYLES FILE
    // ----------------------------------------------------
    const classes = this.props.classes;
    return (
      <div>
        <Header fetchSongs={this.props.fetchSongs} />
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar} color="primary">
                <QueueMusic color="inherit" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sangeet
              </Typography>
              <Paper className={classes.Paper}>
                {/* ---------------------------------------------------- */}
                {/* REACT-ROUTING USING REACT-ROUTER-DOM */}
                {/* ---------------------------------------------------- */}
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() => this.renderSongsList()}
                  />
                  <Route
                    exact
                    path="/songs"
                    component={() => this.renderSongsList()}
                  />
                  <Route
                    path={`/songs/:songId`}
                    component={props => this.renderSelectedSong(props)}
                  />
                  <Route component={PageNotFound} />
                </Switch>
                {/* ---------------------------------------------------- */}
              </Paper>
            </div>
          </Grid>
          {/* ---------------------------------------------------- */}
          {/* RANDOM IMAGE DIV */}
          {/* ---------------------------------------------------- */}
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          {/* ---------------------------------------------------- */}
        </Grid>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
const styledComponent = withStyles(Styles.App)(App);
const mapStateToProps = state => {
  const { songs, selectedSong } = state.songs;
  return {
    songs,
    selectedSong
  };
};
export default connect(
  mapStateToProps,
  { fetchSongs }
)(styledComponent);
