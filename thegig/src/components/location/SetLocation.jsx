/* global google */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Autocomplete from "./AutoComplete";

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
            {props.place.geometry && console.log(props.place.geometry.location.lat(), props.place.geometry.location.lng(), 'LATITUDE AND LONGITUDE')}
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

