import React, { Component } from "react";
import { getArtistEvent } from "../../api";
import "./events.css"

export default class ArtistEvents extends Component {
  state = {
    eventsInfo: null
  };
  componentDidMount() {
    getArtistEvent(this.props.params.band).then(events => {
      console.log(events,'THESE ARE THE EVENTS')
      this.setState({ eventsInfo: events.data._embedded.events });
    });
  }
  render() {
  
    if (!this.state.eventsInfo) {
      return <div>{"No events to show."}</div>;
    } else
      return (
        <div className='mainDiv'>
        <div className='title'>{'Events'}</div>
          {this.state.eventsInfo.map(event => {
            return (
              <div className='individualEventDiv'>
              <br/>
                <div className='divContent'>{event.name}</div>
               <br/>
                <img className='divContent' src={event.images[0].url} height='150vh'/>
                <div className='divContent' >
                  {"Locale: " +
                    event._embedded.venues[0].country.name +
                    ", " +
                    event._embedded.venues[0].city.name}
                </div>
                <div className='divContent'>{"Venue: " + event._embedded.venues[0].name}</div>
                <div className='divContent'>{"Date: " + event.dates.start.localDate}</div>
                <div className='divContent'>{event.priceRanges === undefined ? "Price Range: Unknown" :  `Price Range: ${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`}</div>
                <br/>
              </div>
            );
          })}
        </div>
      );
  }
}

// if there are no events its bugging out. Should be easy to fix with a condition
