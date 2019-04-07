import React, { Component } from "react";
import { updateUser, changePassword } from "../api";
import AutoGetLocation from "./location/AutoGetLocation";
import SetLocation from "./location/SetLocation";
import LogOut from "./authentication/LogOut";
import firebase from "../firebase.js";
import Fab from "@material-ui/core/Fab";
import "../styles/App.css";

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
        <h1 className='title'>{"Settings"}</h1>
        <div
          className="stand-out-container"
          style={{ width: "55%", paddingBottom: "2%" }}
        >
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
              style={{marginLeft:'1%'}}
            /><br/>
            <Fab
              onClick={() =>
                changePassword(
                  this.state.currentPassword,
                  this.state.newPassword
                )
              }
              variant="extended"
              color="primary"
              style={{backgroundColor:'#738DD9', marginTop: "4%" }}
            
            >
              Reset password
            </Fab>
          </form>
        </div>
        <div
          className="stand-out-container"
          style={{ width: "55%", paddingBottom: "2%" }}
        >
          <h2>{"Avatar Updater"}</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              name="newAvatar"
              placeholder="Insert new avatar..."
            />
            <br />
            <Fab
              onClick={() =>
                updateUser(this.props.loggedInUser, {
                  avatar: this.state.newAvatar
                })
              }
              variant="extended"
              color="primary"
              style={{backgroundColor:'#738DD9', marginTop: "4%" }}
            >
              Change Avatar
            </Fab>
          </form>
        </div>

        <div
          className="stand-out-container"
          style={{ width: "55%", paddingBottom: "2%" }}
        >
          <h2 style={{ marginBottom: "0px" }}>{"Radius Updater"}</h2>
          <h3 style={{ marginTop: "0px" }}>(in miles)</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              name="radius"
              placeholder="Insert new radius..."
            />
            <br />
            <Fab
              onClick={() => {
                if (Number.isInteger(Number(this.state.radius))) {
                  return updateUser(this.props.loggedInUser, {
                    radius: this.state.radius
                  });
                } else {
                  return alert("Radius needs to be an integer");
                }
              }}
              variant="extended"
              color="primary"
              style={{backgroundColor:'#738DD9', marginTop: "4%" }}
            >
              Change Radius
            </Fab>
          </form>
        </div>

        <div
          className="stand-out-container"
          style={{ width: "55%", paddingBottom: "2%" }}
        >
          <h2>{"Location Updater"}</h2>
          <SetLocation />
          <h3>{"or"}</h3>
          <AutoGetLocation />
        </div>

        <div
          className="stand-out-container"
          style={{ width: "55%", paddingBottom: "2%" }}
        >
          <h2>{"Facebook"}</h2>
          <Fab
            onClick={() => {
              var provider = new firebase.auth.FacebookAuthProvider();

              firebase
                .auth()
                .currentUser.linkWithPopup(provider)
                // .then(function(result) {
                //   // Accounts successfully linked.
                //   var credential = result.credential;
                //   var user = result.user;
                //   console.log(credential, user)
                // })
                .catch(err => alert(err));
            }}
            variant="extended"
            color="primary"
            style={{backgroundColor:'#738DD9', marginTop: "4%" }}
          >
            {"Sync with Facebook"}
          </Fab>
        </div>
        <div
          className="stand-out-container"
          style={{ width: "55%", paddingBottom: "2%" }}
        >
          <h2>{"Logout"}</h2>
          <LogOut />
        </div>
      </div>
    );
  }
}
