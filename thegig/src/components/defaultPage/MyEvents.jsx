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
    isLoading: true
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref()
          .once("value")
          .then(
            function(userData) {
              const location = userData.val().users[user.uid].location;
              const radius = userData.val().users[user.uid].radius;
              const myBands = Object.values(
                userData.val().users[user.uid].bands
              );

              // Having fetched your location and radius from the firebase, we can get the events for that location.
              return getEventsForLocation(location, radius).then(events => {
                this.setState({
                  eventsInfo: events.data._embedded.events,
                  bandsFollowed: myBands,
                  isLoading: false
                });
              });
            }.bind(this)
          );
      }
    });
  }
  render() {
    return (
      !this.state.isLoading && (
        <div className="mainDiv">
          <h1 className="title">{"My Events"}</h1>

          {this.state.eventsInfo !== null
            ? this.state.eventsInfo.map(event => {
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
                      <div className="divContent">{event.name}</div>
                      <br />
                      <img
                        className="divContent"
                        src={event.images[0].url}
                        height="150vh"
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
              })
            : "There are no events for this artist."}
        </div>
      )
    );
  }
}

// if there are no events its bugging out. Should be easy to fix with a condition
