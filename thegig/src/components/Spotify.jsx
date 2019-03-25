import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import '../components/Spotify.css'
import Iframe from 'react-iframe'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const spotifyWebApi = new Spotify()





class Spotifys extends Component {
   
    
    
   
    // addToPlaylist = this.addToPlaylist.bind(this);
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
          target : null,
          trackAdded : null

          

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
        
        this.setState({
            playlists: NewObject
            })

       spotifyWebApi.searchTracks(`${this.props.params.band} ${this.props.params.songTitle}`).then(response => {
            console.log(response,'hello there fuck')
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


    handleChange(e) {
     const value = e.target.value
     this.setState({target:value})  
} 



    addToPlaylist = (value) => { 
    spotifyWebApi.searchTracks(`${this.props.params.band} ${this.props.params.songTitle}`).then(response => {
    trackId(response.tracks.items[0].id)
})

    const trackId = (getSong) =>  { spotifyWebApi.getTrack([getSong]).then(response => {
    spotifyWebApi.addTracksToPlaylist(this.state.playlists[this.state.target],[response.uri]).then(response => {
    this.setState({trackAdded:response})
  })
    })
  }
}

    render() {
        console.log(this.state.loggedIn,'user is logged in')
        console.log(this.state.spotifyPlay,'ooooooooooooooooooooooooooooooooo')
        
      return  this.state.loggedIn === false ?  <div>Please login with spotify in the settings to play a sample of this song</div> :      <div className='container'>
       <div>
           {/* <Link to={}></Link> */}
          <select onChange={(e) =>this.handleChange(e)}> 
            
{Object.keys(this.state.playlists).map(name => {
    return <option tar ={Object.values(this.state.playlists)}>{name}</option>
})}
 
    
})}




</select>
</div> 

        
      
          
          <button onClick={() => this.addToPlaylist(this.state.target) }>
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

       
        
   
  }
}

export default withRouter(Spotifys)