import React, { Component } from "react";
import { getSetLists,getBandInfo } from "../../api";

export default class SetLists extends Component {
  state = {
    setLists: null
  };

  componentDidMount() {
    
    const getInfo = getBandInfo(this.props.params.band).then(bandinfo => {
      getSetLists(bandinfo.data.artist.mbid).then(setLists => {
        
        this.setState({ setLists: setLists.data.setlist });
      });
    })
   
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
