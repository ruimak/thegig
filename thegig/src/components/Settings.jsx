import React, { Component } from "react";
import { updateUser, changePassword } from "../api";
import AutoGetLocation from "./location/AutoGetLocation";
import SetLocation from "./location/SetLocation";
import LogOut from "./authentication/LogOut";
import firebase from "../firebase.js";

export default class Settings extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    radius: "",
    newLocation: "",
    newAvatar: ""
  };

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(e) {
    const target = e.target.value;
    this.setState({ [e.target.name]: target });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>{"Settings"}</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>{"Password Updater"}</h2>
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
            Reset password
          </button>
        </form>

        <h2>{"Avatar Updater"}</h2>
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
        <br />
        <h2 style={{ marginBottom: "0px" }}>{"Radius Updater"}</h2>
        <h3 style={{ marginTop: "0px" }}>(in miles)</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="radius"
            placeholder="Insert new radius..."
          />
          <button
            onClick={() => {
              if (Number.isInteger(this.state.radius)) {
                return updateUser(this.props.loggedInUser, {
                  radius: this.state.radius
                });
              } else {
                return alert("Radius needs to be an integer");
              }
            }}
          >
            Change radius
          </button>
        </form>

        <br />
        <h2>{"Location Updater"}</h2>
        <SetLocation />
        <h3>{"or"}</h3>
        <AutoGetLocation />

        <br />

        <button
          onClick={() => {
            var provider = new firebase.auth.FacebookAuthProvider();

            firebase
              .auth()
              .currentUser.linkWithPopup(provider)
              .then(function(result) {
                // Accounts successfully linked.
                var credential = result.credential;
                var user = result.user;
                // ...
              })
              .catch(function(error) {
                // Handle Errors here.
                // ...
              });
          }}
        >
          {"Sync with Facebook"}
        </button>
        <br />
        <h3>{"Logout"}</h3>
        <LogOut />
      </div>
    );
  }
}
