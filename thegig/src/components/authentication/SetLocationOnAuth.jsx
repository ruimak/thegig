import React, { Component } from "react";
import { updateUser } from "../../api";

import AutoGetLocation from "../location/AutoGetLocation";
import SetLocation from '../location/SetLocation'


export default class Settings extends Component {
  
    state = {
      radius: "",
    };
   
  

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

//   getHashParams() {
//     var hashParams = {};
//     var e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     while ((e = r.exec(q))) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }

  
  handleChange(e) {
    const target = e.target.value;
    this.setState({ [e.target.name]: target });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      

        {/* <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="radius"
            placeholder="Insert new radius..."
          />
          <button
            onClick={() =>
              updateUser(this.props.loggedInUser, { radius: this.state.radius })
            }
          >
            Radius of interest for concerts and events!
          </button>
        </form>

    */}
        <SetLocation updateLocationInApp={this.props.updateLocationInApp}/>
        {/* <AutoGetLocation /> */}


      </div>
    );
  }
}
