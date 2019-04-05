import React, { Component } from "react";
import { login } from "../../api";
import "../../styles/App.css";
import Button from "@material-ui/core/Button";


//This is the Login component, for users that already have an account.

export default class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    return login(this.state.email, this.state.password);
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
        <h2>Log In:</h2>
        <form onSubmit={this.handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <div>
              <p>Email:</p>
              <p>Password:</p>
            </div>
            <div>
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
                {" "}
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
          </div>

          <br />
          <Button type="submit" color='primary' variant='outlined'>Log In</Button>
          {/* <input type="submit" value="Log in" /> */}
        </form>
      </div>
    );
  }
}
