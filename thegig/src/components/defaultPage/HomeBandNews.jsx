import React, { Component } from 'react'


import {getAllBandNews} from '../../api'

export default class HomeBandNews extends Component {
  
  state = {
      bandNews : []
  }

  componentDidMount() {
      getAllBandNews().then(bandNews => {
          this.setState({bandNews : bandNews.data.articles})
      })
  }
    render() {
        console.log(this.state,'hello')
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
