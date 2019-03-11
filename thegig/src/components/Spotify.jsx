import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
const spotifyWebApi = new Spotify()


// code for sdk player
// async function waitForSpotifyWebPlaybackSDKToLoad () {
//     return new Promise(resolve => {
//       if (window.Spotify) {
//         resolve(window.Spotify);
//       } else {
//         window.onSpotifyWebPlaybackSDKReady = () => {
//           resolve(window.Spotify);
//         };
//       }
//     });
//   };

//   (async () => {
//     const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
//     console.log("The Web Playback SDK has loaded.");
//     var player = new Spotify.Player({
//         name: 'Carly Rae Jepsen Player',
//         getOAuthToken: callback => {
//           // Run code to get a fresh access token
      
//           callback('access token here');
//         },
//         volume: 0.5
//       });
//   })();


export default class Spotifys extends Component {
   
    
    
   
   
    getHashParams = this.getHashParams.bind(this);
    
   constructor(){
       super()
       const params = this.getHashParams();
       this.state = {
           loggedIn : params.access_token ? true : false,
           nowPlaying: {
               name: 'Not checked',
            //    img: ''
           },
           playlists: [],
           playlistId:''

       }
       if(params.access_token) {
           spotifyWebApi.setAccessToken(params.access_token)
       }
   } 

   componentDidMount(){
    spotifyWebApi.getUserPlaylists().then(response => {
        const playlistname = response.items.map(playlist => {
            return playlist.name
            
        })
        const playlistids = response.items.map(playlist => {
            return playlist.id
            
        })
        this.setState({
            playlists: playlistname,
            playlistId : playlistids
            
        })
    })
    spotifyWebApi.getUserPlaylists().then(response => {
        console.log(response,'llllllllllllllllllll')
    })
}
   
   getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
    
  nowPlaying() {
spotifyWebApi.addTracksToPlaylist("31X2aYn8tYimZl8F8SCeb8",["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"])
.then((response) => {
    console.log(response,'llllll')
// const hello = spotifyWebApi.getAccessToken()
//     spotifyWebApi.getAudioFeaturesForTrack("7vSm2hckpPHTrIHpqmqOze").then((response) => {
//         console.log(response,'llllll')
//      this.setState({
//         nowPlaying:0
//             name: response.analysis_url}})
// })
})
}

    render() {
        // console.log(waitForSpotifyWebPlaybackSDKToLoad(),'oooooooo')
        console.log(this.state.playlists,'lllllllllll')
        console.log(this.state.playlistId,'lllllllllll')
    return (
      <div>
          <div>
            {/* <select>
               
  {this.state.playlists.map(playlistName => {
      {console.log(playlistName,'@@@@@@@@@@@@@@@@@@@@@@@')}
      return <option value={playlistName}>{playlistName}</option>
  })}
  
 
</select> */}
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
</div>
          {/* <a href='http://localhost:8888'> */}
        {/* <button>login with spotify</button> */}
        {/* </a> */}
        {/* <div>now playing <a href={this.state.nowPlaying.name}>{this.state.nowPlaying.name}</a></div> */}
        {/* <div> */}
            {/* </div> */}
            {/* <button onClick={() => this.nowPlaying()}> */}
                {/* check now playing */}
            {/* </button> */}
          

      </div>
    )
  }
}

