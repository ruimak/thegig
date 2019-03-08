// const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//   };

//   function success(pos) {
//     const crd = pos.coords;

//     console.log("Sua posição atual é:");
//     console.log("Latitude : " + crd.latitude);
//     console.log("Longitude: " + crd.longitude);
//     console.log("Mais ou menos " + crd.accuracy + " metros.");
//   }

//   function error(err) {
//     console.warn("ERROR(" + err.code + "): " + err.message);
//   }

//   navigator.geolocation.getCurrentPosition(success, error, options);
//   console.log("FUCK");


// THIS CODE WORKS AND GETS US THE LOCATION. WE CAN THEN CALL A FUNCTION THAT REPLACES THE LOCATION IN THE FIREBASE UPON BUTTON PRESSING