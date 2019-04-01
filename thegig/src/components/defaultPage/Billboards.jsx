import React, { Component } from "react";
import { getBillboardCharts } from "../../api";
import { Link } from "react-router-dom";
import { Paper, Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import "../../styles/App.css";

const styles = {
  root: {
    flexGrow: 1,

    // paddingRight: "25%",
    // paddingLeft: "25%",

    paddingTop: "5%"
  },
  button: {
    marginTop: "30%",
    marginLeft: "10%"
  },
  buttonText: {
    width: "90%",
    fontSize: "2vh",
    paddingLeft: "1%",
    paddingRight: "1%"
  },
  link: {
    textDecoration: "none"
  },
  paperSongs: {
    paddingTop: "-8%",
    paddingBottom: "-5%",
    textAlign: "center",
    fontSize: "0.9em"
  },
  paper: {
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
    marginTop:'5vh'
  },
  arrowUp: {
    color: "green",

    position: "absolute",
    marginBottom: "-1%",
    paddingLeft: "65%"
  },
  arrowDown: {
    color: "red",

    paddingLeft: "65%",
    position: "absolute",
    marginBottom: "-1%"
  },
  rank: {
    marginLeft: "4%",
    marginBottom: "2%",
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize: "2.1em",
    position: "absolute",
    color: "#444"
  },
  flatLine: {
    color: "black",
    paddingLeft: "65%",
    position: "absolute",

    marginBottom: "-1%"
  },
  title: {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize: "1.6em",
    postion: "relative",
    color: "#b288c0"
  },
  picture: {
    maxHeight: 700,
    maxWidth: 700,
    marginLeft: "83%",
    marginTop: "-38%"
  },
  artist: {
    fontFamily: "'Titillium Web', 'sans-serif'",
    fontSize: "1.5em",
    postion: "relative",
    color: "lightBlue"
  }
};

class Billboards extends Component {
  state = {
    charts: []
    // buttonClicked: ""
  };

  componentDidMount() {
    this.handleClick = this.handleClick.bind(this);
    getBillboardCharts("hot-100").then(tracks => {
      let returnedTracks = tracks.data;
      returnedTracks.shift();
      this.setState({ charts: returnedTracks });
    });
  }

  handleClick(keyWord) {
    getBillboardCharts(keyWord).then(tracks => {
      let returnedTracks = tracks.data;
      returnedTracks.shift();
      this.setState({ charts: returnedTracks });
    });
  }

  render() {
    console.log(this.state, "this is the chsrts ");
    const listOfButtons = [
      ["Hot100", "hot-100"],
      ["RnB", "rnb"],
      ["Top UK", "uksongs"],
      ["Top Rock", "rock"],
      ["Top Pop", "pop"]
    ];
    const chartButton = (name, keyWord) => {
      return (
        <div>
          <Button
            className={this.props.classes.buttonText}
            name={name}
            onClick={() => this.handleClick(keyWord)}
            // color="primary"
            variant="outlined"
          >
            {name}
          </Button>
        </div>
      );
    };
    const iconChooser = (situation, index) => {
      switch (true) {
        case situation > index + 1:
          return (
            <Icon fontSize={"large"} className={this.props.classes.arrowUp}>
              arrow_upward{" "}
            </Icon>
          );
        case situation === index + 1 || situation === null:
          return (
            <Icon fontSize={"large"} className={this.props.classes.flatLine}>
              trending_flat
            </Icon>
          );
        case situation < index + 1 || situation === null:
          return (
            <Icon fontSize={"large"} className={this.props.classes.arrowDown}>
              arrow_downward
            </Icon>
          );
      }
    };

    return (
      <div className={this.props.classes.root}>
        <h1 className="title" style={{ paddingBottom: "10vh" }}>
          {"Top Charts"}
        </h1>
        <Grid container xs={10} justify="center" className="centered-container">
          {listOfButtons.map((element, index) => {
            return (
              <Grid item xs={2}>
                {chartButton(listOfButtons[index][0], listOfButtons[index][1])}
              </Grid>
            );
          })}
        </Grid>
        {this.state.charts !== null ? (
          <Paper className={this.props.classes.paper}>
            {this.state.charts.map((track, i) => {
              console.log(track, "THIS IS THE TRACK!!!!!");

              return (
                <Paper className={this.props.classes.paperSongs}>
                  <div>
                    <p className={this.props.classes.rank}>
                      #{i + 1}
                      {iconChooser(track.position.positionLastWeek, i)}
                    </p>

                    <Link
                      className={this.props.classes.link}
                      to={`/artist/${track.artist}/song/${track.title}`}
                    >
                      <div className={this.props.classes.title}>
                        <b>{track.title}</b>
                      </div>
                    </Link>
                    <Link
                      className={this.props.classes.link}
                      to={`/artist/${track.artist}/news`}
                    >
                      <h1 className={this.props.classes.artist}>
                        {track.artist}
                      </h1>
                    </Link>
                    <img
                      height={105}
                      className={this.props.classes.picture}
                      src={track.cover}
                    />
                  </div>
                </Paper>
              );

              //   if (track.position.positionLastWeek > i + 1) {
              //     return (
              //       <Paper className={this.props.classes.paperSongs}>
              //         <div>
              //           <p className={this.props.classes.rank}>
              //             #{i + 1}
              //             <Icon
              //               fontSize={"large"}
              //               className={this.props.classes.arrowUp}
              //             >
              //               arrow_upward{" "}
              //             </Icon>
              //           </p>

              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/song/${track.title}`}
              //           >
              //             <h1 className={this.props.classes.title}>
              //               <b>{track.title}</b>
              //             </h1>
              //           </Link>
              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/news`}
              //           >
              //             <h1 className={this.props.classes.artist}>
              //               {track.artist}
              //             </h1>{" "}
              //           </Link>
              //           <img
              //             height={105}
              //             className={this.props.classes.picture}
              //             src={track.cover}
              //           />
              //         </div>
              //       </Paper>
              //     );
              //   } else if (track.position.positionLastWeek === i) {
              //     return (
              //       <Paper className={this.props.classes.paperSongs}>
              //         <div>
              //           <p className={this.props.classes.rank}>
              //             #{i + 1}
              //             <Icon
              //               fontSize={"large"}
              //               className={this.props.classes.flatLine}
              //             >
              //               trending_flat
              //             </Icon>
              //           </p>
              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/song/${track.title}`}
              //           >
              //             <h1 className={this.props.classes.title}>
              //               {track.title}
              //             </h1>
              //           </Link>
              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/news`}
              //           >
              //             {" "}
              //             <h1 className={this.props.classes.artist}>
              //               {track.artist}
              //             </h1>
              //           </Link>
              //           <img
              //             height={105}
              //             className={this.props.classes.picture}
              //             src={track.cover}
              //           />
              //         </div>
              //       </Paper>
              //     );
              //   } else if (track.position.positionLastWeek === null) {
              //     return (
              //       <Paper className={this.props.classes.paperSongs}>
              //         <div>
              //           <p className={this.props.classes.rank}>
              //             #{i + 1}
              //             <Icon
              //               fontSize={"large"}
              //               className={this.props.classes.flatLine}
              //             >
              //               trending_flat
              //             </Icon>
              //           </p>
              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/song/${track.title}`}
              //           >
              //             <h1 className={this.props.classes.title}>
              //               {track.title}
              //             </h1>
              //           </Link>
              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/news`}
              //           >
              //             <h1 className={this.props.classes.artist}>
              //               {track.artist}
              //             </h1>
              //           </Link>
              //           <img
              //             height={105}
              //             className={this.props.classes.picture}
              //             src={track.cover}
              //           />
              //         </div>
              //       </Paper>
              //     );
              //   } else {
              //     return (
              //       <Paper className={this.props.classes.paperSongs}>
              //         <div>
              //           <p className={this.props.classes.rank}>
              //             #{i + 1}
              //             <Icon
              //               fontSize={"large"}
              //               className={this.props.classes.arrowDown}
              //             >
              //               arrow_downward
              //             </Icon>
              //           </p>

              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/song/${track.title}`}
              //           >
              //             <h1 className={this.props.classes.title}>
              //               {track.title}
              //             </h1>
              //           </Link>
              //           <Link
              //             className={this.props.classes.link}
              //             to={`/artist/${track.artist}/news`}
              //           >
              //             {" "}
              //             <h1 className={this.props.classes.artist}>
              //               {track.artist}
              //             </h1>
              //           </Link>
              //           <img
              //             height={105}
              //             className={this.props.classes.picture}
              //             src={track.cover}
              //           />
              //         </div>
              //       </Paper>
              //     );
              //   }
            })}
          </Paper>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Billboards);
