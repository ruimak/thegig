import React, { Component } from "react";
import { getDiscography, getAlbumInfo } from "../../api";
import { Link } from "react-router-dom";

//I CAN ADD A FUNCTION THAT CHANGES SOMETHING IN THE STATE SO THAT IT EITHER RENDERS 5 OR ALL ALBUMS

export default class Discography extends Component {
  state = {
    discography: null
  };
  componentDidMount() {
    getDiscography(this.props.params.band).then(albums =>
      this.setState({ discography: albums.data.topalbums.album })
    );
  }
  render() {
    console.log(this.state.discography);
    return (
      <div>
        {this.state.discography !== null
          ? this.state.discography.map(album => {
              return (
                <Link to={`/artist/${this.props.params.band}/albums/${album.name}/`}>
                  <img src={album.image[0]["#text"]} />
                  {album.name}
                  <br />
                </Link>
              );
            })
          : "no events to show yet"}
      </div>
    );
  }
}
