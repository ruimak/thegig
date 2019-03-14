import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import BandInfo from "./components/bandPage/BandInfo";
import { Route, Link, Switch,withRouter } from "react-router-dom";
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
    newsArticle: null,
    spotifyLoggedIn:''
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
    console.log(loggedInState,'this is the logged in state')
    this.setState({spotifyLoggedIn:loggedInState})
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
    console.log(this.state.spotifyLoggedIn,'this is spotify login')
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

        {/* we have to delete the materialize in the next line */}
        <h1 className="blue-text text-darken-2 center">The Gig</h1>
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

        <SearchBar getBandInformation={this.getBandInformation} />

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
                  <Settings loggedInUser={this.state.loggedInUserId} spotifylogin={this.userIsLoggedIn} />
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
                render={({ match }) => (
                  <BandInfo
                    params={match.params}
                  />
                )}
              />
              <Route
                exact
                path="/artist/:band/news"
                render={({match}) => (
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
                  <ArtistNewsContent article={this.state.newsArticle} />
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
                render={({ match }) => (
                  <ArtistEvents
                    params={match.params}
                  />
                )}
              />
              <Route
                exact
                path="/artist/:band/setlists"
                render={({ match }) => (
                  <SetLists
                  params={match.params}
                    
                  />
                )}
              />
              <Route
                exact
                path="/artist/:band/song/:songTitle/lyrics"
                render={({ match }) => <SongLyrics params={match.params} />}
              />
              <Route
                exact
                path="/artist/:band/song/:songTitle"
                render={({ match }) => <Spotifys params={match.params} loginState={this.state.spotifylogin} />}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
