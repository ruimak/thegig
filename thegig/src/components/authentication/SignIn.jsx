import React, { Component } from "react";
import { createUser } from "../../api";
import { regexTester } from "./utils";
import "../../styles/App.css";
import Button from "@material-ui/core/Button";


export default class SignIn extends Component {
  state = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    avatar: ""
  };

  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    regexTester(
      this.state.fName,
      this.state.lName,
      this.state.email,
      this.state.password
    );

    return createUser(
      this.state.fName,
      this.state.lName,
      this.state.email,
      this.state.password
    ).then(data => {
      if (data) {
        alert("Account created!");
      }
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div
        className="stand-out-container centered-container"
        style={{ paddingBottom: "2%", width: "30%" }}
      >
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <div>
              <p>First Name:</p>
              <p>Last Name:</p>
              <p>Email:</p>
              <p>Password:</p>
            </div>
            <div>
              <p>
                {" "}
                <label>
                  <input
                    type="text"
                    name="fName"
                    onChange={this.handleChange}
                    style={{maxWidth:'90%'}}
                  />
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="text"
                    name="lName"
                    onChange={this.handleChange}
                    style={{maxWidth:'90%'}}
                  />
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="text"
                    name="email"
                    onChange={this.handleChange}
                    style={{maxWidth:'90%'}}
                  />
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    style={{maxWidth:'90%'}}
                  />
                </label>
              </p>
            </div>
            <br />
          </div>{" "}
          <Button type="submit" color='primary' variant='outlined'>Register</Button>
        </form>
      </div>
    );
  }
}
