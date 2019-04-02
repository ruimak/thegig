import React, { Component } from "react";
import { getTrack, getSongInfo } from "../../api";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
// const { DZ } = window

class SongPlayer extends Component {
  state = {
    //   loggedin: false
    track: null,
    songInfo: null
  };

  //In this particular file we will keep the commented sections in, because they are part of a future implementation
  //That implementation will be an internal music player, a widget that will allow you to listen to songs and have playlists while on the app

  // login =()=> {
  //     DZ.login(function(response) {
  //         if (response.authResponse) {
  //             console.log('Welcome!  Fetching your information.... ');
  //             DZ.api('/user/me', function(response) {
  //                 console.log('Good to see you, ' + response.name + '.');
  //             });
  //         } else {
  //             console.log('User cancelled login or did not fully authorize.');
  //         }

  //     }, { perms: 'basic_access,email' })
  //   }
  //   getLoginStatus = () => {
  //     // DZ &&
  //       DZ.getLoginStatus(res => {
  //           console.log(res, 'statuuuuuuus')
  //           console.log('HELLOOOOOOOOOOOOOOOOOOO')
  //         // this.setState({
  //         //   loggedin: status === 'connected'
  //         // })
  //         // if (!this.state.loggedin && status === 'connected') {
  //         //   this.login()
  //         // }
  //       })
  //   }

  componentDidMount() {
    // this.getLoginStatus()
    getTrack(this.props.params.band, this.props.params.songTitle).then(res => {
      this.setState({ track: res.data.data[0].preview });
    });
    getSongInfo(this.props.params.band, this.props.params.songTitle).then(
      songInfo => {
        this.setState({ songInfo: songInfo });
      }
    );
  }

  // Again, we need the componentDidUpdate because if we dont, when we go from a songpage to another, the route is the same.
  // Event though the parameters are gonna be different, having the same route means it wont cause a re-render so we need to force one.
  componentDidUpdate(prevProps, prevState) {
    if (this.props.params.songTitle !== prevProps.params.songTitle) {
      getSongInfo(this.props.params.band, this.props.params.songTitle).then(
        songInfo => {
          this.setState({ songInfo: songInfo });
        }
      );
      getTrack(this.props.params.band, this.props.params.songTitle).then(
        res => {
          this.setState({ track: res.data.data[0].preview });
        }
      );
    }
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  render() {
    //   this.getLoginStatus()
    return this.state.songInfo && this.state.songInfo.data.track ? (
      <div>
        <h1>{this.state.songInfo && this.state.songInfo.data.track.name}</h1>
        <div>
          <img src={this.state.songInfo.data.track.album.image[2]["#text"]} />

          <h2>{"Album: " + this.state.songInfo.data.track.album.title}</h2>
        </div>
        <Button
          onClick={() => {
            window.open(
              `http://localhost:3000/artist/${this.props.params.band}/song/${
                this.props.params.songTitle
              }/lyrics`,
              "newwindow"
            );
          }}
        >
          {"Lyrics"}
        </Button>
        <Button
          onClick={() => {
            window.open(
              `http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${
                this.props.params.songTitle
              }&a=${this.props.params.band}`,
              "newwindow"
            );
          }}
        >
          {"Guitar Tabs"}
        </Button>
        <br />
        <audio
          ref="audio_tag"
          src={this.state.track}
          autostart="false"
          controls
          autoPlay
        />
        <h3>{"Info"}</h3>
        <div>
          {this.state.songInfo.data.track.wiki
            ? this.state.songInfo.data.track.wiki.content
            : "No info avaiable for this song :("}
        </div>

        {/* THIS BUTTON WILL BE USEFULL LATER WHEN WE IMPLEMENT A WIDGET */}
        {/* <button
        className="login"
        onClick={
          this.state.loggedin ? this.login : this.login
        }
      >
        {this.state.loggedin ? 'FLOW' : 'Log In With Deezer'}
        
      </button> */}
      </div>
    ) : null;
  }
}

const styles = theme => ({});

export default withStyles(styles)(SongPlayer);
