import React, { Component } from "react";
import { getAllBandNews } from "../../api";
// import { AutoRotatingCarousel } from 'material-auto-rotating-carousel'
import firebase from "firebase";
import { getFollowedBandNews } from "../../api";
import {
  Tabs,
  Avatar,
  Typography,
  Grid,
  Slide,
  GridList
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Carousel from "nuka-carousel";

import "../../styles/App.css";
const { red, blue, green } = require("@material-ui/core/colors");
const { database } = firebase;

class HomeBandNews extends Component {
  state = {
    bandNews: [],
    carousel: []
  };

  componentDidMount() {
    //    firebase.database.ref('bands').on('value',(data => {
    // console.log(data,'this is data')
    //    }))

    //DANNYS ALGORYTHM

    //    const bands =  ['foals','eagles']
    //    const lol = bands.map(band => {
    // return ` ${band} OR`
    //    })
    //    const lolagain = lol.reduce((acc, culval,index) => {

    //       return acc + culval
    //    },'')
    //    const hi = lolagain.substring(0,lolagain.length-2)
    //    console.log(hi,'OOOOOOOOOOO********&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')

    //    console.log(typeof lolagain,'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPp')
    //    console.log([...lol].concat(lol),'{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}')
    //    getFollowedBandNews(hi).then(data => {
    //      console.log(data,'kkkkkkkkkkkkkkkkkggggggggggggggggggggggggggg')
    //    })

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
    });
    let rightSideNews = otherNews.filter((element, index) => {
      if (index !== 0 && index % 2 !== 0) return element;
    });

    return (
      <div className={this.props.classes.root}>
        <Carousel
          width="70%"
          autoplay="true"
          autoGenerateStyleTag="true"
          heightMode="max"
          className="stand-out-container"
        >
          {this.state.bandNews !== null
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
            {this.state.bandNews !== null
              ? leftSideNews.map(news => {
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
                })
              : "no news to display"}
          </Grid>

          <Grid item sm={6}>
            {this.state.bandNews !== null
              ? rightSideNews.map(news => {
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
