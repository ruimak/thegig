import React, { Component } from "react";
import { getBandInfo } from "../../api";
import RelatedArtists from "./RelatedArtists";

export default class BandInfo extends Component {
  state = {
    bio: null
  };

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandInfo => {
      this.setState({ bio: bandInfo.data.artist });
    });
  }
  render() {
    console.log(this.state.bio, "this is the bio");
if(!this.state.bio) {return null}
else return <div>
    <p>{this.state.bio.name}</p>
<img src={this.state.bio.image[4]["#text"]}/>
<div>{this.state.bio.bio.content}</div>
<RelatedArtists artists={Object.values(this.state.bio.similar.artist)}/>
</div> ;
  }
}
