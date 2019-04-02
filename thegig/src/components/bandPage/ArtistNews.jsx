import React, { Component } from "react";
import { getArtistNews } from "../../api";
import { Grid } from "@material-ui/core";
import Carousel from "nuka-carousel";
import { withStyles } from "@material-ui/core/styles";
import "../../styles/CarouselStyle.css";
import "../../styles/App.css";

class ArtistNews extends Component {
  state = {
    news: []
  };
  componentDidMount() {
    getArtistNews(this.props.params.band).then(news => {
      this.setState({ news: news.data.articles });
    });
  }

  //We need the next componentDidUpdate because if we go from one band to another, we're not changing routes even though the props do change.
  //Because of that we need some 'listener' that reacts to props changing and updates the state, therefore causing a re-render.
  componentDidUpdate(prevProps, prevState) {
    if (this.props.params.band !== prevProps.params.band) {
      let newsToGoInState = [];

      getArtistNews(this.props.params.band).then(news => {
        newsToGoInState = news.data.articles;

        this.setState({ news: newsToGoInState });
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
    console.log(arrayToDisplayInCarousel);

    return (
      <div className={this.props.classes.root}>
        <Carousel width="70%" heightMode="max" className="stand-out-container">
          {this.state.news !== []
            ? arrayToDisplayInCarousel.map(news => {
                return (
                  <div
                    style={{
                      display: "inline",
                      justifyContent: "center"
                    }}
                    onClick={() => {
                      window.open(`${news.url}`, "mywindow").focus();
                    }}
                  >
                    <img
                      src={news.urlToImage}
                      height="400vw"
                      width="600vw"
                      style={{ marginTop: "4%" }}
                    />
                    <br />
                    <h2>{news.title}</h2>

                    <div
                      style={{
                        paddingBottom: "8%",
                        justifyContent: "center",
                        overflow: "hidden"
                      }}
                    >
                      {news.description}
                    </div>
                  </div>
                );
              })
            : null}
        </Carousel>

        <Grid container item sm={12} style={{ paddingTop: "5vh" }}>
          <Grid item sm={6}>
            {leftSideNews.map(news => {
              return (
                <div
                  className="stand-out-container"
                  onClick={() => {
                    window.open(`${news.url}`, "mywindow").focus();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Grid
                    item
                    md={6}
                    style={{ height: "50vh", maxWidth: "100%" }}
                  >
                    <img
                      src={news.urlToImage}
                      className={this.props.classes.image}
                      height="250"
                      width="85%"
                    />
                    <div className="article-title">{news.title}</div>
                    <Grid
                      container
                      item
                      sm={10}
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className="article-description"
                      style={{ maxWidth: "100%" }}
                    >
                      {news.description !== null ? (
                        <div
                          className="centered-container"
                          style={{ width: "90%" }}
                        >
                          {news.description}
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Grid>

          <Grid item sm={6}>
            {rightSideNews.map(news => {
              return (
                <div
                  className="stand-out-container"
                  onClick={() => {
                    window.open(`${news.url}`, "mywindow").focus();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Grid
                    item
                    md={6}
                    style={{ height: "50vh", maxWidth: "100%" }}
                  >
                    <img
                      className={this.props.classes.image}
                      src={news.urlToImage}
                      height="250"
                      width="85%"
                    />
                    <div className="article-title">{news.title}</div>
                    <Grid
                      container
                      item
                      sm={10}
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className="article-description"
                      style={{ maxWidth: "100%" }}
                    >
                      {news.description !== null ? (
                        <div
                          className="centered-container"
                          style={{ width: "90%" }}
                        >
                          {news.description}
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              );
            })}
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
  backgroundColor: {},
  height: {
    height: "500",
    width: "100%"
  },
  root: {
    flexGrow: 1,
    paddingTop: "10%"
  },
  image: {
    paddingTop: "8%"
  },
  link: {
    paddingBottom: "15%"
  }
};

export default withStyles(styles)(ArtistNews);
