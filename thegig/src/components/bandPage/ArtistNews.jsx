import React, { Component } from "react";
import { getArtistNews } from "../../api";
import { Link } from "react-router-dom";

export default class ArtistNews extends Component {
  state = {
    news: null
  };
  componentDidMount() {
    console.log('FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK')
    getArtistNews(this.props.params.band).then(news => {
      this.setState({ news: news.data.articles });
    });
  }
  render() {
    return (
      <div>
        {this.state.news !== null
          ? this.state.news.map(newStory => {
              return (
                <div>
                  <div>{newStory.urlToImage}</div>
                  <Link
                    to={{
                      pathname: `/:band/news/${newStory.title}`,
                      state: { newStory: newStory }
                    }}
                    onClick={() => {
                      this.props.getArticle(newStory);
                    }}
                  >{newStory.title}</Link>
                    
                
                  <div>{newStory.title}</div>
                  <div>{"Source: " + newStory.source.name}</div>
                  <div>{newStory.description}</div>
                </div>
              );
            })
          : "There are no news for this band, sorry! :("}
      </div>
    );
  }
}
