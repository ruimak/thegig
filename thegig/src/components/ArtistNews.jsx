import React, { Component } from "react";
import { getArtistNews } from "../api";

export default class ArtistNews extends Component {
  state = {
    news: null
  };
  componentDidMount() {
    getArtistNews(this.props.bandName).then(news => {
      this.setState({ news: news.data.articles });
      console.log(news.data.articles, "??");
    });
  }
  render() {
    return (
      <div>
        {this.state.news !== null
          ? this.state.news.map(newStory => {
              return <div>{newStory.title}</div>;
            })
          : "no events to show yet"}
      </div>
    );
  }
}
