import React, { Component } from 'react'
import { getSongInfo } from '../../api'

export default class SongInfo extends Component {
  state = {
      songInfo : null
  }
  componentDidMount(){

    getSongInfo (this.props.params.band, this.props.params.songTitle)
      .then(songInfo=> {


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