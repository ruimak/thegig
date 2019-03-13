import React, { Component } from 'react'
import {getLyrics} from '../../api'

export default class SongLyrics extends Component {
  state = {
      songLyrics : null
  }
  componentDidMount(){
    console.log(this.props, this.props.params, 'THESE ARE THE PARAAAAAAAAAAAAAAAAAAAAAAAMS')
      getLyrics(this.props.params.band, this.props.params.songTitle)
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