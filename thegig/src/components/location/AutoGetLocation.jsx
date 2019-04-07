import React, { Component } from "react";
import Geohash from "latlon-geohash";
import { updateUser } from "../../api";
import firebase from "../../firebase.js";
import Fab from "@material-ui/core/Fab";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default class AutoGetLocation extends Component {
  state = {};

  //The success function is the one who actually updates the users location.
  success(pos) {
    const crd = pos.coords;
    const geohash = Geohash.encode(crd.latitude, crd.longitude, 6);
    let loggedInUser = "";

    //This function gets you the logged in ID, the user whose location will be updated.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loggedInUser = user.uid;

        updateUser(loggedInUser, {
          location: geohash
        });
      }
    });
  }

  addLocationToUser() {
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  render() {
    return (
      <div>
        <Fab
          onClick={() => {
            this.addLocationToUser();
          }}
          variant="extended"
          color="primary"
          style={{ backgroundColor: "#738DD9", marginTop: "4%" }}
        >
          {"Set my location automatically"}
        </Fab>
      </div>
    );
  }
}
