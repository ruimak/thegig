import React, { Component } from "react";
import { getArtistNews } from "../../api";

//This component is not being used at the moment but its ready to be implemented.
//We have chosen to display the individual article in its original page but we can activate this one and render the news in here.

export default class ArtistNewContent extends Component {
  state = {
    article: {}
  };
  componentDidMount() {
    getArtistNews(this.props.params.band).then(artistNews => {
      const clickedArticle = artistNews.data.articles[0];
      this.setState({ article: clickedArticle[0] });
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.article.title}</h1>
        <img src={this.state.article.urlToImage} height="400" width="700" />
        <p>{this.state.article.content}</p>
      </div>
    );
  }
}
