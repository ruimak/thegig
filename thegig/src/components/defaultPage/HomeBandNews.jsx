import React, { Component } from "react";
import { getAllBandNews } from "../../api";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Carousel from "nuka-carousel";
import "../../styles/App.css";

class HomeBandNews extends Component {
  state = {
    bandNews: [],
    carousel: []
  };

  componentDidMount() {
    getAllBandNews().then(bandNews => {
      this.setState({
        bandNews: bandNews.data.articles,
        carousel: bandNews.data.articles[0]
      });
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  render() {
    let arrayToDisplayInCarousel = [];
    let otherNews = [];

    arrayToDisplayInCarousel = this.state.bandNews.slice(0, 6);
    otherNews = this.state.bandNews.slice(6, this.state.bandNews.length);
    let leftSideNews = otherNews.filter((element, index) => {
      if (index === 0 || index % 2 === 0) return element;
      return null
    });
    let rightSideNews = otherNews.filter((element, index) => {
      if (index !== 0 && index % 2 !== 0) return element;
      return null
    });

    return (
      <div className={this.props.classes.root}>
        {/* This is the Carousel */}
        <Carousel width="70%" heightMode="max" className="stand-out-container">
          {arrayToDisplayInCarousel.map(news => {
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
                  alt={news.title}
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
          })}
        </Carousel>

        <Grid container item sm={12} style={{ paddingTop: "5vh" }}>
          <Grid item sm={6}>
            {/* These are the news for the left side of the grid */}
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
                      alt={news.title}
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
            {/* These are the news for the right side of the grid */}
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
                      alt={news.title}
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

export default withStyles(styles)(HomeBandNews);
