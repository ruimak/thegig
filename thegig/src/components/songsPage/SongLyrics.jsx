import React, { Component } from 'react'
import {getLyrics} from '../../api'

export default class SongLyrics extends Component {
  state = {
      songLyrics : null
  }
  componentDidMount(){
      getLyrics(this.props.bandName, this.props.songTitle)
      .then(lyrics=> {
        const parsedData = JSON.parse(lyrics.data.slice(9, lyrics.data.length-2))

          this.setState({songLyrics: parsedData.message.body.lyrics.lyrics_body})
      })
  }
    render() {
    return (
      <div>

{
      this.state.songLyrics
        }

      </div>
    )
  }
}