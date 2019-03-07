import React, { Component } from "react";
import { addBandToFollowedList, removeBandFromFollowedList } from "../api.js";

export default class SignIn extends Component {
  state = {
    bands: this.props.bandsFollowed
  };

  addOrRemoveBand = (command, id, band) => {
    if (command === "follow") {
      const newArray = this.state.bands
      this.state.bands.push(band);
      console.log("newArray:", newArray);
      this.setState({ bands: newArray });
      addBandToFollowedList(id, band);
    } else {
      const index = this.state.bands.indexOf(band);
      if (index > -1) {
        const newArray = this.state.bands
        newArray.splice(index, 1);
        this.setState({bands: newArray })
      }
      removeBandFromFollowedList(id, band);
    }
  };

  componentDidMount() {
    console.log(this.state.bands, "followed bands in button state");
    // console.log(
    //   this.state.bands.includes(this.props.bandsFollowed),
    //   "am i following this band ???"
    // );
  }

  render() {
    console.log(this.state.bands, "baaands");
      console.log(this.state.bands.includes(this.props.band))
        //   return <div>{'hello'
        //   }</div>
    if (!this.state.bands.includes(this.props.band)) {
      return (
        <button
          onClick={()=>{this.addOrRemoveBand(
            "follow",
            this.props.userId,
            this.props.band
          )}}
        >
          {"follow"}
        </button>
      );
    } else {
      return (
        <button
          onClick={()=>{this.addOrRemoveBand(
            "unfollow",
            this.props.userId,
            this.props.band
          )}}
        >
          {"unfollow"}
        </button>
      );
    }
  }
}
