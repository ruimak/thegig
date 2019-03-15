import React, { Component } from 'react'
import {getAllBandNews} from '../../api'
import firebase from "firebase";
import {getFollowedBandNews} from '../../api'
const { database } = firebase;


export default class HomeBandNews extends Component {
  
  state = {
      bandNews : []
  }



  componentDidMount() {
//    firebase.database.ref('bands').on('value',(data => {
// console.log(data,'this is data')
//    }))
    
   const bands =  ['foals','eagles']
   const lol = bands.map(band => {
return ` ${band} OR`
   })
   const lolagain = lol.reduce((acc, culval,index) => {
     
      return acc + culval
   },'')
   const hi = lolagain.substring(0,lolagain.length-2)
   console.log(hi,'OOOOOOOOOOO********&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
   
   console.log(typeof lolagain,'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPp')
   console.log([...lol].concat(lol),'{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}')
   getFollowedBandNews(hi).then(data => {
     console.log(data,'kkkkkkkkkkkkkkkkkggggggggggggggggggggggggggg')
   })

  //   getAllBandNews().then(bandNews => {
  //         this.setState({bandNews : bandNews.data.articles})
  //     })
  // }
  }
    render() {
    return (
      <div>
          
          {this.state.bandNews !== null ? this.state.bandNews.map(news => {
        return (
        <div>
        {news.content}
        <a href={news.url}>{news.url}</a>
        
        </div>
        )
        }) : 'no news to display'}
          
        
      </div>
    )
  }
}
