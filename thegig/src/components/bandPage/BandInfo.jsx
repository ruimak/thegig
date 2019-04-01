import React, { Component } from "react";
import { getBandInfo } from "../../api";
import RelatedArtists from "./RelatedArtists";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";

class BandInfo extends Component {
  state = {
    bio: null
  };

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandInfo => {
      this.setState({ bio: bandInfo.data.artist });
    });
  }

  render() {
    if (!this.state.bio) {
      return null;
    } else
      return (
        <div className={this.props.classes.wholeScreen}>
          <div className="container" style={{ paddingTop: "5vh" }}>
            <div className="title">{"Biography"}</div>
            <br />
            <Grid
              container
              md={15}
              className="stand-out-container"
              style={{ paddingTop: "2vh", paddingLeft: "3vh" }}
            >
              <Grid item sm={9}>
                <Typography inline={true} className={this.props.classes.text}>
                  {this.state.bio.bio.content}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <RelatedArtists
                  artists={Object.values(this.state.bio.similar.artist)}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      );
  }
}

const styles = {
  container: {
  },
  avatar: {
    height: 150,
    width: 150
  },
  header: {
    fontSize: "3.5em",
    color: "#b288c0",
    fontFamily: "'Lilita One', 'cursive'",
    textColor: "grey",
    paddingTop: "10%"
  },
  text: {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize: "1.4em",
    color: "#444",
    lineHeight: 2
  },
  titleAndAvatar: {
    paddingBottom: "8%"
  }
};

export default withStyles(styles)(BandInfo);
