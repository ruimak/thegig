import React, { Component } from "react";
import { createUser } from "../../api";
import {regexTester} from './utils'

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
    
    regexTester(this.state.fName, this.state.lName, this.state.email, this.state.password)

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name:
            <input type="text" name="fName" onChange={this.handleChange} />
          </label>
          <label>
            Last name:
            <input type="text" name="lName" onChange={this.handleChange} />
          </label>
          <label>
            email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input type="text" name="password" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
