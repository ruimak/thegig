import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import BandInfo from "./components/bandPage/BandInfo";
import { Route, Link, Switch } from "react-router-dom";
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

class App extends Component {
  state = {
    bandInfoInApp: null,
    userBands: [],
    loggedInUserId: null,
    newsArticle: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user, "THIS IS THE USEEEEER");
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
    return (
      <div className="App">
        {/* This is the top bar */}

        <RedirectButton
          location={"/"}
          displayLocation={"Home"}
          eraseBandInfo={this.eraseBandInfo}
        />
        <RedirectButton
          location={"/Settings"}
          displayLocation={"Settings"}
          eraseBandInfo={this.eraseBandInfo}
        />

        <h1 className="blue-text text-darken-2 center">The Gig</h1>
        {/* <Settings  loggedInUser={this.state.loggedInUserId}/> */}
        {this.state.bandInfoInApp && this.state.userBands && (
          <FollowUnfollowButton
            userId={this.state.loggedInUserId}
            band={this.state.bandInfoInApp.name}
            bandsFollowed={
              this.state.userBands !== [] ? this.state.userBands : null
            }
          />
        )}
        {/* <SongLyrics bandName={"eminem"} songTitle={"without me"} /> */}
        <SetLocation loggedInUser={this.state.loggedInUserId} />
        <AutoGetLocation />

        <SearchBar getBandInformation={this.getBandInformation} />

        <NavBar
          bandName={
            this.state.bandInfoInApp !== null
              ? this.state.bandInfoInApp.name
              : null
          }
        />

        {!this.state.loggedInUserId && <LogIn />}
        {!this.state.loggedInUserId && <SignIn />}

        <LogOut loggedInUserId={this.state.loggedInUserId} />
        {/* {this.state.loggedInUserId && (
          <div onClick={logout}>{"click here to log out"}</div>
        )} */}

        {/* <FollowedBandsNews /> */}
        {/* This is the main div */}
        {this.state.loggedInUserId && (
          <div id="mainDiv">
            <Switch>
              {/* <Route exact path="/NotFound" component={NotFound} /> */}
              {/* <Route exact path="/" component={DefaultBandNews} /> */}
              <Route exact path="/" render={props => <HomeBandNews />} />
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
                path="/:band/info"
                render={props => (
                  <BandInfo
                    bandInfo={
                      this.state.bandInfoInApp
                        ? this.state.bandInfoInApp
                        : "cher"
                    }
                  />
                )}
              />
              <Route
                exact
                path="/:band/news"
                render={props => (
                  <ArtistNews
                    bandName={
                      this.state.bandInfoInApp
                        ? this.state.bandInfoInApp.name
                        : "cher"
                    }
                    getArticle={this.getSingleArticle}
                  />
                )}
              />
              <Route
                exact
                path="/:band/news/:newsTitle"
                render={({ match }) => (
                  <ArtistNewsContent article={this.state.newsArticle} />
                )}
              />
              <Route
                exact
                path="/:band/albums"
                render={props => (
                  <Discography bandName={this.state.bandInfoInApp.name} />
                )}
              />
              <Route
                exact
                path="/:band/albums/:albumName"
                render={({ match }) => <Album params={match.params} />}
              />
              <Route
                exact
                path="/:band/events"
                render={props => (
                  <ArtistEvents
                    bandName={
                      this.state.bandInfoInApp
                        ? this.state.bandInfoInApp.name
                        : "cher"
                    }
                  />
                )}
              />
              <Route
                exact
                path="/:band/setlists"
                render={props => (
                  <SetLists
                    mbid={
                      this.state.bandInfoInApp
                        ? this.state.bandInfoInApp.mbid
                        : "bfcc6d75-a6a5-4bc6-8282-47aec8531818"
                    }
                  />
                )}
              />
              <Route
                exact
                path="/:band/song/:songTitle/lyrics"
                render={({ match }) => <SongLyrics params={match.params} />}
              />
                 <Route
                exact
                path="/:band/song/:songTitle"
                render={({ match }) => <SongInfo params={match.params} />}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
