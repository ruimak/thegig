import React, { Component } from "react";
import { getAllBandNews } from "../../api";
import firebase from "firebase";
import { getFollowedBandNews } from "../../api";
import Carousel from "nuka-carousel";
import CarouselComponent from "./Carousel";
const { database } = firebase;

export default class HomeBandNews extends Component {
  state = {
    bandNews: []
  };

  componentDidMount() {
    //    firebase.database.ref('bands').on('value',(data => {
    // console.log(data,'this is data')
    //    }))

    //DANNYS ALGORYTHM

    //    const bands =  ['foals','eagles']
    //    const lol = bands.map(band => {
    // return ` ${band} OR`
    //    })
    //    const lolagain = lol.reduce((acc, culval,index) => {

    //       return acc + culval
    //    },'')
    //    const hi = lolagain.substring(0,lolagain.length-2)
    //    console.log(hi,'OOOOOOOOOOO********&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')

    //    console.log(typeof lolagain,'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPp')
    //    console.log([...lol].concat(lol),'{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}')
    //    getFollowedBandNews(hi).then(data => {
    //      console.log(data,'kkkkkkkkkkkkkkkkkggggggggggggggggggggggggggg')
    //    })

    getAllBandNews().then(bandNews => {
      this.setState({ bandNews: bandNews.data.articles });
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize")); // THIS FUNCTION MAKES THE FIRST SLIDE WORK FINE
    }, 0);
  }

  render() {
    console.log(this.state);
let arrayToDisplayInCarousel = []
let otherNews = []
arrayToDisplayInCarousel=this.state.bandNews.slice(0,6)
otherNews= this.state.bandNews.slice(6,this.state.bandNews.length)
  
    return (
      <div>
      <Carousel width="70%" autoplay="true">
        {this.state.bandNews !== null
          ? arrayToDisplayInCarousel.map(news => {
              return (
                <div>
                  <img src={news.urlToImage} height="50%" width="50%" />
                  <br />
                  {news.content}
                  {/* <a href={news.url}>{news.url}</a> */}
                </div>
              );
            })
          : null}
      </Carousel>

{this.state.bandNews !== null
  ? otherNews.map(news => {
      return (
        <div>
          <img src={news.urlToImage} height="50%" width="50%" />
          <br />
          {news.content}
          {/* <a href={news.url}>{news.url}</a> */}
        </div>
      );
    })
  : null}
      
      </div>
    );
  }
}
