import React, { Component } from "react";
import { getSetLists } from "../api";

export default class SetLists extends Component {
  state = {
    setLists: null
  };

  componentDidMount() {
    getSetLists(this.props.mbid).then(setLists => {
      this.setState({ setLists: setLists.data.setlist });
    });
  }
  render() {
    return (
      <div>
        {this.state.setLists !== null
          ? this.state.setLists.map(setList => {
              return <div>{setList.venue.name}</div>;
            })
          : "no events to show yet"}
      </div>
    );
  }
}
