import React, { Component } from "react";
import { updateUser, changePassword, reauthenticate } from "../api";
import { get } from "http";
import Spotify from "spotify-web-api-js";
import AutoGetLocation from "./location/AutoGetLocation";
import SetLocation from './location/SetLocation'
const spotifyWebApi = new Spotify();

export default class Settings extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      currentPassword: "",
      newPassword: "",
      radius: "",
      newLocation: "",
      newAvatar: ""
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  handleChange(e) {
    const target = e.target.value;
    this.setState({ [e.target.name]: target });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.props.spotifylogin(this.state.loggedIn);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="password"
            name="currentPassword"
            placeholder="current password"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="newPassword"
            placeholder="new password"
          />
          <button
            onClick={() =>
              changePassword(this.state.currentPassword, this.state.newPassword)
            }
          >
            reset password
          </button>
        </form>

        {/* {listOfForms.map((element,index) => {
           return forms(listOfForms[index][0],listOfForms[index][1],listOfForms[index][2])
        }) } */}
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="newAvatar"
            placeholder="Insert new avatar..."
          />
          <button
            onClick={() =>
              updateUser(this.props.loggedInUser, {
                avatar: this.state.newAvatar
              })
            }
          >
            Change Avatar
          </button>
        </form>

        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="radius"
            placeholder="Insert new radius..."
          />{" "}
          <button
            onClick={() =>
              updateUser(this.props.loggedInUser, { radius: this.state.radius })
            }
          >
            Change radius
          </button>
        </form>

        {/* <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="newLocation"
            placeholder="Insert new location..."
          />
          <button
            onClick={() =>
              updateUser(this.props.loggedInUser, {
                location: this.state.newLocation
              })
            }
          >
            Change Location
          </button>
        </form> */}
        <SetLocation />
        <AutoGetLocation />

        <a href={`http://localhost:8888`}>
          <button>login with spotify</button>
        </a>
      </div>
    );
  }
}
