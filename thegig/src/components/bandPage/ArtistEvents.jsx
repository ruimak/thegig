import React, { Component } from "react";
import { getArtistEvent } from "../../api";

export default class ArtistEvents extends Component {
  state = {
    eventsInfo: null
  };
  componentDidMount() {
    getArtistEvent(this.props.params.band).then(events => {
      this.setState({ eventsInfo: events.data._embedded.events });
    });
  }
  render() {
    console.log(this.state.eventsInfo);
    if (!this.state.eventsInfo) {
      return <div>{"No events to show."}</div>;
    } else
      return (
        <div>
          {this.state.eventsInfo.map(event => {
            return (
              <div>
                <div>{event.name}</div>
                <img src={event.images[0].url} />
                <div>
                  {"Locale: " +
                    event._embedded.venues[0].country.name +
                    ", " +
                    event._embedded.venues[0].city.name}
                </div>
                <div>{"Venue: " + event._embedded.venues[0].name}</div>
                <div>{"Date: " + event.dates.start.localDate}</div>
                <br/>
              </div>
            );
          })}
        </div>
      );
  }
}

// if there are no events its bugging out. Should be easy to fix with a condition
