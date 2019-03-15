import React, { Component } from "react";
import { getArtistNews } from "../../api";
import { Link } from "react-router-dom";

export default class ArtistNews extends Component {
  state = {
    news: null
  };
  componentDidMount() {
    getArtistNews(this.props.params.band).then(news => {
      this.setState({ news: news.data.articles });
    });
  }
  render() {
    return (
      <div>
        {this.state.news !== null
          ? this.state.news.map(newStory => {
            console.log(newStory,'this is the news story')
            let newsStorypicture = newStory.urlToImage !== null ? 
            <img src={newStory.urlToImage} height='150' width='250'></img> 
            : null
              return (
                
                <div>
                  {newsStorypicture}
                  <Link
                    to={{
                      pathname: `/artist/${this.props.params.band}/news/${newStory.title}`,
                      state: { newStory: newStory }
                    }}
                    onClick={() => {
                      this.props.getArticle(newStory);
                    }}
                  >{newStory.title}</Link>
                    
                
                  <h1>{newStory.title}</h1>
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
