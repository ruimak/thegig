import React from 'react'
import Geohash from 'latlon-geohash';
import {updateUser} from '../../api'
import firebase from "../../firebase.js";

const AutoGetLocation = (props) => {

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    const crd = pos.coords;
    const geohash= Geohash.encode(crd.latitude, crd.longitude, 6)
let loggedInUser = ''
    console.log("Sua posição atual é:");
    console.log("Latitude : " + crd.latitude);
    console.log("Longitude: " + crd.longitude);
    console.log("Mais ou menos " + crd.accuracy + " metros.");
    console.log(Geohash.encode(crd.latitude, crd.longitude, 6), 'THIS IS THE GEOHASH')

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loggedInUser=user.uid
      
        updateUser(loggedInUser, {
      location: geohash
    })
        }
        })


    
  }

  function addLocationToUser(){
    const newLocation = ''
    console.log(navigator.geolocation.getCurrentPosition(success, error, options), 'RETURNNNNNNNNNNNNNNNNNN')
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);




    return (
        <div>
        <button  onClick={()=>{addLocationToUser()}}>{'Set my location automatically'}</button>
        </div>
      )
}

export default AutoGetLocation



// THIS CODE WORKS AND GETS US THE LOCATION. WE CAN THEN CALL A FUNCTION THAT REPLACES THE LOCATION IN THE FIREBASE UPON BUTTON PRESSING