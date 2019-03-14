import React, { Component } from 'react'
import {getDiscography, getAlbumInfo} from '../../api'
import { Link } from 'react-router-dom';

//I CAN ADD A FUNCTION THAT CHANGES SOMETHING IN THE STATE SO THAT IT EITHER RENDERS 5 OR ALL ALBUMS

export default class Discography extends Component {
    state = {
        discography : null
    }
    componentDidMount(){
      console.log(this.props.params.band,'@@@@@@@@@@@@@@@')
       getDiscography(this.props.bandName)
       .then(albums=> this.setState({discography: albums.data.topalbums.album}))
       
      //  .then(albums=>{
      //      console.log(albums.data.topalbums.album, 'albums')
      //      getAlbumInfo(this.props.bandName, albums.data.topalbums.album[0].name).then(albumInfo=>console.log(albumInfo, 'THIS IS THE ALBUM INFO'))
      //  })
        // .then(events=> {
        //     this.setState({discography: events.data._embedded.events})
        // })
    }
      render() {
       
      return (
        <div>
          
  {
            (this.state.discography!== null) ? this.state.discography.map(album=>{
                return <Link to={`/${this.props.bandName}/albums/${album.name}/`}>
                {album.name} 
              </Link>
            }) : "no events to show yet"
          
          }
  
        </div>
      )
    }
  }
  