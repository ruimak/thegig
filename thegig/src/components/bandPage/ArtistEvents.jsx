import React, { Component } from "react";
import { getArtistEvent } from "../../api";
import "../../styles/artistEvents.css";
import '../../styles/App.css'


export default class ArtistEvents extends Component {
  state = {
    eventsInfo: [],
    isLoading: true
  };
  componentDidMount() {
    getArtistEvent(this.props.params.band).then(events => {
      if (!events.data._embedded) {
        this.setState({ isLoading:false });
      } else {
        let attractionsArrays = events.data._embedded.events.map(event => {
          return event._embedded.attractions;
        });
        
        attractionsArrays = attractionsArrays.filter(entry => {
          return Array.isArray(entry);
        });
        

        attractionsArrays = attractionsArrays.reduce(
          (acc, attractionsArray, indexOfAttractionsArray) => {
           
            for (let i = 0; i < attractionsArray.length; i++) {
              if (
                attractionsArray[i].name.toLowerCase() ===
                this.props.params.band.toLowerCase()
              ) {
               
                acc.push(events.data._embedded.events[indexOfAttractionsArray]);
              }
            }
            return acc;
          },
          []

          //OLD EVENT THINGY IN CASE THE NEW ONE BREAKS. HAS A BUG THAT IF A BAND IS NOT THE MAIN ATTRACTION IT CRASHES

          // (acc, attractionsArray, indexOfAttractionsArray) => {
          //   console.log(attractionsArray, 'ARRAY IN THE LOOP')
          //   for (let i = 0; i < attractionsArray.length; i++) {
          //     if (
          //       attractionsArray[i].name.toLowerCase() ===
          //       this.props.params.band.toLowerCase()
          //     ){
          //       console.log(events, indexOfAttractionsArray, 'THIS ENTRY HAS THE STRANGLERS AND IS GOING TO THE FINAL ARRAY')
          //       return events[indexOfAttractionsArray];}

          //   }
          // }
        );
      
        events.data._embedded &&
          this.setState({
            eventsInfo: attractionsArrays,
            isLoading: false
          });
      }
    });

    //events.data._embedded.events.filter(event=>event._embedded.attractions[0].name.toLowerCase() === this.props.params.band.toLowerCase())
  }
  render() {
    if (this.state.eventsInfo.length===0) {
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
        !this.state.isLoading && <div className="mainDiv">
          <div className="title">{"Events"}</div>
          {this.state.eventsInfo.map(event => {
            return (
              <div className="individualEventDiv stand-out-container">
                <br />
                <div className="divContent">{event.name}</div>
                <br />
                <img
                  className="divContent"
                  src={event.images[0].url}
                  height="150vh"
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
      );
  }
}

// if there are no events its bugging out. Should be easy to fix with a condition
