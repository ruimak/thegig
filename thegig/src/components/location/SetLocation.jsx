import React, { Component } from "react";
import Autocomplete from "./AutoComplete";
import Geohash from "latlon-geohash";
import { updateUser } from "../../api";
import firebase from "../../firebase.js";
import Button from "@material-ui/core/Button";

export default class SetLocation extends Component {
  state = {
    place: {}
  };

  showPlaceDetails(place) {
    this.setState({ place });
  }

  updateUsersLocation = place => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        updateUser(user.uid, {
          radius: 10,
          location: Geohash.encode(
            place.geometry.location.lat(),
            place.geometry.location.lng(),
            6
          )
        });
      }
    });
  };

  render() {
    // const AddressDetails = props => {
    //   return (
    //     <div>
    //       {props.place.geometry &&
    //         console.log(
    //           Geohash.encode(
    //             props.place.geometry.location.lat(),
    //             props.place.geometry.location.lng(),
    //             6
    //           ),
    //           "LATITUDE AND LONGITUDE"
    //         )}
    //     </div>
    //   );
    // };
    return (
      <div>
        <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
        {/* <AddressDetails place={this.state.place} /> */}
        <br/>
        <Button
          onClick={() => {
            console.log(this.props);
            this.updateUsersLocation(this.state.place);
            this.props.updateLocationInApp(this.state.place);
          }}
          variant="extendedFab"
          color="primary"
          style={{ marginTop: "4%" }}
        >
          {"Submit Location"}
        </Button>
      </div>
    );
  }
}
