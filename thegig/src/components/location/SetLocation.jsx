/* global google */
import React, { Component } from 'react';
import Autocomplete from "./AutoComplete";
import Geohash from 'latlon-geohash';

export default class SetLocation extends Component {
  state = {
    place: {}
  };


  showPlaceDetails(place) {
    this.setState({ place });
  }

  render() {

  const AddressDetails = props => {
    return (
        <div>
            {props.place.geometry && console.log(Geohash.encode(props.place.geometry.location.lat(), props.place.geometry.location.lng(), 6), 'LATITUDE AND LONGITUDE')}
        </div>
    )
  };

    return (
      <div>
        <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
        <AddressDetails place={this.state.place} />
      </div>
    );
  }
}

