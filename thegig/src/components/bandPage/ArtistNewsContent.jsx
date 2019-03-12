import React, { Component } from "react";

//this component needs an URL like http://www.mtv.com/news/3116199/taylor-swift-stalker-break-in-again/

export default class ArtistNewContent extends Component {
  state = {
  };
  componentDidMount() {
  }
  render() {
    return (
        <div>
{this.props.article && this.props.article.content}
        </div>
      )
}

}



