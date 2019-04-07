import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import BandInfo from "./components/bandPage/BandInfo";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArtistEvents from "./components/bandPage/ArtistEvents";
import SetLists from "./components/bandPage/SetLists";
import ArtistNews from "./components/bandPage/ArtistNews";
import firebase from "./firebase.js";
import MyBands from "./components/defaultPage/Mybands";
import HomeBandNews from "./components/defaultPage/HomeBandNews";
import Billboards from "./components/defaultPage/Billboards";
import Settings from "./components/Settings";
import Deezer from "./components/songsPage/Deezer";
import SongLyrics from "./components/songsPage/SongLyrics";
import MyEvents from "./components/defaultPage/MyEvents";
import ArtistNewsContent from "./components/bandPage/ArtistNewsContent";
import Discography from "./components/bandPage/Discography";
import Album from "./components/bandPage/Album";
import RedirectButton from "./components/utilities/RedirectButton";
import SetLocationOnAuth from "./components/authentication/SetLocationOnAuth";
import Loading from "./components/authentication/Loading";
import InvalidUrl from "./components/error/InvalidUrl";
import logo from "./cropped2.jpg";
import { createUserWithFacebook } from "./api";

import "./styles/App.css";

import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AuthenticationScreen from "./components/authentication/AuthenticationScreen";

//This is the personalized theme passed to components to change their color.
//We're using it to personalize the buttons in the main navbar, making them white.
const theme = createMuiTheme({
  palette: {
    primary: { main: "#FFFFFF" }
    // secondary: { main: '#11cb5f' },
    // error: red,
  },

  Button: {
    // Name of the styleSheet
    root: {
      // Name of the rule
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "black",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .30)"
    }
  }
});

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
    userLocation: null,
    loggedInUserId: null,
    isLoading: true
  };

  componentDidMount() {
    //This next function checks if the user is logged in. It also gets his location if he is.
    //The location is needed because if he doesnt have one, a component to insert location will render.
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoading: true });
      if (user) {
        this.setState({ loggedInUserId: user.uid });

        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              if (userData.val().users[user.uid]) {
                const location = userData.val().users[this.state.loggedInUserId]
                  .location;
                this.setState({
                  userLocation: location,
                  isLoading: false
                });
              } else {
                createUserWithFacebook(
                  user.displayName.split(' ')[0],
                  user.displayName.split(' ')[1],
                  user.email,
                  user.uid
                ).then(()=>{
                  this.setState({ loggedInUserId: user.uid, isLoading: false });
                } );
              }
            }.bind(this)
          );
      } else {
        this.setState({ loggedInUserId: null, isLoading: false });
      }
    });
  }

  getLocationUpdate = location => {
    this.setState({
      userLocation: location
    });
  };

  render() {
    const { isLoading } = this.state;
    const { classes } = this.props;

    if (isLoading) {
      return <Loading />;
    } else
      return (
        <div className="app" style={{ height: "100%", width:'100vw' }}>
          {/* These next two are the login and registration components, rendered if the user isnt logged in to firebase */}
          {!this.state.loggedInUserId && <AuthenticationScreen />}

          {/* In the case the user IS logged in but doesnt have a location yet, this next component is rendered */}
          {this.state.loggedInUserId && !isLoading && !this.state.userLocation && (
            <div id="mainDiv">
              <SetLocationOnAuth updateLocationInApp={this.getLocationUpdate} />
            </div>
          )}

          {/* And finally, if the user is logged in AND has a location, we render the proper app components */}
          {this.state.loggedInUserId && this.state.userLocation && (
            <div>
              <div className={classes.root}>
                {/* This is the main navbar, displayed throughout the app */}
                {/* This navbar has the logo, the searchbar, the navbar and the settings button */}
                <div className="navBar">
                  {/* Logo */}
                  <img
                    src={logo}
                    alt="The Gig logo"
                    // width="120"
                    style={{
                      width: "130%",
                      height: "9vh",
                      marginTop: "2vh"
                    }}
                  />
                  {/* SearchBar and Navbar */}
                  <div className="searchAndNav">
                    <SearchBar className="mainSearchBar" />
                    <Route
                      path="/*"
                      render={({ match }) => (
                        <MuiThemeProvider theme={theme}>
                          <NavBar
                            tabs={[
                              ["", "Home"],
                              ["myBands", "My Bands"],
                              ["myEvents", "My Events"],
                              ["topCharts", "Top Charts"]
                            ]}
                          />
                        </MuiThemeProvider>
                      )}
                    />
                  </div>
                  <MuiThemeProvider theme={theme}>
                    {/* Settings Button */}
                    <RedirectButton
                      location={"/Settings"}
                      displayLocation={"Settings"}
                    />
                  </MuiThemeProvider>
                </div>
              </div>

              {/* This is gonna be the actual page and the secondary navbar if it does exist */}
              <div id="mainDiv">
                {/* Blurred background picture */}

                <div className="artist-nav-bar-background" />
                <div id="secondaryNavBarAndMainComponents">
                 
                  {/* Secondary navbar */}
                  <div id="bandNavBar">
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
                  </div>

                  {/* This is the switch that chooses which component is being displayed depending on the url */}
                  <div>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={props => <HomeBandNews />}
                      />
                      <Route
                        exact
                        path="/Settings"
                        render={props => (
                          <Settings loggedInUser={this.state.loggedInUserId} />
                        )}
                      />
                      <Route
                        exact
                        path="/myBands"
                        render={props => <MyBands />}
                      />
                      <Route
                        exact
                        path="/myEvents"
                        render={props => <MyEvents />}
                      />
                      <Route
                        exact
                        path="/topCharts"
                        render={props => <Billboards />}
                      />

                      <Route
                        exact
                        path="/artist/:band/info"
                        render={({ match }) => (
                          <BandInfo
                            params={match.params}
                            // firebase={this.state.loggedInUserId}
                            // bands={this.state.userBands}
                          />
                        )}
                      />

                      <Route
                        exact
                        path="/artist/:band/news"
                        render={({ match }) => (
                          <ArtistNews params={match.params} />
                        )}
                      />
                      <Route
                        exact
                        path="/artist/:band/news/:newsTitle"
                        render={({ match }) => (
                          <ArtistNewsContent params={match.params} />
                        )}
                      />
                      <Route
                        exact
                        path="/artist/:band/albums"
                        render={({ match }) => (
                          <Discography params={match.params} />
                        )}
                      />
                      <Route
                        exact
                        path="/artist/:band/albums/:albumName"
                        render={({ match }) => <Album params={match.params} />}
                      />
                      <Route
                        exact
                        path="/artist/:band/events"
                        render={({ match }) => (
                          <ArtistEvents params={match.params} />
                        )}
                      />
                      <Route
                        exact
                        path="/artist/:band/setlists"
                        render={({ match }) => (
                          <SetLists params={match.params} />
                        )}
                      />
                      <Route
                        exact
                        path="/artist/:band/song/:songTitle/lyrics"
                        render={({ match }) => (
                          <SongLyrics params={match.params} />
                        )}
                      />
                      <Route
                        exact
                        path="/artist/:band/song/:songTitle"
                        render={({ match }) => <Deezer params={match.params} />}
                      />
                      <Route path="/*" component={InvalidUrl} />
                      <Route path="/error" component={InvalidUrl} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }
}

export default withStyles(styles)(App);
