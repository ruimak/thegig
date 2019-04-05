import React, { Component } from "react";
import { getArtistEvent } from "../../api";
import { artistEventsFilter } from "./utils";
import "../../styles/artistEvents.css";
import "../../styles/App.css";

export default class ArtistEvents extends Component {
  state = {
    eventsInfo: [],
    isLoading: true
  };
  componentDidMount() {
    // This function updates the events for the artist in the state.
    getArtistEvent(this.props.params.band).then(events => {
      // If there are no events we proceed to the rendering
      if (!events.data._embedded) {
        this.setState({ isLoading: false });
      }

      //But if there are, we have to analize and format them properly first
      else {
        let attractionsArrays = events.data._embedded.events.map(event => {
          return event._embedded.attractions;
        });

        //This next line removes the 'non attractions', we get an array of info for multiple events
        // (one event can have multiple attractions, opening band, main event, so we need arrays of attractions for all the events. An array of arrays)
        attractionsArrays = attractionsArrays.filter(entry => {
          return Array.isArray(entry);
        });

        //This next one gets us an array of all the events that have the band performing, being it an opening act, main event, etc.
        attractionsArrays = artistEventsFilter(
          attractionsArrays,
          events.data._embedded.events,
          this.props.params.band
        );

        events.data._embedded &&
          this.setState({
            eventsInfo: attractionsArrays,
            isLoading: false
          });
      }
    });
  }
  render() {
    if (this.state.eventsInfo.length === 0) {
      return (
        !this.state.isLoading && (
          <div className="mainDiv">
            <div className="title">{"Events"}</div>
            {"No events to show sorry :("}
          </div>
        )
      );
    } else
      return (
        !this.state.isLoading && (
          <div className="mainDiv">
            <div className="title">{"Events"}</div>
            {this.state.eventsInfo.map(event => {
              return (
                <div data-cy="eventPicture"
                  className="individualEventDiv stand-out-container"
                  onClick={() => {
                    window.open(`${event.url}`, "mywindow").focus();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <br />
                  <div data-cy="eventArtist" className="divContent">{event.name}</div>
                  <br />
                  <img 
                    className="divContent"
                    src={event.images[0].url}
                    height="150vh"
                    alt={event.name}
                  />
                  <div className="divContent">
                    {"Locale: " +
                      event._embedded.venues[0].country.name +
                      ", " +
                      event._embedded.venues[0].city.name}
                  </div>
                  <div className="divContent">
                    {"Venue: " + event._embedded.venues[0].name}
                  </div>
                  <div className="divContent">
                    {"Date: " + event.dates.start.localDate}
                  </div>
                  <div className="divContent">
                    {event.priceRanges === undefined
                      ? "Price Range: Unknown"
                      : `Price Range: ${event.priceRanges[0].min} - ${
                          event.priceRanges[0].max
                        } ${event.priceRanges[0].currency}`}
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        )
      );
  }
}
