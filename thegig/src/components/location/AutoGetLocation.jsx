import React from "react";
import Geohash from "latlon-geohash";
import { updateUser } from "../../api";
import firebase from "../../firebase.js";

const AutoGetLocation = props => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  //The success function is the one who actually updates the users location.
  function success(pos) {
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

  function addLocationToUser() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  return (
    <div>
      <button
        onClick={() => {
          addLocationToUser();
        }}
      >
        {"Set my location automatically"}
      </button>
    </div>
  );
};

export default AutoGetLocation;
