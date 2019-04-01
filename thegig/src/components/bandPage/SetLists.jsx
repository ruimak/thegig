import React, { Component } from "react";
import { getSetLists, getBandInfo } from "../../api";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "../../styles/defaultPage.css";

const styles = {};

class SetLists extends Component {
  state = {
    setLists: null,
    isLoading: true,
    songs: null,
    eventName: null
  };

  backTosetLists = back => {
    this.setState({ songs: back });
  };

  handleClick(e, setlist) {
    const setlists = setlist.map(songs => {
      return songs.song.map(playlist => {
        return playlist;
      });
    });
    this.setState({ songs: setlists, eventName: e.target.id });
  }

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandinfo => {
      getSetLists(bandinfo.data.artist.mbid).then(setLists => {
        this.setState({ setLists: setLists.data.setlist, isLoading: false });
      });
    });
  }

  render() {
    let setlistRenderer = !this.state.setLists ? (
      <div>{"There are no setlists for this artist"}</div>
    ) : (
      this.state.setLists.map(setlist => {
        return setlist.sets.set.length === 0 ? null : (
          <div
            onClick={e => this.handleClick(e, setlist.sets.set)}
            id={setlist.venue.name}
          >
            {setlist.venue.name}
          </div>
        );
      })
    );
    return (
      !this.state.isLoading && (
        <div className="mainDiv">
          <div className="title">{"Setlists"}</div>
          {/* This is the clickable event name */}
          <div onClick={() => this.backTosetLists(null)}>
            {this.state.songs !== null ? this.state.eventName : null}
          </div>
          {this.state.songs === null
            ? setlistRenderer
            : this.state.songs.map(song => {
                return song.map(songs => {
                  return (
                    <Link
                      to={`/artist/${this.props.params.band}/song/${
                        songs.name
                      }`}
                    >
                      {songs.name}
                      <br />
                    </Link>
                  );
                });
              })}
        </div>
      )
    );
  }
}
export default withStyles(styles)(SetLists);
