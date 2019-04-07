import React, { Component } from "react";
import { getSetLists, getBandInfo } from "../../api";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "./SetLists.css";
import { Button, Paper } from "@material-ui/core";

const styles = {
  links: {
    textAlign: "center",
    paddingTop: "4%",
    paddingBottom: "4%"
  },
  paper: {
    marginTop: "15%",
    marginRight: "20%",
    marginLeft: "20%"
  },
  button: {
    marginLeft: "38%",
    marginBottom: "7%"
  }
};

class SetLists extends Component {
  state = {
    setLists: null,
    // setListDisplayed: null
    songs: null,
    eventName: null
  };

  // openAndCloseSetlist = setListIndex => {
  //   !this.state.setListDisplayed
  //     ? this.setState({ setListDisplayed: setListIndex })
  //     : this.setState({ setListDisplayed: null });
  // };

  backTosetLists = back => {
    this.setState({ songs: back });
  };

  handleClick(e, setlist) {
    const setlists = setlist.map((songs, i) => {
      return songs.song.map(playlist => {
        return playlist;
      });
    });
    this.setState({ songs: setlists, eventName: e.target.id });
  }

  componentDidMount() {
    getBandInfo(this.props.params.band).then(bandinfo => {
      getSetLists(bandinfo.data.artist.mbid).then(setLists => {
        this.setState({ setLists: setLists.data.setlist });
      });
    });
  }

  render() {
    this.set =
      this.state.setLists === null
        ? "There is no setlist for this artist"
        : this.state.setLists.map((setlist, i) => {
            this.songs =
              this.state.songs === null
                ? "There is no setlist for this artist"
                : this.state.songs[0];
            this.encore =
              this.state.songs === null
                ? "There is no setlist for this artist"
                : this.state.songs[1];

            return setlist.sets.set.length === 0 ? null : (
              <Paper
                key={i}
                className={`${this.props.classes.links} links`}
                onClick={e => this.handleClick(e, setlist.sets.set)}
                id={setlist.venue.name}
                style={{ cursor: "pointer" }}
              >
                {setlist.venue.name}
                <br />
                {setlist.tour.name}
              </Paper>
            );
          });
    return (
      <div className={this.props.classes.paper}>
        <div onClick={() => this.backTosetLists(null)}>
          {this.state.songs !== null ? (
            <Button className={this.props.classes.button}>
              Go back to Setlists
            </Button>
          ) : null}
        </div>
        {this.state.songs === null
          ? this.set
          : this.songs.map((song, i) => {
              return (
                <Paper key={i} className={`${this.props.classes.links} `}>
                  <Link
                    className="links"
                    to={`/artist/${this.props.params.band}/song/${song.name}`}
                  >
                    {i + 1}
                    {": "}
                    {song.name}
                    <br />
                  </Link>
                </Paper>
              );
            })}
        {this.state.songs === null
          ? this.set
          : this.encore !== undefined
          ? this.encore.map((song, i) => {
              return (
                <div key={i}>
                  <h1>Encore</h1>
                  <Paper className={`${this.props.classes.links} `}>
                    <Link
                      className="links"
                      to={`/artist/${this.props.params.band}/song/${song.name}`}
                    >
                      {i + 1}
                      {": "}
                      {song.name}
                      <br />
                    </Link>
                  </Paper>
                </div>
              );
            })
          : null}
      </div>

      // if (!this.state.setLists) {
      //   return "There are no setlists for this artist.";
      // }
      // //the songs are rendered here if you click on a setlist
      // else if (this.state.setListDisplayed) {
      //   return (
      //     <div>
      //       <div
      //         onClick={() => {
      //           this.openAndCloseSetlist(null);
      //         }}
      //       >
      //         {this.state.setLists[this.state.setListDisplayed].venue.name}
      //       </div>
      //       {this.state.setLists[this.state.setListDisplayed].sets.set[0] &&
      //         this.state.setLists[
      //           this.state.setListDisplayed
      //         ].sets.set[0].song.map(song => {
      //           return <Link to={`/artist/${this.props.params.band}/song/${song.name}`}>{song.name}<br/></Link>;
      //         })}
      //     </div>
      //   );
      // }
      // //this is the list of setlists, pardon the redundancy
      // else
      //   return (
      //     <div>
      //       <div>
      //         {this.state.setLists.map((setList, index) => {
      //           return (
      //             <div
      //               onClick={() => {
      //                 this.openAndCloseSetlist(index);
      //               }}
      //             >
      //               {setList.venue.name}
      //             </div>
      //           );
      //         })}
      //       </div>
      //     </div>
    );
  }
}
export default withStyles(styles)(SetLists);
