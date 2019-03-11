import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import BandInfo from "./components/BandInfo";
import { Route, Link, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArtistEvents from "./components/ArtistEvents";
import SetLists from "./components/SetLists";
import ArtistNews from "./components/ArtistNews";
import FollowedBandsNews from "./components/FollowedBandsNews";
import SignIn from "./components/SignIn";
import LogIn from "./components/LogIn";
import firebase from "./firebase.js";
import FollowUnfollowButton from "./components/FollowUnfollowButton";
import MyBands from "./components/Mybands";
import { logout } from "./api";
import SetLocation from "./components/location/SetLocation";
import AutoGetLocation from "./components/location/AutoGetLocation";
import {userBandsList} from "./api"
import HomeBandNews from './components/HomeBandNews'
import Billboards from './components/Billboards'
import Settings from './components/Settings'
import Spotifys from './components/Spotify'
import SongLyrics from './components/SongLyrics'
import ArtistNewsContent from "./components/ArtistNewsContent"



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
  getSingleArticle = article => {
    console.log(article, 'THIS IS THE ARTICLE AHGPAWHGWAs')
    this.setState({
      newsArticle: article
    });
    // this.props.history.push(`/${this.state.input}/news/hello`);
  };

  render() {
    return (
      <div className="App">
        {/* This is the top bar */}

        
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
        <SetLocation />
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

        {this.state.loggedInUserId && (
          <div onClick={logout}>{"click here to log out"}</div>
        )}

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
                path="/myBands"
                render={props => <MyBands myBands={this.state.userBands} />}
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
                    getArticle={
                      this.getSingleArticle
                    }
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
              {/* <Route exact path="/*" component={NotFound} /> */}
            </Switch>
          </div>
        )}
      </div>
      
    );
  }
}

export default App;
