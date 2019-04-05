import React, { Component } from "react";
import { getDiscography, getTopArtistSongs } from "../../api";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../../styles/Discography.css";

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
    const bestAlbums =
      this.state.discography !== null
        ? this.state.discography.slice(0, 6)
        : null;
    const restOfAlbums =
      this.state.discography !== null ? this.state.discography.slice(6) : null;
    const fiveTopsongs =
      this.state.topSongs !== null
        ? this.state.topSongs.data.toptracks.track.slice(0, 5)
        : null;

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
          {this.props.params.band.startsWith("The")
            ? `${this.props.params.band.slice(4)}'s`
            : `${this.props.params.band}`}{" "}
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
                    <Paper data-cy="Paper" className={this.props.classes.paperSong}>
                      {i + 1} : <b>{song.name}</b> Playcount: {song.playcount}
                    </Paper>
                  </Link>
                </div>
              );
            })
          : null}

        <h1 className={this.props.classes.title}>
          Top rated{" "}
          {this.props.params.band.startsWith("The")
            ? `${this.props.params.band.slice(4)}'s`
            : `${this.props.params.band}`}{" "}
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
          className={`${this.props.classes.button} button`}
          // variant="extended"
          color="pink"
          onClick={this.showMore}
        >
          {this.state.buttonText}
        </Button>
        <Grid
          container
          sm={12}
          spacing={0}
          direction="column"
          className={this.props.classes.moreAlbumsGrid}
        >
          <Grid item sm={6}>
            {this.state.discography !== null && this.state.showmore === true
              ? restOfAlbums.map((album, i) => {
                  if (i < 5) {
                    return (
                      <Card
                        className={`${this.props.classes.moreAlbumcard} ${
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
                                this.props.classes.moreAlbumscardContent
                              } content moreAlbumContent`}
                            >
                              {album.name}
                            </h1>
                            <p
                              className={`${this.props.classes.playCountText} ${
                                this.props.classes.moreAlbumPlayCountText
                              }`}
                            >
                              Number {i + 6} : {album.playcount} plays
                            </p>
                          </CardContent>
                          <br />
                        </Link>
                      </Card>
                    );
                  } else if (i > 4 && i < 8) {
                    return (
                      <Card
                        className={`${this.props.classes.moreAlbumcard} ${
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
                                this.props.classes.moreAlbumscardContent
                              } content moreAlbumContent`}
                            >
                              {album.name}
                            </h1>
                            <p
                              className={`${this.props.classes.playCountText} ${
                                this.props.classes.moreAlbumPlayCountText
                              }`}
                            >
                              Number {i + 6} : {album.playcount} plays
                            </p>
                          </CardContent>
                          <br />
                        </Link>
                      </Card>
                    );
                  }
                  return null
                })
              : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = {
  card: {
    backgroundColor: "white",
    marginLeft: "10%",
    marginRight: "10%",
    position: "relative",
    textAlign: "center",
    color: "white",
    maxWidth: 375,
    maxheight: 375
  },
  cardHeader: {},
  cardImage: {
    height: "5%",
    paddingTop: "56.25%"
  },
  cardContent: {
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
    fontSize: "1.1em",
    fontFamily: "'Titillium Web', 'sans-serif'"
  },
  cardCon: {
    marginBottom: "-15%",
    marginTop: "-8%",
    backgroundColor: "sandWhite"
  },
  leftGrid: {
    marginRight: "-6.7%"
  },
  rightGrid: {
    marginLeft: "-6.5%"
  },
  mainGrid: {
    marginBottom: "4%"
  },
  button: {
    position: "absolute",
    marginLeft: "40%",
    marginBottom: "15%",
    backgroundColor: "pink",
    height: "5%",
    width: "15em"
  },
  moreAlbumscard: {
    maxWidth: 150,
    maxheight: 150,
    left: "50%",
    position: "relative",
    direction: "row"
  },
  moreAlbumPlayCountText: {
    fontSize: "1.4em",
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
    marginTop: "25%",
    marginLeft: "5%",

    marginBottom: "25%"
  },
  moreAlbumcard: {
    backgroundColor: "white",
    position: "relative",
    textAlign: "center",
    color: "white",
    maxWidth: 375,
    maxheight: 375
  },
  moreAlbumscardContent: {
    position: "absolute",
    bottom: "26%",
    left: "5%"
  },
  moreAlbumslink : {
    height : 100
  }
};

export default withStyles(styles)(Discography);
