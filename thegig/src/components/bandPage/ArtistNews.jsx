import React, { Component } from "react";
import { getArtistNews } from "../../api";
import { Link } from "react-router-dom";
import {
  Tabs,
  Avatar,
  Typography,
  Grid,
  Slide,
  GridList
} from "@material-ui/core";
import Carousel from "nuka-carousel";
import { withStyles } from "@material-ui/core/styles";
const { red, blue, green } = require("@material-ui/core/colors");

class ArtistNews extends Component {
  state = {
    news: [],
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

        this.setState({ news: newsToGoInState, band: band });
      });
    }
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  
  }

  render() {
    let arrayToDisplayInCarousel = [];
    let otherNews = [];

    arrayToDisplayInCarousel = this.state.news.slice(0, 6);
    otherNews = this.state.news.slice(6, this.state.news.length);
    let leftSideNews = otherNews.filter((element, index) => {
      if (index === 0 || index % 2 === 0) return element;
    });
    let rightSideNews = otherNews.filter((element, index) => {
      if (index !== 0 && index % 2 !== 0) return element;
    });
    return (
      <div className={this.props.classes.root}>
        <Carousel width="70%" autoplay="true">
          {this.state.news !== []
            ? arrayToDisplayInCarousel.map(news => {
                console.log(news, "NEWSSSSSSSSSSSSSss");
                return (
                  <div>
                    <img src={news.urlToImage} height="50%" width="50%" />
                    <br />
                    {news.content}
                    {/* <a href={news.url}>{news.url}</a> */}
                  </div>
                );
              })
            : null}
        </Carousel>

        <Grid container item sm={12}>
          <Grid item sm={6}>
            {this.state.bandNews !== null
              ? leftSideNews.map(news => {
                  return (
                    <div>
                      <Grid item md={6}>
                        <h1>{news.title}</h1>
                        <img
                          src={news.urlToImage}
                          className={this.props.classes.image}
                          height="250"
                          width="350"
                        />
                        <Grid
                          container
                          item
                          sm={10}
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          >
                          {news.content !== null
                            ? news.content.substring(0, 70)
                            : null}
                          <a
                            className={this.props.classes.link}
                            href={news.url}
                          >
                            {news.url.substring(0, 30)}
                          </a>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })
              : "no news to display"}
          </Grid>

          <Grid item sm={6}>
            {this.state.bandNews !== null
              ? rightSideNews.map(news => {
                  return (
                    <div>
                      <Grid item md={6}>
                        <h1>{news.title}</h1>
                        <img
                          className={this.props.classes.image}
                          src={news.urlToImage}
                          height="250"
                          width="350"
                        />
                        <Grid
                          container
                          item
                          sm={10}
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          >
                          {news.content !== null
                            ? news.content.substring(0, 70)
                            : null}
                          <a
                            className={this.props.classes.link}
                            href={news.url}
                          >
                            {news.url.substring(0, 30)}
                          </a>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })
              : "no news to display"}
          </Grid>
        </Grid>
      </div>

     
    );
  }
}

const styles = {
  position: {
    position: "absolute"
  },
  backgroundColor: {
    backgroundColor: red
  },
  height: {
    height: "500",
    width: "100%"
  },
  root: {
    flexGrow: 1,
    paddingRight: "25%",
    paddingLeft: "25%",

    paddingTop: "10%"
  },
  image: {
    paddingBottom: "8%"
  },
  link: {
    paddingBottom: "15%"
  }
};

export default withStyles(styles)(ArtistNews);
