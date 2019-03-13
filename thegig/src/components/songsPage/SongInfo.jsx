import React, { Component } from 'react'
import { getSongInfo } from '../../api'

export default class SongInfo extends Component {
  state = {
      songInfo : null
  }
  componentDidMount(){
    console.log(this.props, this.props.params, 'THESE ARE THE PARAAAAAAAAAAAAAAAAAAAAAAAMS')
    getSongInfo (this.props.params.band, this.props.params.songTitle)
      .then(songInfo=> {
        // const parsedData = JSON.parse(lyrics.data.slice(9, lyrics.data.length-2))
console.log(songInfo)
        //   this.setState({songInfo: })
      })
  }
    render() {
    return (
      <div>
{/* 
{console.log(this.state.songInfo)
    //   this.state.songInfo
        } */}

      </div>
    )
  }
}