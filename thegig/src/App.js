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
import firebase from "./firebase.js";


class App extends Component {
  state = {
    bandInfoInApp: null,
    userBands: null
  };
  componentDidMount() {
    firebase
      .database()
      .ref()
      .once("value")
      .then(userData =>
        console.log(userData.val(), "THIS IS THE FIREBASE REALTIME DATABASE")
      );
  }

  getBandInformation = band => {
    this.setState({
      bandInfoInApp: band
    });
  };
  render() {
    return (
      <div className="App">
        {/* This is the top bar */}

        <h1 className="blue-text text-darken-2 center">The Gig</h1>
        {/* This is the sign in page */}

        {/* This is the page that renders when you are signed in */}
        <SearchBar getBandInformation={this.getBandInformation} />
        {this.state.bandInfoInApp !== null ? (
          <NavBar bandName={this.state.bandInfoInApp.name} />
        ) : (
          "hello"
        )}
<SignIn/>
        {console.log(this.state)}

        {/* <FollowedBandsNews /> */}

        {/* This is the main div */}
        <div id="mainDiv">
          {this.state.bandInfoInApp
            ? console.log(this.state.bandInfoInApp.mbid, "THIS IS THE MBID")
            : console.log("NO MBID YET")}
          <Switch>
            {/* <Route exact path="/NotFound" component={NotFound} /> */}
            {/* <Route exact path="/" component={DefaultBandNews} /> */}
            <Route
              exact
              path="/:band/info"
              render={props => (
                <BandInfo
                  bandInfo={
                    this.state.bandInfoInApp ? this.state.bandInfoInApp : "cher"
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
                />
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
      </div>
    );
  }
}

export default App;
