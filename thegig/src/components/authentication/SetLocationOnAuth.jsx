import React, { Component } from "react";
import SetLocation from "../location/SetLocation";

//If you have just registered, you will have to input your location and thats what this component is for.
//It will only be rendered once.

export default class Settings extends Component {
  state = {
    radius: ""
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
        <SetLocation updateLocationInApp={this.props.updateLocationInApp} />
      </div>
    );
  }
}
