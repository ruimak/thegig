import React, { Component } from 'react'
import {getEventsForLocation} from '../../api'
import firebase from "../../firebase.js";

//YOU NEED TO CHANGE THE SIZE PARAMETER IN THE API F IN ORDER TO GET MORE EVENTS
export default class ArtistEvents extends Component {
  state = {
      eventsInfo : null
  }
  componentDidMount(){
    firebase
    .database()
    .ref()
    .once("value")
    .then(
      function(userData) {
        const location = userData.val().users[this.props.loggedInUserId]
          .location
          const radius = userData.val().users[this.props.loggedInUserId]
          .radius 
         return getEventsForLocation(location,radius).then(events=>{
        this.setState({eventsInfo:events.data._embedded.events})
        console.log(events.data._embedded.events, 'EVENTSSSSSS')})
      }.bind(this)
    
    );
  }
    render() {
    return (
      <div>

{
  // this.state.eventsInfo!== null && console.log(this.state.eventsInfo[0]._embedded.attractions[0].name, 'ATRACTIONS')
          (this.state.eventsInfo!== null) ? this.state.eventsInfo.map(event=>{
            event._embedded.attractions && console.log(this.props.myBands.includes(event._embedded.attractions[0].name), 'EVENT NAME')
        
            //     if(event._embedded.attractions){  return this.props.myBands.includes(event._embedded.attractions[0].name) ?
        // <div>{event._embedded.attractions[0].name}</div> : null} else { return null}
         
          
      
      }) : "no events to show yet"
        
        }

      </div>
    )
  }
}


// if there are no events its bugging out. Should be easy to fix with a condition


