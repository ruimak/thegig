import React, { Component } from "react";
// import fetchJsonp from 'fetch-jsonp'

import { getTrack, getSongInfo } from "../../api";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";



// const { DZ } = window

class SongPlayer extends Component {
  state = {
    //   loggedin: false
    track: null,
    songInfo: null
  };

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
    console.log(this.props.params.band, this.props.params.songTitle, "PROPS");
    getTrack(this.props.params.band, this.props.params.songTitle).then(res => {
      console.log(res, "TRAAAAAAAAAAAAACKKK");
      console.log(this.props.params.band, this.props.params.songTitle, "PROPS");
      this.setState({ track: res.data.data[0].preview });
    });
    getSongInfo(this.props.params.band, this.props.params.songTitle).then(
      songInfo => {
        console.log(songInfo);
        this.setState({ songInfo: songInfo });
      }
    );
  }

  render() {
    //   console.log(this.state.loggedin, 'LOGGED IN YAY OR NAY ?')
    //   this.getLoginStatus()
    return (
      this.state.songInfo && this.state.songInfo.data.track ? <div>
        <h1>{this.state.songInfo  && this.state.songInfo.data.track.name}</h1>
        <div>
          
            <img src={this.state.songInfo.data.track.album.image[2]["#text"]} />
            
          <h2>{this.state.songInfo.data.track.album.title}</h2>

        </div>
        <Button onClick={()=>{window.open(`http://localhost:3000/artist/${this.props.params.band}/song/${this.props.params.songTitle}/lyrics`, 'newwindow')}}>{'Lyrics'}</Button>
        <Button onClick={()=>{window.open(`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${this.props.params.songTitle}&a=${this.props.params.band}`, 'newwindow')}}>{'Guitar Tabs'}</Button>
<br/>
        <audio
          ref="audio_tag"
          src={this.state.track}
          autostart="false"
          controls
          autoPlay
        />
<h3>{'Info'}</h3>
        <div>{this.state.songInfo.data.track.wiki ? this.state.songInfo.data.track.wiki.content: 'No info avaiable for this song :('}</div>

        {/* THIS BUTTON WILL BE USEFULL LATER WHEN WE IMPLEMENT A WIDGET */}
        {/* <button
        className="login"
        onClick={
          this.state.loggedin ? this.login : this.login
        }
      >
        {this.state.loggedin ? 'FLOW' : 'Log In With Deezer'}
        
      </button> */}
      </div> : null
    )
  }
}

const styles = theme => ({
 
});

export default withStyles(styles) (SongPlayer);
