import React, { Component } from "react";
import { getEventsForLocation } from "../../api";
import firebase from "../../firebase.js";

//YOU NEED TO CHANGE THE SIZE PARAMETER IN THE API F IN ORDER TO GET MORE EVENTS
export default class ArtistEvents extends Component {
  state = {
    eventsInfo: null,
    bandsFollowed:[]
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
              const location = userData.val().users[user.uid]
                .location;
              const radius = userData.val().users[user.uid]
                .radius;
                const myBands = Object.values(userData.val().users[user.uid]
                .bands)
              return getEventsForLocation(location, radius).then(events => {
                this.setState({ eventsInfo: events.data._embedded.events, bandsFollowed: myBands });
                console.log(events.data._embedded.events, "EVENTSSSSSS");
              });
            }.bind(this)
          );
      }
    });
  }
  render() {
    return (
      <div>
        {// this.state.eventsInfo!== null && console.log(this.state.eventsInfo[0]._embedded.attractions[0].name, 'ATRACTIONS')
        this.state.eventsInfo !== null
          ? this.state.eventsInfo.map(event => {
if(event._embedded.attractions &&   this.state.bandsFollowed.includes(
      event._embedded.attractions[0].name
    )){ return <div>{event._embedded.attractions[0].name}</div>}
             
            })
          : "no events to show yet"}
      </div>
    );
  }
}

// if there are no events its bugging out. Should be easy to fix with a condition
