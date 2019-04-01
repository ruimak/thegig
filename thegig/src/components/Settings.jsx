import React, { Component } from "react";
import { updateUser, changePassword } from "../api";
import AutoGetLocation from "./location/AutoGetLocation";
import SetLocation from "./location/SetLocation";
import LogOut from "./authentication/LogOut";

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
        <h2>{"Radius Updater"}</h2>
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

        <br />
        <h2>{"Location Updater"}</h2>
        <SetLocation />
        <h3>{"or"}</h3>
        <AutoGetLocation />

        <br />
        <h3>{"Logout"}</h3>
        <LogOut />
      </div>
    );
  }
}
