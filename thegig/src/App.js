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
import FollowUnfollowButton from './components/FollowUnfollowButton'
import MyBands from './components/Mybands'
import { logout } from "./api";
import {userBandsList} from "./api"
import HomeBandNews from './components/HomeBandNews'

class App extends Component {
  state = {
    bandInfoInApp: null,
    userBands: [],
    loggedInUserId: null
  };

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => user ? this.setState({ loggedInUserId: user.uid}): this.setState({ loggedInUserId: null}))
      firebase .database().ref()
      .once("value")
      .then(userData =>
        {
          
          // console.log( userData.val().users[this.state.loggedInUserId].bands,'THIS IS THE USERS VAL')
        return this.state.loggedInUserId ? this.setState({userBands:userData.val().users[this.state.loggedInUserId].bands}) : this.setState({userBands:[]})
        })
     
   
  }

  // getLoggedInUser = user => {
  //   this.setState({ loggedInUserId: user });
  // };

  getBandInformation = band => {
    this.setState({
      bandInfoInApp: band
    });
  };
  render() {
    console.log(this.state.userBands,'USERBANDS IN THE STATE')
    console.log(this.state.bandInfoInApp,'band info in app')
    
    return (
      <div className="App">
        {/* This is the top bar */}
<HomeBandNews />
        <h1 className="blue-text text-darken-2 center">The Gig</h1>
 {/* {this.state.bandInfoInApp && <FollowUnfollowButton command={userBands.includes(this.state.bandInfoInApp) ? "unfollow" : "follow"}/>} */}
        <SearchBar getBandInformation={this.getBandInformation} />
        {this.state.bandInfoInApp !== null ? (
          <NavBar bandName={this.state.bandInfoInApp.name} />
        ) : (
          "hello"
        )}
        {!this.state.loggedInUserId && <LogIn />}
        {!this.state.loggedInUserId && <SignIn />}
        {this.state.loggedInUserId && <div onClick={logout}>{'click here to log out'}</div>}
        {console.log(this.state)}

<MyBands myBands={this.state.userBands}/>

        {/* <FollowedBandsNews /> */}
        {/* This is the main div */}
        {this.state.loggedInUserId && (
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
        )}
      </div>
    );
  }
}

export default App;
