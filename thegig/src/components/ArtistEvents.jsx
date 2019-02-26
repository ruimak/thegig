import React, { Component } from 'react'
import {getArtistEvent} from '../api'

export default class ArtistEvents extends Component {
  state = {
      eventsInfo : null
  }
  componentDidMount(){
      getArtistEvent(this.props.bandName)
      .then(events=> {
        console.log(events.data)
        console.log(this.props.bandName, 'nameeee')
          this.setState({eventsInfo: events.data._embedded.events})
      })
  }
    render() {
    return (
      <div>

{
          (this.state.eventsInfo!== null) ? this.state.eventsInfo.map(event=>{
              return <div>{event.name}</div>
          }) : "no events to show yet"
        
        }

      </div>
    )
  }
}


// if there are no events its bugging out. Should be easy to fix with a condition



