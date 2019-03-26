import React, { Component } from "react";
// import fetchJsonp from 'fetch-jsonp'

import { getTrack } from "../api";

// const { DZ } = window

export class SongPlayer extends Component {
  state = {
    //   loggedin: false
    track: null
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
      this.setState({track:res.data.data[0].preview})
    });
  }

  render() {
    //   console.log(this.state.loggedin, 'LOGGED IN YAY OR NAY ?')
    //   this.getLoginStatus()
    return (
      <div>
        <audio ref="audio_tag" src={this.state.track} autostart="false" controls autoPlay />

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
    );
  }
}

export default SongPlayer;
