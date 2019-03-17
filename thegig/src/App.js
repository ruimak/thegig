import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import BandInfo from "./components/bandPage/BandInfo";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArtistEvents from "./components/bandPage/ArtistEvents";
import SetLists from "./components/bandPage/SetLists";
import ArtistNews from "./components/bandPage/ArtistNews";
import SignIn from "./components/authentication/SignIn";
import LogIn from "./components/authentication/LogIn";
import firebase from "./firebase.js";
import FollowUnfollowButton from "./components/bandPage/FollowUnfollowButton";
import MyBands from "./components/defaultPage/Mybands";
import LogOut from "./components/authentication/LogOut";
import SetLocation from "./components/location/SetLocation";
import AutoGetLocation from "./components/location/AutoGetLocation";
import { userBandsList } from "./api";
import HomeBandNews from "./components/defaultPage/HomeBandNews";
import Billboards from "./components/defaultPage/Billboards";
import Settings from "./components/Settings";
import Spotifys from "./components/Spotify";
import SongLyrics from "./components/songsPage/SongLyrics";
import MyEvents from "./components/defaultPage/MyEvents";
import ArtistNewsContent from "./components/bandPage/ArtistNewsContent";
import Discography from "./components/bandPage/Discography";
import Album from "./components/bandPage/Album";
import RedirectButton from "./components/utilities/RedirectButton";
import SongInfo from "./components/songsPage/SongInfo";

// import styles
import "./App.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

