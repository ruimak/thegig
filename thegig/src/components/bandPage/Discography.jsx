import React, { Component } from "react";
import { getDiscography, getAlbumInfo, getTopArtistSongs } from "../../api";
import {
  Tabs,
  Avatar,
  Typography,
  Grid,
  CardHeader,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { timingSafeEqual } from "crypto";
import "./Discography.css";
import { isAbsolute } from "path";

//I CAN ADD A FUNCTION THAT CHANGES SOMETHING IN THE STATE SO THAT IT EITHER RENDERS 5 OR ALL ALBUMS

class Discography extends Component {
  state = {
    discography: null,
    showmore: false,
    topSongs: null,
    buttonText: `show more ${this.props.params.band} albums`
  };
  componentDidMount() {
    getDiscography(this.props.params.band)
      .then(albums =>
        albums.data.topalbums.album.sort((a, b) => {
          return b.playcount - a.playcount;
        })
      )
      .then(response => {
        this.setState({ discography: response });
      });

    getTopArtistSongs(this.props.params.band).then(topSongs => {
      this.setState({ topSongs });
    });
  }
  showMore() {
    return this.state.showmore === false
      ? this.setState({ showmore: true, buttonText: "Show less" })
      : this.state.showmore === true
      ? this.setState({
          showmore: false,
          buttonText: `show more ${this.props.params.band} albums`
        })
      : null;
  }
  showMore = this.showMore.bind(this);
  render() {
    console.log(this.state.discography, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    const bestAlbums =
      this.state.discography !== null
        ? this.state.discography.slice(0, 6)
        : null;
    const restOfAlbums =
      this.state.discography !== null ? this.state.discography.slice(5) : null;
    const fiveTopsongs =
      this.state.topSongs !== null
        ? this.state.topSongs.data.toptracks.track.slice(0, 5)
        : null;
    //     let arrayToDisplayInCarousel = [];
    //     let otherNews = [];

    //     arrayToDisplayInCarousel = this.state.bandNews.slice(0, 6);
    //     otherNews = this.state.bandNews.slice(6, this.state.bandNews.length);
    //  let leftSideNews = otherNews.filter((element, index)=>{
    //    if(index===0 || index%2===0)
    //    return element
    //  })
    //  let rightSideNews = otherNews.filter((element, index)=>{
    //   if(index!==0 && index%2!==0)
    //   return element
    // })
    // let leftAlbums = this.state.discography !== null ? bestAlbums.filter((elem,index) => {
    // if(index === 0 || index % 2 === 0) {
    // return elem
    // }
    // }) : null
    // let rightAlbums = this.state.discography !== null ? bestAlbums.filter((elem,index) => {
    //   if(index !== 0 && index % 2 !== 0) {
    //   return elem
    //   }
    //   }) : null

    let leftAlbums =
      this.state.discography !== null ? bestAlbums.slice(0, 2) : null;
    let centerAlbums =
      this.state.discography !== null ? bestAlbums.slice(2, 4) : null;
    let rightAlbums =
      this.state.discography !== null ? bestAlbums.slice(4, 6) : null;
    return (
      <div>
        <h1 className={this.props.classes.title} justify="center">
          Top rated{" "}
          {this.props.params.band.slice(0, 3) === "the" || "The"
            ? `${this.props.params.band.slice(4)}'s`
            : `${this.props.params.band}'s`}{" "}
          songs
        </h1>
        {this.state.topSongs !== null
          ? fiveTopsongs.map((song, i) => {
              return (
                <div className={this.props.classes.paperSongs}>
                  <Link
                    className={this.props.classes.titleLink}
                    to={`/artist/${this.props.params.band}/song/${song.name}`}
                  >
                    <Paper className={this.props.classes.paperSong}>
                      {i + 1} : <b>{song.name}</b> Playcount: {song.playcount}
                    </Paper>
                  </Link>
                </div>
              );
            })
          : null}

        <h1 className={this.props.classes.title}>
          Top rated{" "}
          {this.props.params.band.slice(0, 3) === "the" || "The"
            ? `${this.props.params.band.slice(4)}'s`
            : null}{" "}
          albums
        </h1>
        <Grid
          container
          lg={12}
          spacing={0}
          direction="row"
          className={this.props.classes.mainGrid}
          justify="center"
          alignItems="center"
        >
          <Grid className={this.props.classes.leftGrid} item lg={4} spacing={0}>
            {this.state.discography !== null
              ? leftAlbums.map((album, i) => {
                  return (
                    <Card className={this.props.classes.card}>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                      >
                        <CardMedia
                          className={`${this.props.classes.cardImage} image`}
                          image={album.image[0]["#text"]}
                          title="Paella dish"
                        />
                      </Link>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.link}
                      >
                        <CardContent className={this.props.classes.cardCon}>
                          <h1
                            className={`${
                              this.props.classes.cardContent
                            } content`}
                          >
                            {album.name}
                          </h1>
                          <p className={this.props.classes.playCountText}>
                            Number {i + 1} : {album.playcount} plays
                          </p>
                        </CardContent>
                        <br />
                      </Link>
                    </Card>
                  );
                })
              : "no events to show yet"}
          </Grid>

          <Grid item lg={4} spacing={0}>
            {this.state.discography !== null
              ? centerAlbums.map((album, i) => {
                  return (
                    <Card className={this.props.classes.card}>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                      >
                        <CardMedia
                          className={`${this.props.classes.cardImage} image`}
                          image={album.image[0]["#text"]}
                          title="Paella dish"
                        />
                      </Link>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.link}
                      >
                        <CardContent className={this.props.classes.cardCon}>
                          <h1
                            className={`${
                              this.props.classes.cardContent
                            } content`}
                          >
                            {album.name}
                          </h1>
                          <p className={this.props.classes.playCountText}>
                            Number {i + 3} : {album.playcount} plays
                          </p>
                        </CardContent>
                        <br />
                      </Link>
                    </Card>
                  );
                })
              : "no events to show yet"}
          </Grid>
          <Grid
            className={this.props.classes.rightGrid}
            item
            lg={4}
            spacing={0}
          >
            {this.state.discography !== null
              ? rightAlbums.map((album, i) => {
                  return (
                    <Card className={this.props.classes.card}>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                      >
                        <CardMedia
                          className={`${this.props.classes.cardImage} image`}
                          image={album.image[0]["#text"]}
                          title="Paella dish"
                        />
                      </Link>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.link}
                      >
                        <CardContent className={this.props.classes.cardCon}>
                          <h1
                            className={`${
                              this.props.classes.cardContent
                            } content`}
                          >
                            {album.name}
                          </h1>
                          <p className={this.props.classes.playCountText}>
                            Number {i + 5} : {album.playcount} plays
                          </p>
                        </CardContent>
                        <br />
                      </Link>
                    </Card>
                  );
                })
              : "no events to show yet"}
          </Grid>
        </Grid>
        <Button
          className={this.props.classes.button}
          variant="extended"
          color="pink"
          onClick={this.showMore}
        >
          {this.state.buttonText}
        </Button>
        <Grid
          container
          sm={8}
          spacing={0}
          direction="row"
          className={this.props.classes.moreAlbumsGrid}
        >
          {this.state.discography !== null && this.state.showmore === true
            ? restOfAlbums.map((album, i) => {
                if (i < 4) {
                  return (
                    <Card
                      className={`${this.props.classes.card} ${
                        this.props.classes.moreAlbumscard
                      }`}
                    >
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.moreAlbumslink}
                      >
                        <CardMedia
                          className={`${this.props.classes.cardImage} image`}
                          image={album.image[0]["#text"]}
                          title="Paella dish"
                        />
                      </Link>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.link}
                      >
                        <CardContent
                          className={`${this.props.classes.cardCon} ${
                            this.props.classes.moreAlbumCardCon
                          }`}
                        >
                          <h1
                            className={`${
                              this.props.classes.cardContent
                            } content moreAlbumContent`}
                          >
                            {album.name}
                          </h1>
                          <p
                            className={`${this.props.classes.playCountText} ${
                              this.props.classes.moreAlbumPlayCountText
                            }`}
                          >
                            Number {i + 3} : {album.playcount} plays
                          </p>
                        </CardContent>
                        <br />
                      </Link>
                    </Card>
                  );
                } else if (i > 4 && i < 8) {
                  return (
                    <Card
                      className={`${this.props.classes.card} ${
                        this.props.classes.moreAlbumscard
                      }`}
                    >
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.moreAlbumslink}
                      >
                        <CardMedia
                          className={`${this.props.classes.cardImage} image`}
                          image={album.image[0]["#text"]}
                          title="Paella dish"
                        />
                      </Link>
                      <Link
                        to={`/artist/${this.props.params.band}/albums/${
                          album.name
                        }/`}
                        className={this.props.classes.link}
                      >
                        <CardContent
                          className={`${this.props.classes.cardCon} ${
                            this.props.classes.moreAlbumCardCon
                          }`}
                        >
                          <h1
                            className={`${
                              this.props.classes.cardContent
                            } content moreAlbumContent`}
                          >
                            {album.name}
                          </h1>
                          <p
                            className={`${this.props.classes.playCountText} ${
                              this.props.classes.moreAlbumPlayCountText
                            }`}
                          >
                            Number {i + 3} : {album.playcount} plays
                          </p>
                        </CardContent>
                        <br />
                      </Link>
                    </Card>
                  );
                }
              })
            : null}
        </Grid>
      </div>
    );
  }
}

