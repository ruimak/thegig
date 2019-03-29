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
// import Spotifys from "./components/Spotify";
import Deezer from "./components/songsPage/Deezer";
import SongLyrics from "./components/songsPage/SongLyrics";
import MyEvents from "./components/defaultPage/MyEvents";
import ArtistNewsContent from "./components/bandPage/ArtistNewsContent";
import Discography from "./components/bandPage/Discography";
import Album from "./components/bandPage/Album";
import RedirectButton from "./components/utilities/RedirectButton";
import SongInfo from "./components/songsPage/SongInfo";
import SetLocationOnAuth from "./components/authentication/SetLocationOnAuth";
import Loading from "./components/authentication/Loading";
// const { database } = firebase;

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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { purple, white } from "@material-ui/core/colors";

// import MenuIcon from '@material-ui/icons/Menu';
const { database } = firebase;

//THIS IS THE THEME THAT IS BEING PASSED TO COMPONENTS, TO CHANGE ITS COLOR.
//WE CAN ADD EXTRA COLORS AND CHANGE THE PROPS IN IT TO PRIMARY, SECONDARY AND SO ON
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
  // padding: '300px'
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
      if (user) {
        this.setState({ loggedInUserId: user.uid });

        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              const location = userData.val().users[this.state.loggedInUserId]
                .location;
              this.setState({ userLocation: location, isLoading: false });
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
        <div>
          {/* These next two are the login and registration components, rendered if the user isnt logged in to firebase */}
          {!this.state.loggedInUserId && (
            <div id="mainDiv">
              {/* <div className="artist-nav-bar-background" /> */}
              <LogIn />
              <SignIn />
            </div>
          )}

          {/* In the case the user IS logged in but doesnt have a location yet, this next component is rendered */}
          {this.state.loggedInUserId && !this.state.userLocation && (
            <div id="mainDiv">
              <div className="artist-nav-bar-background" />
              <SetLocationOnAuth updateLocationInApp={this.getLocationUpdate} />
            </div>
          )}

          {/* And finally, if the user is logged in AND has a location, we render the proper app components */}
          {this.state.loggedInUserId && this.state.userLocation && (
            <div>
              <div className={classes.root}>
                {/* this is the main navbar, displayed throughout the app */}
                {/* This navbar has the logo, the searchbar, the main navbar and the settings button */}
                <div className="navBar">
                  <img
                    src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/20604412_281592685577903_8591182496679565167_n.png?_nc_cat=107&_nc_ht=scontent-lhr3-1.xx&oh=7abfaffd608ac2791c39ad49f222db97&oe=5D19502A"
                    height="80"
                    width="80"
                    style={{
                      height: "80",
                      width: "80",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "2vh"
                    }}
                  />
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
                    <RedirectButton
                      location={"/Settings"}
                      displayLocation={"Settings"}
                    />
                  </MuiThemeProvider>
                </div>
              </div>

              <div id="mainDiv">
                <div className="artist-nav-bar-background" />
                <div id="secondaryNavBarAndMainComponents">
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
                  <div>
                    <Switch>
                      {/* <Route exact path="/NotFound" component={NotFound} /> */}
                      {/* <Route exact path="/" component={DefaultBandNews} /> */}
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
                    render={({ match }) => <BandInfo params={match.params} 
                    // firebase={this.state.loggedInUserId} 
                    // bands={this.state.userBands} 
                    />}
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
                      
                    </Switch>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
        
        
      );
    </div>
  
      )}
}


export default withStyles(styles)(App);
