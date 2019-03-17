import React, { Component } from "react";
import { getArtistNews } from "../../api";
import { Link } from "react-router-dom";

export default class ArtistNews extends Component {
  state = {
    news: null,
    band: ""
  };
  componentDidMount() {
    getArtistNews(this.props.params.band).then(news => {
      this.setState({ news: news.data.articles });
    });
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, "NEXTPROPS ");
  //   console.log(prevState, "PREVSTATE");
  //   console.log(
  //     nextProps.params.band !== prevState.band,
  //     "COMPARISON !!!!!!!!!!!!!!!!!!!!!"
  //   );

  //   let band = nextProps.params.band;
  //   let newsToGoInState = [];

  //   nextProps.params.band !== prevState.band && getArtistNews(nextProps.params.band).then(news => {
  //       console.log(
  //         "FUCK YOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
  //       );
  //       // this.setState({ news: news.data.articles, band:band });
  //       // console.log('the state has been updated!!')

  //       newsToGoInState = news.data.articles;
  //       console.log(
  //         newsToGoInState,
  //         "NEWSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
  //       );
  //        console.log(
  //       newsToGoInState,
  //       "news right before being updated!!!!!!!!!!!!!!!"
  //     );

  //       return { news: newsToGoInState, band: band };
  //     });
  //    return null

  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.params.band !== prevProps.params.band) {
      let band = this.props.params.band;
      let newsToGoInState = [];

        getArtistNews(this.props.params.band).then(news => {
          newsToGoInState = news.data.articles;

         this.setState({ news: newsToGoInState, band: band }) 
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.news !== null
          ? this.state.news.map(newStory => {
              // console.log(newStory,'this is the news story')
              let newsStorypicture =
                newStory.urlToImage !== null ? (
                  <img src={newStory.urlToImage} height="150" width="250" />
                ) : null;
              return (
                <div>
                  {newsStorypicture}
                  <Link
                    to={{
                      pathname: `/artist/${this.props.params.band}/news/${
                        newStory.title
                      }`,
                      state: { newStory: newStory }
                    }}
                    onClick={() => {
                      this.props.getArticle(newStory);
                    }}
                  >
                    {newStory.title}
                  </Link>

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
