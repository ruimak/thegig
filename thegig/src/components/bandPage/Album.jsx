import React, { Component } from "react";
import { getAlbumInfo } from "../../api";
import { Link } from "react-router-dom";

export default class Album extends Component {
  state = {
    albumInfo: null
  };
  componentDidMount() {

    // This function updates the album info in state
    getAlbumInfo(this.props.params.band, this.props.params.albumName).then(
      albumInfo => this.setState({ albumInfo: albumInfo.data.album })
    );
  }

  render() {
    if (!this.state.albumInfo) {
      return null;
    } else
      return (
        <div style={{paddingTop:'10%'}}>
          <img src={this.state.albumInfo.image[4]["#text"]} alt={`${this.state.albumInfo.name}`} />
          <div>{this.state.albumInfo.name}</div>
          <br />
          {this.state.albumInfo !== null
            ? this.state.albumInfo.tracks.track.map(track => {
                return (
                  <div>
                    <Link
                      to={`/artist/${this.props.params.band}/song/${
                        track.name
                      }`}
                    >
                      {track.name}
                      <br />
                    </Link>
                  </div>
                );
              })
            : "no events to show yet"}
        </div>
      );
  }
}
