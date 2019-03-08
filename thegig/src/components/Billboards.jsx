import React, { Component } from 'react'
import {getBillboardCharts} from '../api'

export default class Billboards extends Component {
    state = {
        charts:[]
    }

    componentDidMount() {
    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(keyWord) {
       getBillboardCharts(keyWord).then(tracks=>{
            this.setState({charts : tracks.data})
        })
}
   
  render() {
        const listOfButtons = [['Hot100', 'hot-100'], ['RnB', 'rnb'], ['Top UK', 'uksongs'], ['Top Rock', 'rock'], ['Top Pop', 'pop'] ]
const chartButton = (name, keyWord) => {
    return <div>
        <button name={name} onClick={()=>this.handleClick(keyWord)}>
        {name}
        </button> 
        {this.state.charts !== null ?
        <div>
        {this.state.charts.map(track => {
             console.log(track,'dddddddd')
                 return <div>{`Rank: ${track.rank} Track:${track.title}Artist: ${track.artist} ${track.cover}` }</div>
             })}</div> 
             : 
             null}
        </div>
}

    return (
      <div>
             {listOfButtons.map((element, index)=>{
                 return chartButton(listOfButtons[index][0], listOfButtons[index][1])
             }) }
      </div>
    )
  }
}
