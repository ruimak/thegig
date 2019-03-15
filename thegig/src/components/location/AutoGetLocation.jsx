import React from 'react'
import Geohash from 'latlon-geohash';


const AutoGetLocation = (props) => {

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Sua posição atual é:");
    console.log("Latitude : " + crd.latitude);
    console.log("Longitude: " + crd.longitude);
    console.log("Mais ou menos " + crd.accuracy + " metros.");
    console.log(Geohash.encode(crd.latitude, crd.longitude, 6), 'THIS IS THE GEOHASH')
  }

//   function addLocationToUser(){}

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);




    return (
        <div>
        {/* <button  onClick={()=>{this.addLocationToUser()}}></button> */}
        </div>
      )
}

export default AutoGetLocation



// THIS CODE WORKS AND GETS US THE LOCATION. WE CAN THEN CALL A FUNCTION THAT REPLACES THE LOCATION IN THE FIREBASE UPON BUTTON PRESSING