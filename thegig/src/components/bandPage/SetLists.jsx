import React, { Component } from "react";
import { getSetLists, getBandInfo } from "../../api";
import { Link } from "react-router-dom";

export default class SetLists extends Component {
  state = {
    setLists: null,
    setListDisplayed: null
  };

  openAndCloseSetlist = setListIndex => {
    !this.state.setListDisplayed
      ? this.setState({ setListDisplayed: setListIndex })
      : this.setState({ setListDisplayed: null });
  };

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandinfo => {
      getSetLists(bandinfo.data.artist.mbid).then(setLists => {
        this.setState({ setLists: setLists.data.setlist });
      });
    });
  }
  render() {
    console.log(this.state.setLists, "Setlist");
    console.log(this.state.setListDisplayed, "set list displayed");
    if (!this.state.setLists) {
      return "There are no setlists for this artist.";
    }
    //the songs are rendered here if you click on a setlist
    else if (this.state.setListDisplayed) {
      return (
        <div>
          <div
            onClick={() => {
              this.openAndCloseSetlist(null);
            }}
          >
            {this.state.setLists[this.state.setListDisplayed].venue.name}
          </div>
          {this.state.setLists[this.state.setListDisplayed].sets.set[0] &&
            this.state.setLists[
              this.state.setListDisplayed
            ].sets.set[0].song.map(song => {
              return <Link to={`/artist/${this.props.params.band}/song/${song.name}`}>{song.name}<br/></Link>;
            })}
        </div>
      );
    }
    //this is the list of setlists, pardon the redundancy
    else
      return (
        <div>
          <div>
            {this.state.setLists.map((setList, index) => {
              return (
                <div
                  onClick={() => {
                    this.openAndCloseSetlist(index);
                  }}
                >
                  {setList.venue.name}
                </div>
              );
            })}
          </div>
        </div>
      );
  }
}
