import React, { Component } from "react";
import { getEventsForLocation } from "../../api";
import firebase from "../../firebase.js";
import "../../styles/defaultPage.css";
import "../../styles/App.css";

//Change the api function size in order to get more/less events, adding accuracy but sacrificing speed
export default class ArtistEvents extends Component {
  state = {
    eventsInfo: null,
    bandsFollowed: [],
    isLoading: "initial"
  };
  componentDidMount() {
    this.setState({ isLoading: true });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              if (userData.val().users[user.uid].bands) {
                const location = userData.val().users[user.uid].location;
                const radius = userData.val().users[user.uid].radius;
                const myBands = Object.values(
                  userData.val().users[user.uid].bands
                );

                // Having fetched your location and radius from the firebase, we can get the events for that location.
                return getEventsForLocation(location, radius).then(events => {
                  console.log(events, 'events')
                  this.setState({
                    eventsInfo: events.data._embedded.events,
                    bandsFollowed: myBands,
                    isLoading: false
                  });
                });
              } else {
                this.setState({ isLoading: false });
                return null;
              }
            }.bind(this)
          );
      }
    });
  }
  render() {
    if(this.state.isLoading=== false ){return this.state.bandsFollowed.length === 0 ? (
      <div>
        <h1 className="title">{"My Events"}</h1>
        <div
          className="centered-container stand-out-container"
          style={{ width: "25%", padding: "10%" }}
        >
          <h2>No bands ?</h2>
          You have no bands, therefore no events as well. You should start following some if you dont want to miss any concerts! :)
        </div>
      </div>
    ) : (
      <div className="mainDiv">
        <h1 className="title">{"My Events"}</h1>

        {this.state.eventsInfo !== null ? (
          this.state.eventsInfo.map(event => {
            if (
              event._embedded.attractions &&
              this.state.bandsFollowed.includes(
                event._embedded.attractions[0].name
              )
            ) {
              return (
                <div
                  className="individualEventDiv stand-out-container"
                  onClick={() => {
                    window.open(`${event.url}`, "mywindow").focus();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <br />
                  <div className="divContent" style={{fontSize:'1.5vw', fontWeight:'bold'}}>{event.name}</div>
                  <br />
                  <img
                    className="divContent"
                    src={event.images[0].url}
                    height="150vh"
                    alt={event.name}
                  />
                  <div className="divContent">
                    {"Locale: " +
                      event._embedded.venues[0].country.name +
                      ", " +
                      event._embedded.venues[0].city.name}
                  </div>
                  <div className="divContent">
                    {"Venue: " + event._embedded.venues[0].name}
                  </div>
                  <div className="divContent">
                    {"Date: " + event.dates.start.localDate}
                  </div>
                  <div className="divContent">
                    {event.priceRanges === undefined
                      ? "Price Range: Unknown"
                      : `Price Range: ${event.priceRanges[0].min} - ${
                          event.priceRanges[0].max
                        } ${event.priceRanges[0].currency}`}
                  </div>
                  <br />
                </div>
              );
            }
            return null;
          })
        ) : (
          <div
            className="centered-container stand-out-container"
            style={{ width: "25%", padding: "10%" }}
          >
            <h2>No Events?</h2>
            There are no events for the bands you're following in your area. Try
            adding more bands or broadening the radius in the settings.
          </div>
        )}
      </div>
    );
  } else return null} 
}

// if there are no events its bugging out. Should be easy to fix with a condition
