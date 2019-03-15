import React, { Component } from 'react'
import {getAlbumInfo} from '../../api'
import { Link } from 'react-router-dom';

//I CAN ADD A FUNCTION THAT CHANGES SOMETHING IN THE STATE SO THAT IT EITHER RENDERS 5 OR ALL ALBUMS

export default class Album extends Component {
    state = {
        albumInfo : null
    }
    componentDidMount(){
           getAlbumInfo(this.props.params.band, this.props.params.albumName)
           .then(albumInfo=>
            this.setState({albumInfo: albumInfo.data.album}))
    }
      render() {
      return (
        <div>
  
  {
            (this.state.albumInfo!== null) ? this.state.albumInfo.tracks.track.map(track=>{
                return <Link to={`/${this.props.params.band}/song/${track.name}`}>{track.name}</Link>
            }) : "no events to show yet"
          
          }
  
        </div>
      )
    }
  }
  