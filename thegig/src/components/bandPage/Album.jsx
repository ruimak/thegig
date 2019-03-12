import React, { Component } from 'react'
import {getAlbumInfo} from '../../api'

//I CAN ADD A FUNCTION THAT CHANGES SOMETHING IN THE STATE SO THAT IT EITHER RENDERS 5 OR ALL ALBUMS

export default class Album extends Component {
    state = {
        albumInfo : null
    }
    componentDidMount(){
        console.log(this.props, 'THESE ARE THE PROPS YOUR RE LOOKING FOR')
           getAlbumInfo(this.props.params.band, this.props.params.albumName)
           .then(albumInfo=>
            // console.log(albumInfo, 'THIS IS THE ALBUM INFO')
            this.setState({albumInfo: albumInfo.data.album}))
       


        // .then(events=> {
        //     this.setState({discography: events.data._embedded.events})
        // })
    }
      render() {
      return (
        <div>
  
  {
            (this.state.albumInfo!== null) ? this.state.albumInfo.tracks.track.map(track=>{
                return <div>{track.name}</div>
            }) : "no events to show yet"
          
          }
  
        </div>
      )
    }
  }
  