// import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class App extends Component {
  state = {
    bandInfoInApp: null,
    userBands: [],
    loggedInUserId: null,
    newsArticle: null,
    spotifyLoggedIn: ""
  };

  componentDidMount() {
    console.log(this.props, "CLASSES");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedInUserId: user.uid });

        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              const bands = userData.val().users[this.state.loggedInUserId]
                .bands
                ? Object.values(
                    userData.val().users[this.state.loggedInUserId].bands
                  )
                : [];

              this.setState({ userBands: bands });
            }.bind(this)
          );
      } else {
        this.setState({ loggedInUserId: null });
        //WE SHOUT REMOVE THIS NEXT QUERY, JUST SET STATE WITH []
        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              this.setState({ userBands: [] });
            }.bind(this)
          );
      }
    });
  }

  userIsLoggedIn = this.userIsLoggedIn.bind(this);
  userIsLoggedIn(loggedInState) {
    console.log(loggedInState, "this is the logged in state");
    this.setState({ spotifyLoggedIn: loggedInState });
  }

  getBandInformation = band => {
    this.setState({
      bandInfoInApp: band
    });
  };

  eraseBandInfo = () => {
    this.setState({
      bandInfoInApp: null
    });
  };

  getSingleArticle = article => {
    console.log(article, "THIS IS THE ARTICLE AHGPAWHGWAs");
    this.setState({
      newsArticle: article
    });
    // this.props.history.push(`/${this.state.input}/news/hello`);
  };

  render() {
    console.log(this.state.spotifyLoggedIn, "this is spotify login");
    const { classes } = this.props;
    return (
      <div>
        {/* this is the main navbar, displayed throughout the app */}
        <div className={classes.root}>
          {/* <Toolbar> */}
            <div className="navBar" position="fixed">
              <img
                src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/20604412_281592685577903_8591182496679565167_n.png?_nc_cat=107&_nc_ht=scontent-lhr3-1.xx&oh=7abfaffd608ac2791c39ad49f222db97&oe=5D19502A"
                height="50"
                width="50"
              />
              <div className="searchAndNav">
                <SearchBar getBandInformation={this.getBandInformation} />
                <Route
                  path="/*"
                  render={({ match }) => (
                    <NavBar
                      tabs={[
                        ["", "DefaultNews"],
                        ["myBands", "My Bands"],
                        ["myEvents", "My Events"],
                        ["topCharts", "Top Charts"]
                      ]}
                    />
                  )}
                />
              </div>
              <RedirectButton
                location={"/Settings"}
                displayLocation={"Settings"}
                eraseBandInfo={this.eraseBandInfo}
              />
            </div>
          {/* </Toolbar> */}
        </div>

        <RedirectButton
          location={"/"}
          displayLocation={"Home"}
          eraseBandInfo={this.eraseBandInfo}
        />

        {/* <Settings  loggedInUser={this.state.loggedInUserId}/> */}

        {/* {this.state.bandInfoInApp && this.state.userBands && (
          <FollowUnfollowButton
            userId={this.state.loggedInUserId}
           band={this.state.bandInfoInApp.name}
            bandsFollowed={
              this.state.userBands !== [] ? this.state.userBands : null
            }
          />
        )}  */}

        {/* <SongLyrics bandName={"eminem"} songTitle={"without me"} /> */}
        <SetLocation loggedInUser={this.state.loggedInUserId} />
        <AutoGetLocation />

        {!this.state.loggedInUserId && <LogIn />}
        {!this.state.loggedInUserId && <SignIn />}

        <LogOut loggedInUserId={this.state.loggedInUserId} />
        {/* {this.state.loggedInUserId && (
          <div onClick={logout}>{"click here to log out"}</div>
        )} */}

        {/* <FollowedBandsNews /> */}
        {/* This is the navbar div */}
        {this.state.loggedInUserId && (
          <div id="mainDiv">
            <Route
              path="/artist/:band/*"
              render={({ match }) => (
                <FollowUnfollowButton params={match.params} />
              )}
            />
            <Switch>
              <Route
                path="/artist/:band"
                render={({ match }) => (
                  <NavBar
                    tabs={[
                      ["news", "News"],
                      ["albums", "Discography"],
                      ["info", "Band Info"],
                      ["events", "Events"],
                      ["setlists", "Setlists"]
                    ]}
                    params={match.params}
                  />
                )}
              />
              <Route
                path="/*"
                render={({ match }) => (
                  <NavBar
                    tabs={[
                      ["", "DefaultNews"],
                      ["myBands", "My Bands"],
                      ["myEvents", "My Events"],
                      ["topCharts", "Top Charts"]
                    ]}
                  />
                )}
              />
            </Switch>

            <Switch>
              {/* <Route exact path="/NotFound" component={NotFound} /> */}
              {/* <Route exact path="/" component={DefaultBandNews} /> */}
              <Route exact path="/" render={props => <HomeBandNews />} />
              <Route
                exact
                path="/Settings"
                render={props => (
                  <Settings
                    loggedInUser={this.state.loggedInUserId}
                    spotifylogin={this.userIsLoggedIn}
                  />
                )}
              />
              <Route
                exact
                path="/myBands"
                render={props => <MyBands myBands={this.state.userBands} />}
              />
              <Route
                exact
                path="/myEvents"
                render={props => (
                  <MyEvents
                    myBands={this.state.userBands}
                    loggedInUserId={this.state.loggedInUserId}
                  />
                )}
              />
              <Route exact path="/topCharts" render={props => <Billboards />} />

              <Route
                exact
                path="/artist/:band/info"
                render={({ match }) => <BandInfo params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/news"
                render={({ match }) => (
                  <ArtistNews
                    params={match.params}
                    getArticle={this.getSingleArticle}
                  />
                )}
              />
              <Route
                exact
                path="/artist/:band/news/:newsTitle"
                render={({ match }) => (
                  <ArtistNewsContent
                    params={match.params}
                    article={this.state.newsArticle}
                  />
                )}
              />
              <Route
                exact
                path="/artist/:band/albums"
                render={({ match }) => <Discography params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/albums/:albumName"
                render={({ match }) => <Album params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/events"
                render={({ match }) => <ArtistEvents params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/setlists"
                render={({ match }) => <SetLists params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/song/:songTitle/lyrics"
                render={({ match }) => <SongLyrics params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/song/:songTitle"
                render={({ match }) => (
                  <Spotifys
                    params={match.params}
                    loginState={this.state.spotifylogin}
                  />
                )}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
