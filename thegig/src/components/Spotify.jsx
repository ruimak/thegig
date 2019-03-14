import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import '../components/Spotify.css'
import Iframe from 'react-iframe'
import { withRouter } from "react-router-dom";


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


class Spotifys extends Component {
   
    
    
   
   
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
        //    playlistId:[],
           choosenPlaylist: '',
           spotifyPlay : '',
          

       }
       if(params.access_token) {
           spotifyWebApi.setAccessToken(params.access_token)
       }
   } 
   

   

   componentDidMount(){
    
    
    
     
    const NewObject= {}
    spotifyWebApi.getUserPlaylists().then(response => {
        const playlistname = response.items.map(playlist => {
            return NewObject[playlist.name] = playlist.id
            
        })
        
        // const playlistids = response.items.map(playlist => {
        //     return playlist.id
            
        // })
        this.setState({
            playlists: NewObject
                    //   playlistids: playlistname
            
            
        })

        const getATrack = spotifyWebApi.searchTracks(this.props.params.band,this.props.params.songTitle).then(response => {
            this.setState({spotifyPlay:response.tracks.items[0].preview_url})
            
        })

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
    
//   addTrackToPlaylist() {
// spotifyWebApi.addTracksToPlaylist("31X2aYn8tYimZl8F8SCeb8",["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"])
// .then((response) => {
//     console.log(response,'llllll')
// // const hello = spotifyWebApi.getAccessToken()
// //     spotifyWebApi.getAudioFeaturesForTrack("7vSm2hckpPHTrIHpqmqOze").then((response) => {
// //         console.log(response,'llllll')
// //      this.setState({
// //         nowPlaying:0
// //             name: response.analysis_url}})
// // })


// })


// }


handleChange(e,playlist) {
    
    spotifyWebApi.searchTracks('cher belive').then(response => {
        trackId(response.tracks.items[0].id)
    })
    const value = e.target.value
    const trackId  = (getSong) => {
spotifyWebApi.getTrack([getSong]).then(response => {
        addToPlaylist(response.uri)
    })
}
    const addToPlaylist = (trackId) => spotifyWebApi.addTracksToPlaylist(playlist[value],[trackId]).then(response => {
       

    })
}

    render() {
        console.log(this.props.history,'{{{{{{{{}}}}}}}}}')
        console.log(this.state,'lllllllllll')
       const notsignedinrender =  this.props.loginState === false ?  <div>Please login with spotify in the settings to play</div> :      <div className='container'>
       <div>
          <select onChange={(e) =>this.handleChange(e,this.state.playlists)}> 
            
{Object.keys(this.state.playlists).map(name => {
    return <option tar ={Object.values(this.state.playlists)}>{name}</option>
})}
 
    
})}




</select>
</div> 

        
      
          
          <button onClick={() => this.addTrackToPlaylist()}>
              add track to playlist
          </button>
        <div>
            
  <Iframe url={this.state.spotifyPlay}
      width="300px"
      height="300px"
      id="myId"
      className="myClassname"
      display="initial"
      position="relative"/>

     
</div>

      
    </div>

       
        
    return (
<div>
        {notsignedinrender}
        </div>
  
      
    )
  }
}

export default withRouter(Spotifys)