const styles = {
  card: {
    backgroundColor: "white",
    marginLeft: "25%",
    marginRight: "25%",
    position: "relative",
    textAlign: "center",
    color: "white",
    maxWidth: 375,
    maxheight: 375
  },
  cardHeader: {
    // justify:"center"
  },
  cardImage: {
    height: "5%",
    paddingTop: "56.25%"
  },
  cardContent: {
    // paddingBottom : '40%'
    position: "absolute",
    bottom: "20%",
    left: "5%"
  },
  header: {
    fontFamily: "'Lilita One', 'cursive'"
  },
  link: {
    textDecoration: "none"
  },
  playCountText: {
    fontSize: "1.5em",
    fontFamily: "'Titillium Web', 'sans-serif'"
  },
  cardCon: {
    marginBottom: "-15%",
    marginTop: "-8%",
    backgroundColor: "sandWhite"
  },
  leftGrid: {
    marginRight: "-15.2%"
  },
  rightGrid: {
    marginLeft: "-15.2%"
  },
  mainGrid: {
    marginBottom: "4%"
  },
  button: {
    position: "absolute",
    marginLeft: "43%",
    marginBottom: "15%",
    backgroundColor: "pink",
    height: "8%"
  },
  moreAlbumscard: {
    maxWidth: 150,
    maxheight: 150,
    left: "20%",
    position: "relative",
    direction: "row"
  },
  moreAlbumPlayCountText: {
    fontSize: "0.9em",
    fontFamily: "'Titillium Web', 'sans-serif'",

    bottom: "10%",
    left: "5%"
  },
  moreAlbumCardCon: {
    bottom: "50%",
    left: "5%"
  },
  paperSongs: {
    textAlign: "center",
    marginRight: "35%",
    marginLeft: "35%"
  },
  paperSong: {
    paddingBottom: "3%",
    paddingTop: "3%"
  },

  title: {
    textAlign: "center",
    marginBottom: "3%",
    marginTop: "3%",
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize: "2.9em"
  },
  titleLink: {
    textDecoration: "none"
  },
  moreAlbumsGrid: {
    marginTop: "10%",
    marginLeft: "10%"
  }
};

export default withStyles(styles)(Discography);
